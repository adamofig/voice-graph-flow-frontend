# Flow App Documentation

Welcome to the **Flow App**, a personal productivity and AI-enhanced dashboard built with Next.js 15, Tailwind CSS, and the Vercel AI SDK.
This app is used for testing and learning purposes. 

> [!NOTE]
> Detailed documentation for the **[Authentication System](file:///Users/adamo/Documents/NextJs/flow-video/docs/firebase-auth.md)** is now available.

## 🚀 Core Features

### 1. 🤖 LLM Chat (Real-time AI)
- **Path**: `/llm`
- **Description**: A full-featured chat interface that allows users to interact with AI models in real-time.
- **Technology**: Uses the `ai` SDK for streaming responses, providing a fast and responsive conversational experience.

### 2. 👥 Agent Registry
- **Path**: `/agents`
- **Description**: A comprehensive marketplace to explore and manage specialized AI agents.
- **Features**:
  - **Dynamic Card View**: Beautifully rendered cards showing agent capabilities, models, and personal details.
  - **Master-Detail View**: Seamlessly transition from a grid view to a detailed inspection pane when an agent is selected.
  - **Persona Insights**: Explore deep character details, including system prompts, first messages, and conversation examples.
  - **External Integration**: Fetches agent data dynamically from a centralized Mongo-based operation API.
- **Documentation**: [Agentic Persona Cards](file:///Users/adamo/Documents/NextJs/flow-video/docs/agentic-persona-cards/index.md)

### 3. 🎵 Audio (Work in Progress)
- **Path**: `/audio`
- **Description**: A dedicated space for audio processing and visualization. 
- **Status**: Currently in development (WIP).

### 4. 🔐 Authentication (Firebase)
- **Path**: `/login`
- **Description**: Secure user authentication system.
- **Features**:
  - Email and Password sign-in/up.
  - Google Authentication support.
  - Persistent session management via `AuthContext`.

### 5. ✅ Todo List
- **Path**: `/todo`
- **Description**: A simple and effective task management system to keep track of daily goals.

### 6. 📂 File Upload (New)
- **Path**: `/upload-files`
- **Description**: A premium, glassmorphic file upload interface with drag-and-drop support.
- **Documentation**: [File Upload System](file:///Users/adamo/Documents/NextJs/flow-video/docs/file-upload.md)

---

## 🏗️ Layout Architecture

The application uses a **Dashboard Layout** with a persistent left navigation bar.

### 🌓 Sidebar (Left Menu)
- **Component**: `components/Sidebar.tsx`
- **Features**:
  - **Dynamic Navigation**: Quickly switch between Chat, Audio, and Todo sections.
  - **Collapsible Design**: Can be collapsed to a slim icon-only bar to maximize workspace.
  - **Modern UI**: Built with `framer-motion` for smooth transitions and `lucide-react` for premium iconography.
  - **Responsive**: Adapts to different screen sizes and provides tooltips when collapsed.

### 🎨 Design System
- **Colors**: Deep dark theme (`gray-950`) with purple and pink gradients for highlights.
- **Typography**: Uses **Geist** and **Geist Mono** for a clean, developer-focused look.
- **Glassmorphism**: Subtle usage of semi-transparent backgrounds and blurs in the sidebar and chat bubbles.

---

## 🔧 Technical Stack
- **Framework**: [Next.js 15+](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
