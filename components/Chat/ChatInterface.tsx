'use client';

import { useChat } from '@ai-sdk/react';
import { Send, User, Bot, Sparkles, Trash2, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ChatInterface() {
    const { messages, sendMessage, status, error, setMessages } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const isLoading = status === 'submitted' || status === 'streaming';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const clearChat = () => {
        setMessages([]);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const currentInput = input;
        setInput('');

        try {
            await sendMessage({
                text: currentInput
            });
        } catch (err) {
            console.error('Failed to send message:', err);
            setInput(currentInput); // Restore input on error
        }
    };

    return (
        <div className="flex flex-col h-[70vh] w-full max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 border-b border-gray-800 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">AI Assistant</h2>
                        <p className="text-xs text-blue-400 font-medium tracking-wider uppercase">Online & Streaming</p>
                    </div>
                </div>
                <button
                    onClick={clearChat}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                    title="Clear chat"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                        <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mb-4">
                            <Bot className="w-10 h-10 text-gray-500" />
                        </div>
                        <p className="text-gray-400 text-lg">Send a message to start the conversation</p>
                    </div>
                )}

                <AnimatePresence initial={false}>
                    {messages.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                "flex gap-4",
                                m.role === 'user' ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                                m.role === 'user' ? "bg-blue-600" : "bg-purple-700"
                            )}>
                                {m.role === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
                            </div>
                            <div className={cn(
                                "max-w-[80%] rounded-3xl px-6 py-4 shadow-md leading-relaxed",
                                m.role === 'user'
                                    ? "bg-blue-600/10 border border-blue-500/20 text-blue-50 rounded-tr-none"
                                    : "bg-gray-800/80 border border-gray-700 text-gray-200 rounded-tl-none"
                            )}>
                                {m.parts.map((part, i) => (
                                    part.type === 'text' ? (
                                        <p key={i} className="whitespace-pre-wrap">{part.text}</p>
                                    ) : part.type === 'reasoning' ? (
                                        <p key={i} className="text-sm text-gray-400 italic mb-2 border-l-2 border-gray-700 pl-3">
                                            {part.text}
                                        </p>
                                    ) : null
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-purple-700 flex items-center justify-center shrink-0">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div className="bg-gray-800/80 border border-gray-700 rounded-3xl rounded-tl-none px-6 py-4 flex items-center">
                            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-center text-sm">
                        An error occurred. Please try again.
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="p-6 bg-gray-900 border-t border-gray-800">
                <div className="relative group">
                    <input
                        className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500 group-hover:border-gray-600"
                        value={input}
                        placeholder="Ask me anything..."
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all flex items-center justify-center w-10 h-10 shadow-lg"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
                <p className="text-[10px] text-center text-gray-600 mt-3 font-medium tracking-tight">
                    Powered by Gemini & Vercel AI SDK
                </p>
            </form>
        </div>
    );
}
