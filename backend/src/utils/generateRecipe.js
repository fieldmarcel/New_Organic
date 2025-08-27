// // import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// // Initialize Google Gemini AI
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateRecipe = async () => {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const prompt = `Generate a JSON array of 100 recipes with the following schema: {...}`;

//         const result = await model.generateContent(prompt);

//         console.log("Gemini API Response:", JSON.stringify(result, null, 2)); // Log the response

//         // Extract response correctly
//         const rawContent = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
//         if (!rawContent) {
//             throw new Error("❌ No content received from Gemini API");
//         }

//         // Remove markdown code block markers if present
//         const jsonContent = rawContent.replace(/```json\n|\n```/g, "").trim();

//         return JSON.parse(jsonContent);
//     } catch (error) {
//         console.error("❌ Gemini API Error:", error);
//         return [];
//     }
// };
