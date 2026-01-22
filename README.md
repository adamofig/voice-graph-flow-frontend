# VoiceGraphFlow 🚀

VoiceGraphFlow is a high-performance, AI-driven platform built with Next.js and FastAPI. It serves as a Proof of Concept (PoC) for advanced Retrieval-Augmented Generation (RAG), document processing, and real-time AI interactions.

---

## 🏗️ PoC Architecture

This project demonstrates how a modern web application communicates with specialized AI services:

### 1. Backend Communication
- **Next.js API Routes**: Acts as a secure proxy for file uploads (Edge/Node.js runtime).
- **FastAPI Integration**: The frontend communicates directly with a FastAPI backend (running at `http://0.0.0.0:8000`) for heavy-duty tasks like semantic search and LLM processing.
- **Real-time Streaming**: Utilizes the Vercel AI SDK for streaming LLM responses directly to the UI.

### 2. File Chunking & Processing
- **Docling Integration**: Uploaded files are sent to a `convert` service that uses Docling to transform documents (PDF, Docx, etc.) into clean Markdown.
- **Intelligent Chunking**: Documents are split into semantic chunks, indexed with metadata (headings, source, chunk index), and prepared for vector-based retrieval.

### 3. RAG Flow (Retrieval-Augmented Generation)
- **Search-Then-Generate**: When a query is made in the RAG interface, the system first performs a semantic search on the vector database.
- **Context Injection**: The top relevant chunks are injected into the Gemini LLM prompt as context.
- **Source Citation**: The UI displays exactly which chunks and sources were used to generate the answer, providing transparency and reducing hallucinations.

---

## ✨ Available Features

### 🎙️ Audio Wip (`/audio`)
*Status: In Development*
- Exploration of voice recording and AI-driven transcription.
- Designed for future integration with the graph-based flow processing.

### 📄 File Plus (`/upload-files`)
*Status: Ready*
- Premium drag-and-drop interface for document uploads.
- Securely processes documents into indexed chunks via the FastAPI backend.

### 🔍 Search (`/search`)
*Status: Ready*
- **Keyword Search**: Traditional text-based search across indexed documents.
- **Semantic Search**: Vector-based search that understands the *meaning* behind your query, even without exact keyword matches.

### 🧠 LLM Rag (`/llm-rag`)
*Status: Ready*
- The core PoC interface for Retrieval-Augmented Generation.
- Combines semantic search with Gemini 1.5/2.0 for context-aware answering.

### 💬 LLM Chat (`/llm`)
*Status: Ready*
- Minimalist, high-performance chat interface.
- Supports real-time streaming for a premium, low-latency AI experience.

---

## 🚀 Getting Started

### 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd voice-graph-flow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env.local` file with the following:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

---

### 🐳 Docker Setup

You can run the entire project using Docker for a consistent environment.

#### Using Docker Compose (Recommended)
1. **Start everything:**
   ```bash
   docker compose up -d
   ```
2. **Access local app:** [http://localhost:3000](http://localhost:3000)

#### Manual Docker Build
1. **Build the image:**
   ```bash
   docker build -t voice-graph-flow .
   ```
2. **Run the container:**
   ```bash
   docker run -p 3000:3000 --env-file .env.local voice-graph-flow
   ```

---

## ⚙️ Environment Variables

| Variable | Description | Required |
| :--- | :--- | :--- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Key for Gemini LLM | Yes |
| `NODE_ENV` | runtime environment (`development`/`production`) | No |

---

## 🔗 Internal Navigation
- [Main Page](/)
- [Upload Center](/upload-files)
- [Search Interface](/search)
- [RAG Explorer](/llm-rag)
- [AI Chat](/llm)
