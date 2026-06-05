import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Kancharla Anusha",
    title: "AI & ML Engineer",
    location: "Alavala, Andhra Pradesh, India",
    email: "anukancharala4@gmail.com",
    phone: "+91 93465-88878",
    linkedin: "https://www.linkedin.com/in/anushakancharla69/",
    github: "https://github.com/Anushakancherala",
    summary: "AI & ML engineering student (B.Tech 2027) with hands-on experience building production-grade AI systems using Python, TensorFlow, LangChain, LangGraph, FastAPI, and React.js. Designed multi-agent architectures, real-time ML pipelines, and full-stack AI platforms across 5+ end-to-end projects. Certified by Google Cloud (Vertex AI) and Harvard University (ML/AI). Seeking Software Engineering / ML Engineering internship roles at Google and top-tier technology companies."
  },
  education: [
    {
      id: "edu-1",
      institution: "Kakinada Institute of Engineering and Technology – Women's",
      degree: "B.Tech — Computer Science & Engineering (AI & ML Specialization)",
      location: "Coringa, Andhra Pradesh",
      startDate: "July 2023",
      endDate: "April 2027",
      score: "Percentage: 75%",
      details: [
        "Relevant Coursework: Data Structures & Algorithms, Machine Learning, Deep Learning, Natural Language Processing, Database Management Systems, Operating Systems, Computer Networks, Software Engineering"
      ]
    }
  ],
  experience: [
    {
      id: "exp-1",
      title: "Google AI & ML Virtual Intern",
      organization: "AICTE India (Eduskills)",
      startDate: "Oct 2024",
      endDate: "Dec 2024",
      highlights: [
        "Built and deployed 3 end-to-end AI/ML pipelines on Google Cloud Platform using Vertex AI, covering data ingestion, preprocessing, model training, hyperparameter tuning, and REST API-based model serving.",
        "Implemented classification models using TensorFlow and Scikit-learn, achieving 85%+ accuracy on benchmark datasets through iterative feature engineering and cross-validation.",
        "Developed Python automation scripts reducing manual ML pipeline execution time by ~60% across 3 project modules.",
        "Applied responsible AI principles including bias detection, model interpretability, and fairness auditing across all GCP solutions."
      ]
    },
    {
      id: "exp-2",
      title: "Google Cloud: Prompt Design in Vertex AI",
      organization: "Google India",
      startDate: "July 2025",
      endDate: "Aug 2025",
      highlights: [
        "Designed and benchmarked 25+ prompt templates (zero-shot, few-shot, chain-of-thought) for LLM tasks — summarization, classification, and structured content generation — using Gemini on Vertex AI.",
        "Improved LLM output quality by 40% (BLEU score) by iterating on system prompts and output constraint techniques across 8 hands-on labs.",
        "Completed certification covering LLM tuning, grounding, agent workflows, and responsible AI deployment on Google Cloud."
      ]
    }
  ],
  skills: [
    {
      category: "GenAI / LLM",
      skills: ["LangChain", "LangGraph", "ChromaDB", "Llama 3.1", "Groq AI", "Vertex AI", "RAG"]
    },
    {
      category: "ML / AI",
      skills: ["TensorFlow", "Scikit-learn", "NumPy", "Pandas", "OpenCV", "Deep Learning", "NLP"]
    },
    {
      category: "Web & Backend",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "REST APIs", "Tailwind CSS"]
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "ChromaDB (vector)"]
    },
    {
      category: "Cloud & APIs",
      skills: ["Google Cloud Platform (GCP)", "Vertex AI", "Twilio API", "WhatsApp Business API"]
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "GitHub", "Docker (basic)", "CI/CD (GitHub Actions)", "APScheduler", "Clerk JWT"]
    },
    {
      category: "Languages",
      skills: ["Python", "SQL"]
    },
    {
      category: "Concepts",
      skills: ["System Design", "Microservices", "Event Driven Architecture", "Multi-Agent AI", "MLOps"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "CareBridge AI",
      subtitle: "AI-Powered Elder Care Platform",
      technologies: ["Next.js", "FastAPI", "PostgreSQL", "LangGraph", "Twilio API", "Whisper STT", "Clerk JWT", "APScheduler"],
      description: "Architected a production-grade full-stack AI elder care platform with real-time health monitoring and WhatsApp-based communication for elderly users and caregivers.",
      points: [
        "Designed a LangGraph multi-agent system with 5 specialized agents (medication tracking, wellness analysis, risk detection, health summarization, relationship memory), reducing caregiver check-in workload by ~70%.",
        "Built a Twilio WhatsApp pipeline for automated daily check-ins and medication reminders with sub-2 second event-driven webhook response latency.",
        "Integrated Whisper STT for multimodal voice + text interaction.",
        "Engineered a composite risk scoring engine across 4 daily health signals with real-time caregiver alerting, and implemented Clerk JWT + Google OAuth and normalized PostgreSQL schema for longitudinal health history."
      ],
      githubUrl: "https://github.com/Anushakancherala/CareBridge-AI"
    },
    {
      id: "proj-2",
      title: "Micro-Sleep Detector",
      subtitle: "Real-Time Driver Drowsiness Detection",
      technologies: ["Python", "OpenCV", "TensorFlow/Keras", "NumPy", "Dlib"],
      description: "Built a real-time drowsiness detection system achieving 91.4% accuracy on a 500-video test set using a CNN with eye and face visual tracking.",
      points: [
        "Implemented Eye Aspect Ratio (EAR) algorithm, head pose estimation (6-DOF), and microsleep classification.",
        "Triggered audio + visual safety alerts within 1.2 seconds of drowsiness onset.",
        "Optimized inference pipeline to 28 FPS at <150ms latency, enabling GPU-free edge deployment on standard hardware.",
        "Triggered safety protocol alerts and audio alarms within 1.2 seconds of microsleep indications."
      ],
      githubUrl: "https://github.com/Anushakancherala/micro-sleep-detection-"
    },
    {
      id: "proj-3",
      title: "ParentTutor AI",
      subtitle: "AI-Powered Homework Assistance Platform",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Groq AI", "JWT", "Tailwind CSS"],
      description: "Built a full-stack AI educational platform enabling parents to guide children through homework via Groq AI step-by-step explanations.",
      points: [
        "Supports 10+ subject areas with under 2-second response time.",
        "Implemented JWT + Google OAuth, OCR-based image upload for handwritten questions, and persistent cross-device chat history.",
        "Designed a 12-endpoint REST API covering user management, conversation history, AI response rating, and content moderation."
      ],
      githubUrl: "https://github.com/Anushakancherala/parentbridgeai"
    },
    {
      id: "proj-4",
      title: "Grammar Correction System",
      subtitle: "NLP Writing Assistant",
      technologies: ["Python", "HuggingFace Transformers", "Flask"],
      description: "Built a transformer-based grammar correction system achieving 88% accuracy on GEC benchmarks.",
      points: [
        "Evaluated subject-verb agreement, tense, article usage, and multiple spelling/syntactic rules across 6 error categories.",
        "Deployed as a Flask REST API with <500ms inference latency and evaluated precision/recall metrics over test datasets."
      ],
      githubUrl: "https://github.com/Anushakancherala/Grammar-Correction-System"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Google AI & ML Virtual Internship (6-week)",
      issuer: "AICTE Eduskills",
      date: "Dec 2024"
    },
    {
      id: "cert-2",
      name: "Google Cloud: Prompt Design in Vertex AI",
      issuer: "Google India",
      date: "Aug 2025"
    },
    {
      id: "cert-3",
      name: "Google Cloud Technical Series: AI Agents",
      issuer: "Google Asia Pacific",
      date: "2025"
    },
    {
      id: "cert-4",
      name: "Machine Learning and AI with Python",
      issuer: "Harvard University (edX)",
      date: "2024"
    },
    {
      id: "cert-5",
      name: "Google Play Academy: Store Listing Certificate",
      issuer: "Google",
      date: "2024"
    },
    {
      id: "cert-6",
      name: "Software Engineering Job Simulation",
      issuer: "Accenture",
      date: "2024"
    },
    {
      id: "cert-7",
      name: "Human Research (CITI Program)",
      issuer: "Collaborative Institutional Training Initiative",
      date: "2024"
    }
  ],
  honors: [
    "2nd Place — Restaurant Food Menu Hackathon, Kakinada Institute of Technology (competed against 40+ teams)"
  ]
};
