export interface EnhancedPost {
    id: number;
    title: string;
    body: string;
    processedAt: string;
}

// This function can be called on the server (Server Components, API Routes, etc.)
export async function getEnhancedPosts(): Promise<EnhancedPost[]> {
    console.log('--- Fetching posts directly on the server ---');

    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) throw new Error('Failed to fetch posts');

    const data = await response.json();

    // Custom backend logic
    return data.map((post: any) => ({
        ...post,
        title: `[DIRECT SERVER] ${post.title}`,
        processedAt: new Date().toISOString(),
    }));
}
