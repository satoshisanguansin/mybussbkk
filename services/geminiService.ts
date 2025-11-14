
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { UserLocation } from '../types';

export async function getRouteInfo(prompt: string, useThinkingMode: boolean, userLocation: UserLocation | null): Promise<GenerateContentResponse> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let model;
  let config: any = {};
  let toolConfig: any = {};

  if (useThinkingMode) {
    model = 'gemini-2.5-pro';
    config = {
      thinkingConfig: { thinkingBudget: 32768 }
    };
  } else {
    model = 'gemini-2.5-flash';
    config = {
      tools: [{ googleMaps: {} }]
    };
    if (userLocation) {
        toolConfig = {
            retrievalConfig: {
                latLng: {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude
                }
            }
        }
    }
  }

  const fullPrompt = `Based on the bus routes in Bangkok, answer the following question: "${prompt}". If the question is about nearby places, use my current location as a reference.`;

  const response = await ai.models.generateContent({
    model,
    contents: fullPrompt,
    config,
    toolConfig
  });
  
  return response;
}
