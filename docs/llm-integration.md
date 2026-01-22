# LLM Assistant Integration Documentation

This document describes the implementation of the real-time LLM chat interface, the streaming backend, and the integration with the Vercel AI SDK.

## Overview
The LLM Assistant provides a high-performance, real-time chat experience. It uses a server-side streaming strategy to protect API keys while providing an interactive user experience.

## Technical Architecture

### Backend: API Route Handler
- **Path**: `app/api/chat/route.ts`
- **Logic**: 
    - Receives message history from the client.
    - Utilizes the `streamText` function from the AI SDK.
    - Uses `toTextStreamResponse()` to send chunks back to the client.
- **Mock Mode**: If the `OPENAI_API_KEY` environment variable is missing, the route automatically switches to a mock streaming mode for testing and UI demonstration.

### Frontend: Chat Interface
- **Path**: `components/Chat/ChatInterface.tsx`
- **Hook**: Uses `@ai-sdk/react` (`useChat`) for message state management.
- **Features**:
    - **Manual State Management**: Due to version changes in the AI SDK, the component manages its own `input` state and uses `sendMessage` directly.
    - **Message Signature**: The `sendMessage` function expects an object with a `text` property (e.g., `sendMessage({ text: '...' })`).
    - **Rendering**: Messages are rendered by iterating over the `parts` array to support text, reasoning, and other content types.
    - **Animations**: Uses `framer-motion` for smooth bubble entry and layout transitions.
    - **Auto-scroll**: Automatically scrolls to the newest message using `useRef` and `useEffect`.
    - **Responsive Design**: Mobile-first design with Tailwind CSS, featuring glassmorphism and gradient accents.

## Development & Setup

### Environment Variables
To enable real AI responses, create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_key_here
```

### Dependencies
The following packages were added to support this feature:
- `ai`: Core AI SDK.
- `@ai-sdk/openai`: OpenAI provider.
- `@ai-sdk/react`: React hooks for the AI SDK.
- `framer-motion`: Smooth UI animations.
- `lucide-react`: Modern iconography.
- `clsx` & `tailwind-merge`: Utility for managing Tailwind classes.

## Future Plans
- **Context Persistence**: Integration with a database (e.g., PostgreSQL/Supabase) to save chat history.
- **Multi-Model Support**: Adding allowlists for switching between different models (Gemini, Claude, Llama).
- **Streaming Enhancements**: Support for tool calling and structured data output.
