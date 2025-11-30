import { GoogleGenAI } from "@google/genai";

export const generateComfortingNote = async (feeling?: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found");
    return "Remember, even the darkest night will end and the sun will rise.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = feeling 
    ? `Write a very short, poetic, and reassuring note (max 2 sentences) for someone who is feeling "${feeling}". The tone should be gentle, like a warm hug or a wise friend. Do not offer advice, just comfort.`
    : `Write a very short, poetic, and reassuring note (max 2 sentences) for someone having a rough day. The tone should be gentle, warm, and grounding.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 100,
        temperature: 0.7,
      }
    });

    return response.text || "You are stronger than you know.";
  } catch (error) {
    console.error("Failed to generate note:", error);
    return "Peace comes from within. Do not seek it without.";
  }
};
