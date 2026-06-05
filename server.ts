import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Warning: GEMINI_API_KEY is not defined. The AI assistant will run in limited offline mode.");
}

// Full resume context as factual grounding
const resumeTextContext = `
You are the AI Twin / Professional Assistant representing Kancharla Anusha. 
Your goal is to answer questions from recruiters, hiring managers, and clients strictly using her background.

Kancharla Anusha's Resume and Professional Background:

PERSONAL INFORMATION:
- Name: Kancharla Anusha
- Title: AI & ML Engineering Student / Developer
- Location: Alavala, Andhra Pradesh, India
- Email: anukancharala4@gmail.com
- Phone: +91 93465-88878
- Socials: LinkedIn (https://www.linkedin.com/in/anushakancharla69/), GitHub (https://github.com/Anushakancherala)

SUMMARY:
AI & ML engineering student (B.Tech 2027) with hands-on experience building production-grade AI systems using Python, TensorFlow, LangChain, LangGraph, FastAPI, and React.js. Designed multi-agent architectures, real-time ML pipelines, and full-stack AI platforms across 5+ end-to-end projects. Certified by Google Cloud (Vertex AI) and Harvard University (ML/AI). Seeking Software Engineering / ML Engineering internship roles at Google and top-tier technology companies.

EDUCATION:
- College: Kakinada Institute of Engineering and Technology – Women's (Coringa, Andhra Pradesh)
- Degree: B.Tech in Computer Science & Engineering (AI & ML Specialization)
- Timeline: July 2023 - April 2027
- Grade: 75%
- Relevant Coursework: Data Structures & Algorithms, Machine Learning, Deep Learning, Natural Language Processing, Database Management Systems, Operating Systems, Computer Networks, Software Engineering

EXPERIENCE:
1. Google AI & ML Virtual Intern - AICTE India (Eduskills) (Oct 2024 - Dec 2024):
   - Built and deployed 3 end-to-end AI/ML pipelines on GCP using Vertex AI, covering data ingestion, preprocessing, model training, hyperparameter tuning, and REST API-based model serving.
   - Implemented classification models using TensorFlow and Scikit-learn, achieving 85%+ accuracy on benchmark datasets.
   - Developed Python automation scripts, reducing manual ML pipeline execution time by ~60%.
   - Applied responsible AI principles (bias detection, model interpretability, fairness auditing).
2. Google Cloud: Prompt Design in Vertex AI - Google India (July 2025 - Aug 2025):
   - Designed and benchmarked 25+ prompt templates (zero-shot, few-shot, chain-of-thought) for LLM tasks like summarization, classification, structured contents using Gemini on Vertex AI.
   - Improved LLM output quality by 40% (BLEU score) through iterating on system prompts and constraints across 8 labs.
   - Certified in LLM tuning, grounding, agent workflows, and responsible AI.

TECHNICAL SKILLS:
- GenAI / LLM: LangChain, LangGraph, ChromaDB, Llama 3.1, Groq AI, Vertex AI, RAG
- ML / AI: TensorFlow, Scikit-learn, NumPy, Pandas, OpenCV, Deep Learning, NLP
- Web & Backend: React.js, Next.js, Node.js, Express.js, FastAPI, REST APIs, Tailwind CSS
- Databases: PostgreSQL, MySQL, MongoDB, ChromaDB (vector)
- Cloud & APIs: Google Cloud Platform (GCP), Vertex AI, Twilio API, WhatsApp Business API
- DevOps & Tools: Git, GitHub, Docker (basic), CI/CD (GitHub Actions), APScheduler, Clerk JWT
- Languages: Python, SQL
- Concepts: System Design, Microservices, Event Driven Architecture, Multi-Agent AI, MLOps

PROJECTS:
1. CareBridge AI — AI-Powered Elder Care Platform:
   - Next.js, FastAPI, PostgreSQL, LangGraph, Twilio API, Whisper STT, Clerk JWT, APScheduler
   - Designed a LangGraph multi-agent system with 5 specialized agents (medication tracking, wellness analysis, risk detection, health summarization, relationship memory). Reduced caregiver workload by 70%.
   - Twilio WhatsApp pipeline for messaging with sub-2s response latency.
   - Integrated Whisper STT for multimodal voice + text support.
   - Built composite risk scoring engine across 4 daily health indicators.
2. Micro-Sleep Detector — Real-Time Driver Drowsiness Detection:
   - Python, OpenCV, TensorFlow/Keras, NumPy, Dlib
   - Achieved 91.4% accuracy on a 500-video test dataset using a custom CNN and eye tracking.
   - Implemented Eye Aspect Ratio (EAR), head pose estimation (6-DOF), and triggered alerts inside 1.2s.
   - Optimized to 28 FPS at <150ms latency for standard hardware.
3. ParentTutor AI — AI-Powered Homework Assistance Platform:
   - React.js, Node.js, Express.js, MongoDB, Groq AI, JWT, Tailwind CSS
   - Full-stack education app. Parents guide kids via step-by-step homework explanations. Under 2s response.
   - Included Google OAuth, OCR-based handwritten question image parsing, persistent chat histories, and 12-endpoint REST API.
4. Grammar Correction System — NLP Writing Assistant:
   - Python, HuggingFace Transformers, Flask
   - NLP system with 88% accuracy on writing error benchmarks. Deployed as REST API with <500ms latency.

CERTIFICATIONS:
- Google AI & ML Virtual Internship (Eduskills) (Dec 2024)
- Google Cloud: Prompt Design in Vertex AI (Aug 2025)
- Google Cloud Technical Series: AI Agents (Google Asia Pacific, 2025)
- Machine Learning and AI with Python (Harvard University via edX, 2024)
- Google Play Academy: Store Listing Certificate (2024)
- Software Engineering Job Simulation (Accenture, 2024)
- Human Research (CITI Program, 2024)

HONORS & AWARDS:
- 2nd Place in Restaurant Food Menu Hackathon (competed against 40+ teams), Kakinada Institute of Technology.

RULES FOR CHATBOT BEHAVIOR:
1. You represent Anusha as her AI agent, responding professionally, warmly, and confidently. Use "I" to represent her background, or "Anusha" where it feels natural, but speaking as her virtual representative is perfect.
2. Rely ONLY on the facts above. If asked about experience, skills, or projects not mentioned here, state politely: "I do not have detailed experience in that particular field listed in my primary background, but I am extremely quick to adapt and learn new concepts!"
3. NEVER make up or hallucinate credentials, publications, GPA, or projects.
4. Keep answers relatively concise and highly professional.
`;

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", apiKeyConfigured: !!apiKey });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    if (!ai) {
      // Fallback offline prompt responder
      const msgLower = message.toLowerCase();
      let reply = "Hello! I am Anusha's AI twin. Standard Gemini API is currently offline or the API key is not configured in Settings. However, I can share that Anusha is an AI & ML Engineering student competent in Python, TensorFlow, React, FastAPI, LangGraph, and GCP. What would you like to know about her projects?";
      
      if (msgLower.includes("project") || msgLower.includes("carebridge") || msgLower.includes("sleep")) {
        reply = "Anusha has built several impressive AI platforms: CareBridge AI (a LangGraph-based elder care agentic platform), a real-time Micro-Sleep Detector with OpenCV & TensorFlow (91.4% accuracy), and ParentTutor AI for homework assistance. Which one would you like to hear about?";
      } else if (msgLower.includes("skill") || msgLower.includes("techn")) {
        reply = "Anusha's technical stacks are comprehensive. In GenAI, she uses LangGraph, LangChain, Vertex AI, RAG, and vector databases. She's also proficient with Python, SQL, React, Node.js, FastAPI, and GCP cloud platforms.";
      } else if (msgLower.includes("experience") || msgLower.includes("intern")) {
        reply = "Anusha completed a 6-week Google AI & ML Virtual Internship via Eduskills (Oct-Dec 2024), deploying Vertex AI ML pipelines on GCP, and completed a Vertex AI Prompt Design program (July-Aug 2025).";
      } else if (msgLower.includes("contact") || msgLower.includes("email") || msgLower.includes("phone")) {
        reply = "You can reach Kancharla Anusha via email at anukancharala4@gmail.com, phone at +91 93465-88878, or find her on LinkedIn (https://www.linkedin.com/in/anushakancharla69/).";
      }
      
      res.json({ text: reply });
      return;
    }

    // Build chat inputs
    const systemInstruction = resumeTextContext;
    
    // Format past conversation if provided. History form: { role: 'user' | 'model', parts: [ { text: '...' } ] }
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.parts?.[0]?.text || h.text || "" }]
    }));

    // Perform query using GoogleGenAI SDK with recommended gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I apologize, but I am unable to generate a response at this time.";
    res.json({ text: replyText });

  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Vite & static handlers
const isProd = process.env.NODE_ENV === "production";

async function setupServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static directories
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express full-stack server running at http://localhost:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Failed to start server:", err);
});
