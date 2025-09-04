import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";


export const maxDuration = 120;

// quick health check
export async function GET() {
    return new Response('research route alive', {status: 200});
}

export async function POST(req: Request) {
    const { messages }: {messages: UIMessage[] } = await req.json();

    const result = streamText({
        // Deep research lives on Responses API.

        model: openai.responses(
            process.env.DEEP_RESEARCH_MODELL ?? 'o4-mini-deep-research-2025-06-26'
        ),
        messages: convertToModelMessages(messages),

        tools: {
            web_search_preview: openai.tools.webSearchPreview({

            })
        },
    });

    return result.toUIMessageStreamResponse();
    
}