<h1 align="center">
  📄 Document Summarizer
</h1>

<p align="center">
  <strong>AI-powered document summarization tool that extracts key insights from PDFs, DOCX, and plain text files.</strong>
</p>

---

## 📑 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Tech Stack](https://github.com/Jyotibrat/Document-Summarizer?tab=readme-ov-file#%EF%B8%8F-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Deployment Status](#-deployment-status)
- [🚀 Installation & Setup](#-installation--setup)
- [🎨 Figma Design](#-figma-design)
- [🎥 How to Run the Application](#-how-to-run-the-application)
- [🎥 Demo Video](#-demo-video)
- [👥 Contributors](https://github.com/Jyotibrat/Document-Summarizer?tab=readme-ov-file#---contributors)
- [📜 License](#-license)
- [🏆 Acknowledgment](#-acknowledgment)
  
---

## 🌟 Features

### 🔹 Key Highlights

✅ Extract text from **PDFs** & **DOCX** files effortlessly.\
✅ AI-generated summaries using state-of-the-art **transformer models**.\
✅ Intelligent **keyword extraction** for enhanced insights.\
✅ Multi-model support (**T5**, **BART**, **Pegasus**, etc.).\
✅ **Vector search** for precise retrieval.\
✅ Sleek **React.js** frontend for a seamless experience.\
✅ **Question Answering** support.

---

## 🏗️ Tech Stack

### 🔹 Backend

- **Flask** - Lightweight web framework
- **Transformers (Hugging Face)** - Pretrained NLP models (T5, BART, Pegasus)
- **PDFPlumber** - Extracts text from PDFs
- **docx** - Parses DOCX files
- **spaCy & YAKE** - NLP processing & keyword extraction
- **LangChain & FAISS** - AI-powered document retrieval & vector similarity search
- **Sentence Transformers** - Embedding generation
- **Gemini 1.5 Flash API** - Used for Question Answering

### 🔹 Frontend

- **React.js + Vite** - Blazing fast UI development
- **Tailwind CSS** - Modern styling framework
- **Lucide Icons** - Minimalist UI enhancements

---


## 📂 Project Structure

```
Document-Summarizer/
│
├───.gitattributes
├───.gitignore
├───eslint.config.js
├───index.html
├───LICENSE
├───package-lock.json
├───package.json
├───postcss.config.js
├───tailwind.config.js
├───tsconfig.app.json
├───tsconfig.json
├───tsconfig.node.json
├───vite.config.ts
│
├───.github/
│    └───README.md
│
├───Archive/
│   ├───Document_Summarizer_first_prototype.ipynb
│   ├───Document_Summarizer_second_prototype.ipynb
│   ├───summarizer_web.ipynb
│   └───README.md
│
├───Assets/
│   ├───Contributors/
│   │   ├───Akshit Github Photo.png
│   │   ├───Ansh Github Photo.png
│   │   ├───Bindupautra Github Photo.png
│   │   └───Rana Github Photo.png
│   │
│   ├───Videos/
│   │   ├───Demo.mp4
│   │   └───To Run in Local Machine.mp4
│   │
│   └───README.md
│
├───backend/
│   ├───.env
│   ├───app.py
│   ├───Readme.md
│   ├───requirements.txt
│   └───README.md
│
├───NoteBooks/
│   ├───Summarizer.ipynb
│   └───README.md
│
└───src/
    ├───App.tsx
    ├───index.css
    ├───main.tsx
    ├───vite-env.d.ts
    └───README.md
```

---

## 🚀 Deployment Status

### 🔹 Frontend Deployment

The **frontend of the application** is deployed and accessible for preview. You can explore the user interface and interact with the design at the following link:

👉 [**Live Frontend Preview**](https://docsum.netlify.app/)

However, please note that the **backend has not been deployed** yet. As a result, the full functionality of the Document Summarizer, including AI-powered summarization and document processing, is not available in the live version.

To experience the complete features, you will need to set up the backend locally by following the [Installation & Setup](#-installation--setup) instructions.

---

## 🚀 Installation & Setup

### 🔧 1️⃣ Clone the Repository

```sh
 git clone https://github.com/Jyotibrat/Document-Summarizer.git
 cd document-summarizer
```

### 🔑 2️⃣ Obtain a Gemini API Key

To use the **Gemini 1.5 Flash API** for question answering, you need to obtain an API key. Follow these steps:

1. **Sign Up for Gemini API**:
   - Go to the [Gemini API website](https://aistudio.google.com/) and sign up for an account.
   - Follow the instructions to create a new API key.

2. **Set Up the API Key**:
   - Navigate to the `backend` directory:
     ```sh
     cd backend
     ```
   - Open the `.env` file in a text editor:
   - Add your Gemini API key to the `.env` file:
     ```env
     GEMINI_API_KEY='your_api_key_here'
     ```
   - Save and close the file.

### 🖥️ 2️⃣ Backend Setup

Navigate to the `backend` directory. 

```sh
cd backend
```

Create a virtual environment and install dependencies:

```sh
 python -m venv venv
 source venv/bin/activate
 pip install -r requirements.txt
```

Run the Flask server:

```sh
 python app.py
```

### 🎨 3️⃣ Frontend Setup

Navigate to the root directory and install dependencies:

```sh
 npm install
```

Run the development server:

```sh
 npm run dev
```

## 🎨 Figma Design

The UI/UX design for the **Document Summarizer** was created using **Figma**. You can view the design and interact with the prototype using the link below:

👉 [**Figma Design**](https://www.figma.com/design/sIjJUrWDHGoWYPLhhaT4Fl/Document-Summarizer?node-id=0-1&p=f&t=uNUtq9QVOepdB6NT-0)

---

<h2 align="center">🎥 How to Run the Application</h2>

<p align="center">
📌 Watch the video tutorial on setting up and running the application locally:
</p>

https://github.com/user-attachments/assets/1e2d0a44-5082-4bbf-befa-69772c6d10e8

<h2 align="center">🎥 Demo Video</h2>

<p align="center">
📌 Watch the live demo of the Document Summarizer in action:
</p>

https://github.com/user-attachments/assets/8454adb5-478b-4145-8d2c-2a9bd9a55d27

---

<h2 align="center">
  👥 Contributors
</h2>

<p align="center">
  This project was made possible by the contributions of these amazing individuals:
</p>

<div align="center">
  <a href="https://github.com/Arunim-Gogoi">
    <img src="../Assets/Contributors/Arunim Github Photo.png" alt="Akshit Joshi" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/Lucifer-here">
    <img src="../Assets/Contributors/Ansh Github Photo.png" alt="Ansh Gaur" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/Auth0r-C0dez">
    <img src="../Assets/Contributors/Rana Github Photo.png" alt="Rana Talukdar" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
  <a href="https://github.com/Jyotibrat">
    <img src="../Assets/Contributors/Bindupautra Github Photo.png" alt="Bindupautra Jyotibrat" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
  </a>
</div>

---

## 📜 License

### 🔹 Licensing Details

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Acknowledgment

This project is part of **Neurathon '25** conducted by **NIT Silchar**.
