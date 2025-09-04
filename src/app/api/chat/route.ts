import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function GET() {
    return new Response('chat+search route alive', {status: 200});
}

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: openai('gpt-5'),
        messages: convertToModelMessages(messages),

        // Enable OpenAI's web search tool
        tools: {
            web_search_preview: openai.tools.webSearchPreview({

                // contxt
                searchContextSize: "high"
            }),
        }


    });
    
   return result.toUIMessageStreamResponse(); 
}