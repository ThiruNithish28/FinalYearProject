import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }  from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
export const geminiRun =async (input)=> {
   
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(input);
    return result.response.text();
}

export const getTitle = async (query,response) =>{
  let input = `Give a single best title for this conversation in one sentence. User: ${query} Gemini: ${response} Title:`;
  const result = await geminiRun(input);
  return result.replaceAll("*","");
}

export const getKeyWordExtract = async (query,response) =>{ 
  const prompt = `
  Extract 1 short, specific search query to find a good tutorial on YouTube for the user's question.
  
  Conversation:
  User: ${query}
  Gemini: ${response}
  
  Only output the search query (no explanation). Example format: "Fibonacci sequence in Java"
  Search Query:
  `;
  
  const result = await geminiRun(prompt);
  return result.replaceAll("*","");
}