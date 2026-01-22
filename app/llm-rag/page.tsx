import LLMSearch from '@/components/LLM/LLMSearch';

export default function LLMRagPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-black text-white p-4 md:p-8 flex flex-col items-center">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-4xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-tr from-emerald-400 via-white to-teal-500 bg-clip-text text-transparent italic uppercase">
                        LLM RAG
                    </h1>
                    <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
                        Contextual Retrieval • Deep Knowledge • Fast Search
                    </p>
                </div>

                <LLMSearch />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-emerald-400 text-xs font-bold uppercase mb-1">Retrieval</h3>
                        <p className="text-gray-400 text-sm">Semantic search powered by document vector embeddings.</p>
                    </div>
                    <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-teal-400 text-xs font-bold uppercase mb-1">Generation</h3>
                        <p className="text-gray-400 text-sm">Gemini 2.5 Flash for accurate and concise responses.</p>
                    </div>
                    <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-white text-xs font-bold uppercase mb-1">Architecture</h3>
                        <p className="text-gray-400 text-sm">Integrated with FastAPI backend for efficient processing.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
