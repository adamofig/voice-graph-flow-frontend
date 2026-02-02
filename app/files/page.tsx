'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface UniqueFile {
    filename: string;
    mimetype: string;
    binaryHash: string;
    chunkCount: number;
}

export default function FilesPage() {
    const [files, setFiles] = useState<UniqueFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('/api/files');
                const result = await response.json();
                if (result.success) {
                    setFiles(result.data);
                } else {
                    setError(result.error || 'Failed to fetch files');
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    const getFileIcon = (mimetype: string) => {
        if (mimetype.includes('pdf')) return '📄';
        if (mimetype.includes('image')) return '🖼️';
        if (mimetype.includes('text')) return '📝';
        return '📁';
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-8 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                            ← Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Loaded Files
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Overview of all unique documents processed and indexed in the vector database.
                    </p>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[#161618] border border-white/5 rounded-2xl p-6 animate-pulse">
                                <div className="h-10 w-10 bg-white/10 rounded-lg mb-4"></div>
                                <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
                                <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
                        Error: {error}
                    </div>
                ) : files.length === 0 ? (
                    <div className="bg-[#161618] border border-white/5 rounded-2xl p-12 text-center">
                        <div className="text-4xl mb-4">📂</div>
                        <p className="text-gray-400">No files found in the database.</p>
                        <Link href="/upload-files" className="mt-4 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors text-sm font-medium">
                            Upload your first file
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {files.map((file) => (
                            <div
                                key={file.binaryHash}
                                className="group relative bg-[#161618] border border-white/5 rounded-2xl p-6 hover:bg-[#1c1c1f] hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                            >
                                <div className="absolute top-4 right-4 text-[10px] font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
                                    ID: {file.binaryHash.substring(0, 8)}...
                                </div>
                                <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                    {getFileIcon(file.mimetype)}
                                </div>
                                <h3 className="text-lg font-semibold truncate pr-8 mb-1" title={file.filename}>
                                    {file.filename}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider">
                                    {file.mimetype.split('/')[1] || 'Unknown'}
                                </p>
                                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 uppercase">Vector Chunks</span>
                                        <span className="text-lg font-mono text-blue-400 font-bold">{file.chunkCount}</span>
                                    </div>
                                    <button className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}
