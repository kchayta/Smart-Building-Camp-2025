import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askSmartAssistant = async (question: string): Promise<string> => {
  const client = getClient();
  if (!client) return "ขออภัย ระบบ AI ยังไม่พร้อมใช้งานในขณะนี้ (API Key Missing)";

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `You are an intelligent assistant for the "Smart Building Model Camp 2025". 
        The camp takes place from November 24-29, 2025.
        Your tone should be academic, professional, yet helpful, similar to a university professor or administrator.
        You can answer questions about Smart Buildings, IoT, Sustainable Architecture, and general camp inquiries.
        If asked about specific files or uploaded documents, explain that users can find them in the "Documents" tab.
        Answer in Thai language primarily, unless asked otherwise.`,
      }
    });
    
    return response.text || "ขออภัย ฉันไม่สามารถประมวลผลคำตอบได้ในขณะนี้";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ AI";
  }
};