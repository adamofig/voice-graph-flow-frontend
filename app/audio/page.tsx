'use client';

export default function AudioPage() {
    return (
        <main className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Audio Processing
            </h1>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 max-w-2xl w-full text-center">
                <p className="text-gray-400 text-lg">
                    Welcome to the Audio Processing interface. This section is currently under development.
                </p>
                <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-dashed border-gray-600">
                    <p className="text-sm text-green-400">Future feature: Voice recording and AI audio transcription.</p>
                </div>
            </div>
        </main>
    );
}
