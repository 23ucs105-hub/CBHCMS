export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3'; // or mistral, tinyllama

export async function chatWithOllama(messages: ChatMessage[]) {
    try {
        const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                messages: messages,
                stream: false, // For simplicity now, stream later if needed
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.message.content;
    } catch (error) {
        console.error('Failed to connect to Ollama:', error);
        return "I'm having trouble connecting to my brain (Ollama). Please ensure it's running locally.";
    }
}
