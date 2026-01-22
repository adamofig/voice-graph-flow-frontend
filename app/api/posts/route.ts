import { NextResponse } from 'next/server';
import { getEnhancedPosts } from '@/lib/posts';

// Your API route also uses the same logic!
export async function GET() {
    try {
        const enhancedData = await getEnhancedPosts();
        return NextResponse.json(enhancedData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
    }
}
