
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyParentingTip = async (parentContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, encouraging daily parenting tip for a parent of a 0-6 year old. Context: ${parentContext}. Keep it under 200 characters and include a kitten emoji.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text || "You're doing a great job today! 🐾";
  } catch (error) {
    console.error("Error fetching tip:", error);
    return "Remember to take a deep breath today. Happy parents make happy homes! 🐱";
  }
};

export const askKittieAssistant = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: "You are 'Kittie', the AI assistant for Kittens Korner. You are helpful, kind, and supportive to parents. Your advice is focused on 0-6 year old development, parent wellness (avoiding burnout), and the Kittens Korner play space philosophy.",
      }
    });
    return response.text;
  } catch (error) {
    return "I'm having a little catnap right now, but I'll be back to help you soon! 🐾";
  }
};
