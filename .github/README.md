<h1 align="center">
  📄 Document Summarizer
</h1>

<p align="center">
  <strong>AI-powered document summarization tool that extracts key insights from PDFs, DOCX, and plain text files.</strong>
</p>

---

## 📑 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Tech Stack](#-tech-stack)
- [🚀 Deployment Status](#-deployment-status)
- [🚀 Installation & Setup](#-installation--setup)
- [🎥 How to Run the Application](#-how-to-run-the-application)
- [🎥 Demo Video](#-demo-video)
- [👥 Contributors](#-contributors)
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

### 🖥️ 2️⃣ Backend Setup

Navigate to the `backend` directory. Create a virtual environment and install dependencies:

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

---

<h2 style="text-align: center;">🎥 How to Run the Application</h2>

<p align="center">
📌 Watch the video tutorial on setting up and running the application locally:
</p>

<div style="text-align: center;">
  <video width="1000" controls>
    <source src="../Assets/Videos/To Run in Local Machine.mp4" type="video/mp4">
  </video>
</div>

<h2 style="text-align: center;">🎥 Demo Video</h2>

<p align="center">
📌 Watch the live demo of the Document Summarizer in action:
</p>

<div style="text-align: center;">
  <video width="1000" controls>
    <source src="../Assets/Videos/Demo.mp4" type="video/mp4">
  </video>
</div>

---

<h2 align="center">
  👥 Contributors
</h2>

<p align="center">
  This project was made possible by the contributions of these amazing individuals:
</p>

<div align="center">
  <a href=https://github.com/Akshit7-uni"">
    <img src="../Assets/Contributors/Akshit Github Photo.png" alt="Akshit Joshi" style="border-radius: 50%; margin: 5px; width: 100px; height: 100px;">
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
