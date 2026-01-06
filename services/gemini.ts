import type { AIService, ChatMessage } from '../types';

import {
  GoogleGenAI,
} from '@google/genai';

export const geminiService: AIService = {
    name: 'Gemini',
    async chat(messages: ChatMessage[]) {
        return async function* () {
          const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
          });
          const tools = [
            {
              googleSearch: {
              }
            },
          ];
          const config = {
            thinkingConfig: {
              thinkingBudget: 0,
            },
            tools,
          };
          const model = 'gemini-flash-lite-latest';
          const contents = messages.map((msg) => ({
            role: msg.role,
            parts: [
              {
                text: msg.content,
              },
            ],
          }));
        
          const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
          });
        
          for await (const chunk of response) {
            if (typeof chunk.text === 'string') {
              yield chunk.text;
            }
          }
        }();
    }
}

