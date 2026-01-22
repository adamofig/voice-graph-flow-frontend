'use client';

import { useState } from 'react';
import { Search, Loader2, FileText, ExternalLink, Hash, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    type: string;
    results: SearchResult[];
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('keyword');
    const [limit, setLimit] = useState(5);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        try {
            const url = `http://0.0.0.0:8000/search?query=${encodeURIComponent(query)}&type=${type}&limit=${limit}`;
            const response = await fetch(url, {
                headers: {
                    'accept': 'application/json',
                },
            });
            const data: ApiResponse = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error('Search failed:', error);
            // Fallback for demo if backend is not running
            // setResults([]); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Database Search
                </h1>
                <p className="text-gray-400">Query your processed documents using keyword or semantic search.</p>
            </div>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type your search query..."
                            className="w-full bg-gray-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Type:</span>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="bg-gray-950/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                >
                                    <option value="keyword">Keyword</option>
                                    <option value="semantic">Semantic</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Limit:</span>
                                <select
                                    value={limit}
                                    onChange={(e) => setLimit(Number(e.target.value))}
                                    className="bg-gray-950/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                >
                                    {[5, 10, 20, 50].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                            Search
                        </button>
                    </div>
                </form>
            </section>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-gray-500 animate-pulse"
                        >
                            <Loader2 size={48} className="animate-spin mb-4 text-purple-500" />
                            <p>Querying the database...</p>
                        </motion.div>
                    ) : (
                        results.map((result, idx) => (
                            <motion.div
                                key={`${result.source}-${idx}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                                <FileText className="text-purple-400" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                                    {result.metadata.origin?.filename || result.source}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Hash size={12} />
                                                        Chunk {result.chunk_index}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Info size={12} />
                                                        Score: {result.score.toFixed(4)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                            <ExternalLink size={18} />
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                                            {result.text}
                                        </p>
                                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {result.metadata.headings && result.metadata.headings.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {result.metadata.headings.map((heading, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-500">
                                                    {heading}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}

                    {!isLoading && hasSearched && results.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 text-gray-500 bg-white/5 border border-dashed border-white/10 rounded-2xl"
                        >
                            <Search size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-lg">No results found for "{query}"</p>
                            <p className="text-sm mt-1">Try changing your search terms or type.</p>
                        </motion.div>
                    )}

                    {!hasSearched && (
                        <div className="text-center py-20 text-gray-600">
                            <Search size={64} className="mx-auto mb-4 opacity-10" />
                            <p>Enter a query above to search the database.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
