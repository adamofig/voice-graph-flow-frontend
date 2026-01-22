'use client';

import React, { useState } from 'react';

interface SearchResult {
    text: string;
    metadata: {
        origin?: {
            filename: string;
        };
        headings?: string[];
    };
    source: string;
    chunk_index: number;
    score: number;
}

interface ApiResponse {
    query: string;
    search_type: string;
    results: SearchResult[];
    llm_response: string;
}

const LLMSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setApiResponse(null);

        try {
            const res = await fetch(`http://0.0.0.0:8000/llm-with-rag?query=${encodeURIComponent(query)}&limit=3`);
            if (!res.ok) {
                throw new Error('Failed to fetch response from RAG service');
            }
            const data: ApiResponse = await res.json();
            setApiResponse(data);
        } catch (err: any) {
            console.error('API Error:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full bg-gray-900/40 border border-gray-800 rounded-2xl backdrop-blur-sm p-6 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-lg transition-colors"
                >
                    {isLoading ? 'Asking...' : 'Ask'}
                </button>
            </form>

            {error && (
                <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm">
                    {error}
                </div>
            )}

            {apiResponse && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-wider">AI Response</h3>
                        </div>
                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-gray-100 whitespace-pre-wrap leading-relaxed text-lg font-medium shadow-inner">
                            {apiResponse.llm_response}
                        </div>
                    </div>

                    {apiResponse.results && apiResponse.results.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                                <h3 className="text-teal-400 text-xs font-bold uppercase tracking-wider">Sources Considered</h3>
                            </div>
                            <div className="grid gap-3">
                                {apiResponse.results.map((result, idx) => (
                                    <div
                                        key={idx}
                                        className="group p-4 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-teal-500/30 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-gray-800 rounded-lg group-hover:bg-teal-500/10 transition-colors">
                                                    <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-300">
                                                    {result.metadata.origin?.filename || result.source}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded-full">
                                                    Chunk {result.chunk_index}
                                                </span>
                                                <span className="text-[10px] text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded-full">
                                                    Score: {result.score.toFixed(3)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                            {result.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LLMSearch;
