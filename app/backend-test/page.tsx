'use client'; // CRITICAL: This allows interactivity

import Link from 'next/link';
import { getEnhancedPosts, type EnhancedPost } from '@/lib/posts';

export default async function BackendPage() {
    // Calling the backend logic DIRECTLY (No internal fetch request!)
    const posts = await getEnhancedPosts();

    return (
        <main className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black tracking-tighter text-white">
                        Backend <span className="text-emerald-400">Logic</span> Output
                    </h1>
                    <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                        ← Home
                    </Link>
                </div>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.id} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-all group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest px-2 py-1 rounded bg-emerald-500/10">
                                    Processed by Server
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                    {new Date(post.processedAt).toLocaleTimeString()}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {post.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
