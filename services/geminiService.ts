import { GoogleGenAI, Chat } from "@google/genai";
import { Product } from "../types";

// Initialize Gemini
const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const createStylistChat = (products: Product[]): Chat => {
  const productContext = products.map(p => 
    `- ${p.name} (${p.brand}): $${p.price}, Category: ${p.category}`
  ).join('\n');

  const systemInstruction = `You are "Vi", the personal AI Stylist for Violet Essentials.
  
  Your goal is to help customers find products from our catalog.
  Be chic, helpful, and concise. Use emojis occasionally 👗✨.
  
  Here is the current product catalog available on the page:
  ${productContext}
  
  Rules:
  1. Only recommend products from this list.
  2. If a user asks for something we don't have, politely suggest a similar category or item from the list.
  3. Keep responses short (under 50 words) unless describing a full outfit.
  4. Always mention the price when recommending an item.
  `;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
    },
  });
};

export const sendMessageToStylist = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    return result.text || "I'm having a fashion moment... let me think again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the fashion mainframe right now. Please try again later.";
  }
};