import { openai } from '@ai-sdk/openai';
import { streamText, createUIMessageStream, createUIMessageStreamResponse } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Check if API key is present
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        // Return a mock stream if no API key is provided
        // This allows the UI to be tested immediately
        const stream = createUIMessageStream({
            execute: async ({ writer }) => {
                const text = "I noticed you haven't set an `OPENAI_API_KEY` in your environment variables yet. To get real responses, please add it to your `.env.local` file.\n\nIn the meantime, I am a mock response showing that the streaming UI is working correctly! 🚀";
                const words = text.split(' ');

                const id = 'mock-response';
                writer.write({ type: 'text-start', id });

                for (const word of words) {
                    writer.write({ type: 'text-delta', id, delta: word + ' ' });
                    await new Promise((resolve) => setTimeout(resolve, 50));
                }

                writer.write({ type: 'text-end', id });
            },
        });

        return createUIMessageStreamResponse({ stream });
    }

    const result = streamText({
        model: openai('gpt-4o'),
        messages,
    });

    return result.toUIMessageStreamResponse();
}
