from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import docx
import spacy
import yake
import re
from transformers import T5Tokenizer, T5ForConditionalGeneration, BartForConditionalGeneration, BartTokenizer, PegasusForConditionalGeneration, PegasusTokenizer, AutoModelForSeq2SeqLM, AutoTokenizer
import torch
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings  # Updated import
from langchain_community.vectorstores import FAISS  # Updated import
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI  # Ensure this is installed
from langchain.prompts import PromptTemplate
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Initialize summarization models
t5_tokenizer = T5Tokenizer.from_pretrained("t5-small")
t5_model = T5ForConditionalGeneration.from_pretrained("t5-small")

bart_tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")
bart_model = BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")

pegasus_tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
pegasus_model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

qa_tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
qa_model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")

sentence_model = SentenceTransformer("all-MiniLM-L6-v2")

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            extracted_text = page.extract_text()
            if extracted_text:
                text += extracted_text + "\n"
    return text, len(pdf.pages)

# Function to extract text from DOCX
def extract_text_from_docx(docx_path):
    doc = docx.Document(docx_path)
    return "\n".join([para.text for para in doc.paragraphs]), None

# Function to extract text from a file
def extract_text_from_file(file):
    ext = file.filename.split(".")[-1].lower()
    if ext == "pdf":
        temp_pdf_path = "temp.pdf"
        file.save(temp_pdf_path)
        text, _ = extract_text_from_pdf(temp_pdf_path)
        os.remove(temp_pdf_path)
        return text, None
    elif ext == "docx":
        temp_docx_path = "temp.docx"
        file.save(temp_docx_path)
        text, _ = extract_text_from_docx(temp_docx_path)
        os.remove(temp_docx_path)
        return text, None
    elif ext == "txt":
        return file.read().decode("utf-8"), None
    else:
        return "Unsupported file format!", None

# Function to prepare vector store using FAISS
def prepare_vector_store(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = text_splitter.split_text(text)
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vector_store = FAISS.from_texts(chunks, embeddings)  # Use FAISS instead of Chroma
    return vector_store

# Function for extractive summarization
def extractive_summary(text, num_sentences=5):
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents]
    return sentences[:num_sentences]

# Function to extract keywords
def extract_keywords(text, num_keywords=5):
    kw_extractor = yake.KeywordExtractor(top=num_keywords, stopwords=None)
    keywords = kw_extractor.extract_keywords(text)
    return [kw[0] for kw in keywords]

# Function to classify document
def classify_document(text):
    categories = {
        "legal": ["court", "law", "agreement", "contract", "policy"],
        "technical": ["AI", "algorithm", "data", "software", "engineering"],
        "academic": ["research", "study", "university", "experiment", "paper"],
        "general": ["news", "blog", "report", "story", "review"]
    }
    doc = nlp(text.lower())
    word_counts = {category: sum(1 for token in doc if token.text in words) for category, words in categories.items()}
    return max(word_counts, key=word_counts.get).capitalize()

# Function for abstractive summarization
def abstractive_summary(text, model, tokenizer, max_length=150):
    input_text = "summarize: " + text
    input_ids = tokenizer.encode(input_text, return_tensors="pt", truncation=True)
    output_ids = model.generate(input_ids, max_length=max_length, num_beams=5, early_stopping=True)
    return tokenizer.decode(output_ids[0], skip_special_tokens=True)

# Function for single-sentence explanation
def single_sentence_explanation(text):
    input_text = "summarize: " + text
    input_ids = bart_tokenizer.encode(input_text, return_tensors="pt", truncation=True)
    output_ids = bart_model.generate(input_ids, max_length=30, num_beams=5, early_stopping=True)
    return bart_tokenizer.decode(output_ids[0], skip_special_tokens=True)

# Function to generate summary
def generate_summary(text, num_extractive=5):
    key_points = extractive_summary(text, num_extractive)
    extracted_text = " ".join(key_points)

    t5_summary = abstractive_summary(extracted_text, t5_model, t5_tokenizer)
    pegasus_summary = abstractive_summary(extracted_text, pegasus_model, pegasus_tokenizer)

    final_paragraph_summary = t5_summary + " " + pegasus_summary
    explanation = single_sentence_explanation(extracted_text)
    keywords = extract_keywords(text, num_keywords=5)
    document_type = classify_document(text)

    return key_points, final_paragraph_summary, explanation, keywords, document_type

# Function to answer questions using LangChain and Gemini
def answer_question_langchain(question, vector_store):
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GEMINI_API_KEY")  # Use environment variable for API key
    )

    retriever = vector_store.as_retriever(search_kwargs={"k": 1})

    prompt_template = PromptTemplate(
        template="You are an AI assistant analyzing a document. Use the given document context to answer accurately.\n\n{context}\n\nQuestion: {question}\n\nAnswer:",
        input_variables=["context", "question"],
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt_template}
    )

    return qa_chain.invoke({"query": question})["result"]

# Flask route for file upload and summarization
@app.route('/upload', methods=['POST'])
def upload_document():
    if 'document' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['document']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        text, _ = extract_text_from_file(file)
        if not text:
            return jsonify({"error": "Failed to extract text from the file"}), 400

        key_points, paragraph_summary, explanation, keywords, document_type = generate_summary(text)

        return jsonify({
            "text": paragraph_summary,
            "key_points": key_points,
            "explanation": explanation,
            "keywords": keywords,
            "document_type": document_type
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Flask route for answering questions
@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question')
    text = data.get('text')

    if not text or not question:
        return jsonify({'error': 'Text and question are required'}), 400

    try:
        vector_store = prepare_vector_store(text)
        answer = answer_question_langchain(question, vector_store)
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)