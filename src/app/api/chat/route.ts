import { NextResponse } from 'next/server';
import { chatWithOllama } from '@/lib/ai';

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        // Add a system prompt to guide the AI
        const systemPrompt = {
            role: 'system',
            content: `You are a helpful AI assistant for the Community Based Health Care Management System (CBHCMS). 
            Your goal is to assist health workers and the public with health information, emergency procedures, and app navigation.
            Keep responses concise, professional, and empathetic.
            If the user indicates an emergency, advise them to call 108 immediately and trigger the emergency alert system.`
        };

        const fullMessages = [systemPrompt, ...messages];
        const response = await chatWithOllama(fullMessages);

        return NextResponse.json({ content: response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
    }
}
