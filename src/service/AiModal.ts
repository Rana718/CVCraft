
import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.NEXT_PUBLIC_API_KEY
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const AIChatSession = model.startChat({
    generationConfig,
    history: [
    ],
});
