import { Groq } from 'groq-sdk';
import type { AIService, ChatMessage } from '../types';
const API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({
    apiKey: API_KEY
});

export const groqService: AIService = {
    name: 'Groq',
    async chat(messages: ChatMessage[]) {
        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: "openai/gpt-oss-120b",
            temperature: 1,
            max_completion_tokens: 8192,
            top_p: 1,
            stream: true,
            reasoning_effort: "medium",
            stop: null
        });

        return async function* () {
            for await (const chunk of chatCompletion) {
                yield chunk.choices[0]?.delta?.content || '';
            }
        }();
    }
}

