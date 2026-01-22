import Link from 'next/link';

interface Post {
    id: number;
    title: string;
    body: string;
}

async function getPosts(): Promise<Post[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function DataPage() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-[#0a0a0c] text-white p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex justify-between items-center">
                    <div>
                        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            Dynamic Content
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Exploring the power of Next.js Server Components by fetching real-time data from a dummy API.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium backdrop-blur-sm"
                    >
                        ← Back to Home
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/5 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)] shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                <span className="text-4xl font-bold text-indigo-500">#{post.id}</span>
                            </div>

                            <h2 className="text-xl font-bold mb-4 group-hover:text-indigo-400 transition-colors uppercase tracking-wider line-clamp-2">
                                {post.title}
                            </h2>

                            <p className="text-gray-400 leading-relaxed line-clamp-3">
                                {post.body}
                            </p>

                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                                    Read More
                                </span>
                                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-20 py-8 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm">
                        Powered by Next.js Server Components & JSONPlaceholder
                    </p>
                </footer>
            </div>
        </main>
    );
}
