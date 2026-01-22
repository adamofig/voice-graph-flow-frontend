import ChatInterface from '@/components/Chat/ChatInterface';

export default function LLMPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-black text-white p-4 md:p-8 flex flex-col items-center">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-4xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-tr from-blue-400 via-white to-purple-500 bg-clip-text text-transparent italic">
                        VOICEGRAPHFLOW
                    </h1>
                    <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
                        Real-time streaming • Context aware • Premium AI
                    </p>
                </div>

                <ChatInterface />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-blue-400 text-xs font-bold uppercase mb-1">Capabilities</h3>
                        <p className="text-gray-400 text-sm">Real-time streaming responses with context memory.</p>
                    </div>
                    <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-purple-400 text-xs font-bold uppercase mb-1">Architecture</h3>
                        <p className="text-gray-400 text-sm">Built with Next.js App Router and Vercel AI SDK.</p>
                    </div>
                    <div className="p-4 bg-gray-900/40 border border-gray-800 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-white text-xs font-bold uppercase mb-1">Security</h3>
                        <p className="text-gray-400 text-sm">Server-side SDK calls keep API keys protected.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
