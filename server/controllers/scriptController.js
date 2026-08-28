import Script from "../models/Script.js";
import { GoogleGenAI } from "@google/genai";
import { buildHardcodedScript } from "../utils/scriptEngine.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const memoryScripts = [];
const isDbConnected = () => mongoose.connection.readyState === 1;

export const generateScript = async (req, res) => {
  try {
    const { contentType, tone, audience, topic, platform, duration, characters } = req.body;

    let generatedText = null;

    // Use Gemini API if GEMINI_API_KEY is available
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `
You are an expert Hollywood scriptwriter, viral content creator, and master storyteller.
Your task is to write an exceptionally high-quality, highly engaging, and fully realized production script about the topic: "${topic || 'Innovation'}".

Target Parameters:
- Content Type / Format: ${contentType || 'Short-Form Video'}
- Topic: ${topic || 'General Subject'}
- Tone & Style: ${tone || 'Engaging and Dynamic'}
- Target Audience: ${audience || 'General Audience'}
- Target Platform: ${platform || 'Social Media / YouTube / Cinema'}
- Target Duration: ${duration || '60 seconds'}
- Characters & Performers: ${characters || 'Host / Narrator'}

Script Writing Guidelines:
1. Make the script authentic, deeply informative, and entertaining.
2. Structure the content according to the requested duration (${duration}) and content type (${contentType}).
3. Include clear visual directions in square brackets (e.g. [CAMERA: Fast zoom-in], [SFX: Bass drop], [VISUAL: Split screen comparison]).
4. Provide multi-turn, natural dialogues with character names in uppercase and emotional parentheticals (e.g., ALEX (excitedly): "Dialogue here").
5. Craft a high-converting or memorable Call to Action (CTA) tailored specifically to ${platform || 'the viewer'}.

Output Schema (Respond STRICTLY with valid JSON only):
{
  "title": "An irresistible, highly creative title for the script",
  "hook": "An unforgettable opening hook (first 3-5 seconds) with visual cues [VISUAL: ...] and audio cues [SFX: ...]",
  "body": "The comprehensive main body of the script with timed scene progressions (e.g., [0:00-0:30] Scene 1), narrative arcs, key insights, and stage directions",
  "dialogues": "Character dialogue interactions formatted as SPEAKER (direction): \\"Dialogue line\\"",
  "cta": "A powerful, platform-specific final call to action or closing remark"
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });

        if (response && response.text) {
          let cleanText = response.text.trim();
          if (cleanText.startsWith("```json")) {
            cleanText = cleanText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
          } else if (cleanText.startsWith("```")) {
            cleanText = cleanText.replace(/^```\s*/, "").replace(/\s*```$/, "");
          }
          generatedText = JSON.parse(cleanText);
        }
      } catch (aiError) {
        console.warn("Gemini AI generation failed, using fallback engine:", aiError.message);
      }
    }

    // Fallback to internal rule engine if Gemini AI is not configured or failed
    if (!generatedText) {
      generatedText = buildHardcodedScript({
        contentType,
        tone,
        audience,
        topic,
        platform,
        duration,
        characters
      });
    }

    // Identify user if token is provided in Authorization header
    let userId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
        userId = decoded.id;
      } catch (e) {
        // Ignored
      }
    }

    // Automatically save script to backend if user is authenticated
    if (userId) {
      if (isDbConnected()) {
        await Script.create({
          userId,
          contentType,
          tone,
          audience,
          topic,
          platform,
          duration,
          characters,
          generatedText
        }).catch(err => console.log("Auto-save script Mongo warning:", err.message));
      } else {
        memoryScripts.unshift({
          _id: "script_" + Date.now(),
          userId,
          contentType,
          tone,
          audience,
          topic,
          platform,
          duration,
          characters,
          generatedText,
          createdAt: new Date()
        });
      }
    }

    res.json({ generatedText });
  } catch (error) {
    console.error("Error generating script:", error);
    res.status(500).json({ message: "Failed to generate script. Please check your inputs and try again." });
  }
};

export const saveScript = async (req, res) => {
  try {
    const { contentType, tone, audience, topic, platform, duration, characters, generatedText } = req.body;
    
    if (isDbConnected()) {
      const saved = await Script.create({
        userId: req.user.id,
        contentType,
        tone,
        audience,
        topic,
        platform,
        duration,
        characters,
        generatedText
      });
      return res.status(201).json(saved);
    }

    // Fallback: in-memory store
    const saved = {
      _id: "script_" + Date.now(),
      userId: req.user.id,
      contentType,
      tone,
      audience,
      topic,
      platform,
      duration,
      characters,
      generatedText,
      createdAt: new Date()
    };
    memoryScripts.unshift(saved);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    if (isDbConnected()) {
      const scripts = await Script.find({ userId: req.user.id }).sort({ createdAt: -1 });
      return res.json(scripts);
    }

    // Fallback: in-memory store
    const scripts = memoryScripts.filter(s => s.userId === req.user.id);
    res.json(scripts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};