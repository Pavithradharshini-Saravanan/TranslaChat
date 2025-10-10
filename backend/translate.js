// In backend/translate.js

require("dotenv").config();
const axios = require("axios");
const { GoogleGenAI } = require("@google/genai"); 

// Check if GEMINI API key exists
const GEMINI_KEY = process.env.GEMINI_KEY;
console.log(`DEBUG: Key loaded. Length: ${GEMINI_KEY ? GEMINI_KEY.length : '0'}`); 
const translateText = async (text, targetLang, sourceLang) => {
    // Set sourceLang default to 'auto' for reliable translation
    const srcLang = sourceLang || "auto";

    // ➡️ 1. TRY GEMINI TRANSLATION (PRIORITY) ⬅️
    if (GEMINI_KEY) {
        try {
            // ⬅️ CRITICAL FIX: Pass the loaded API key explicitly 
            const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
            
            // Use a specific prompt to ensure the model only returns the translated text
            const prompt = `You are a translation assistant. Translate the following text from ${srcLang} to ${targetLang}. Only return the translated text. Text: "${text}"`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            
            if (response && response.text) {
                return response.text.trim();
            }
        } catch (error) {
            console.error("❌ Gemini Translation Failed:", error.message);
        }
    } else {
        console.warn("⚠️ GEMINI_KEY is missing. Falling back to LibreTranslate.");
    }

    // ➡️ 2. FALLBACK to LibreTranslate ⬅️
    console.log("Falling back to LibreTranslate...");
    try {
        const res = await axios.post("https://libretranslate.de/translate", {
            q: text,
            source: srcLang,
            target: targetLang,
            format: "text"
        });
        
        if (res.data && res.data.translatedText) {
            return res.data.translatedText.trim();
        } 
        else if (res.data && res.data.error) {
            console.error("❌ LibreTranslate API returned an Error:", res.data.error);
            return text; 
        }
        else {
            console.error("LibreTranslate failed to return expected data. Using original text.");
            return text; 
        }

    } catch (err) {
        console.error("❌ LibreTranslate Translation Failed (Network/Axios Error):", err.message);
        return text; 
    }
};

module.exports = { translateText };