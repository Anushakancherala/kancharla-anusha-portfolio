import { useState, useEffect, useRef, FormEvent } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Sparkles,
  Cpu,
  Globe,
  Terminal,
  Server,
  BookOpen,
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2,
  User,
  Send,
  MessageSquare,
  ChevronRight,
  Info,
  Layers,
  Search,
  Database,
  Cloud,
  ArrowUpRight,
  Copy,
  Sliders,
  Check,
  Clock,
  Share2
} from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { resumeData } from "./data/resumeData";
import { ProjectItem, SkillGroup } from "./types";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export default function App() {
  const { personalInfo, education, experience, skills, projects, certifications, honors } = resumeData;

  // UI state management
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(projects[0]);
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [sharedProjId, setSharedProjId] = useState<string | null>(null);

  // Chat AI twin states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello there! I am Anusha's AI Twin, trained strictly on her real-world background, experience guidelines, and projects. Feel free to interview me about her internships, multi-agent frameworks, ML pipelines, or her academic timeline at KIET Women's college!"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested questions chips
  const suggestedQuestions = [
    "What is CareBridge AI's agentic architecture?",
    "Tell me about her Google Virtual Internship",
    "What is her model accuracy on driver drowsiness?",
    "What technical languages does she practice?",
    "Where is she located & how to hire her?"
  ];

  // Auto-scroll chat history
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isChatLoading]);

  // Copy to clipboard helpers
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleShareProject = (projId: string) => {
    const shareUrl = `${window.location.origin}/#projects?id=${projId}`;
    navigator.clipboard.writeText(shareUrl);
    setSharedProjId(projId);
    setTimeout(() => setSharedProjId(null), 2000);
  };

  // Submit chat handler
  const handleChatSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    const nextHistory = [...chatHistory, { role: "user" as const, text: userMsg }];
    setChatHistory(nextHistory);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory.map(item => ({
            role: item.role,
            parts: [{ text: item.text }]
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to contact chat model endpoint.");
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: "model" as const, text: data.text }]);
    } catch (error) {
      console.error("AI Twin chat error:", error);
      setChatHistory(prev => [
        ...prev,
        {
          role: "model" as const,
          text: "I encountered a minor lag contacting the server API. Just to share, Anusha is an active B.Tech student with certifications in GCP Prompt Design and Harvard ML/AI with Python. What questions can I fetch from her database for you?"
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Pre-load prompt chips click
  const handleChipClick = (question: string) => {
    setChatInput(question);
    // Submit in next cycle
    setTimeout(() => {
      const submitBtn = document.getElementById("send-chat-btn");
      if (submitBtn) submitBtn.click();
    }, 50);
  };

  // Extract all available individual categories for showcase selector
  const skillCategories = ["All", ...skills.map((s) => s.category)];

  const filteredSkillShowcase = skills.filter((item) => {
    const matchesCategory = selectedSkillCategory === "All" || item.category === selectedSkillCategory;
    const matchesSearch = item.skills.some((s) => s.toLowerCase().includes(skillSearchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(skillSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Immersive Background Atmos Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute top-[1200px] left-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[200px] right-[-50px] w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Subtle Space Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Header Sticky Component */}
      <Header onOpenChat={() => setIsChatOpen(true)} />

      {/* Hero Branding Section */}
      <main className="relative z-10">
        <Hero onOpenChat={() => setIsChatOpen(true)} />

        {/* Brand Strategy Overview & Profile Metrics */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side summary statement */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider uppercase">
                <Sliders className="h-3 w-3" />
                Strategic Position
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                Empowering AI workflows with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">strict evidence-grade grounding</span>.
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                As a Computer Science and Engineering student at Kakinada Institute of Engineering & Technology, I bridge high-level model capabilities with low-latency client requirements. Certified by Google Cloud in Vertex AI Prompt Orchestration and Harvard in ML/AI algorithms, I focus on building responsive multi-agent tools that deliver immediate value.
              </p>

              {/* Education details */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center space-x-2.5 text-slate-300">
                  <GraduationCap className="h-5 w-5 text-cyan-400 shrink-0" />
                  <span className="font-display font-semibold text-sm">B.Tech — CSE (AI & ML Specialty)</span>
                </div>
                <div className="space-y-1.5 pl-7.5 text-xs text-slate-400">
                  <p className="font-semibold text-slate-350">{education[0].institution}</p>
                  <p className="font-mono text-cyan-500">{education[0].startDate} – {education[0].endDate} | Percentage: 75%</p>
                  <p className="text-[11px] leading-relaxed italic text-slate-400 mt-1">
                    Studies: Data Structures & Algorithms, Deep Learning, Natural Language Processing, MLOps, DBMS.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side custom differentiators */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block mb-2">
                What distinguishes my engineering profile
              </h4>

              {/* Differentiator 1 */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-cyan-500/10 p-2 rounded-xl text-cyan-400 border border-cyan-500/20">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <h5 className="font-display font-bold text-slate-100 text-base">
                    LangGraph & Agentic Workflows
                  </h5>
                </div>
                <ul className="space-y-2 pl-11.5 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0 mt-1">•</span>
                    <span>Designed a <strong>LangGraph multi-agent orchestrator</strong> with 5 responsive micro-agents and shared memory.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0 mt-1">•</span>
                    <span>Slashed caregiver manual workload by <strong>~70%</strong> on test workflows.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0 mt-1">•</span>
                    <span>Integrated low-latency <strong>Twilio WhatsApp webhooks</strong> for prompt automated wellness check-ins.</span>
                  </li>
                </ul>
              </div>

              {/* Differentiator 2 */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/10 p-2 rounded-xl text-blue-400 border border-blue-500/20">
                    <Sliders className="h-5 w-5" />
                  </div>
                  <h5 className="font-display font-bold text-slate-100 text-base">
                    Vertex AI Pipeline Deployment
                  </h5>
                </div>
                <ul className="space-y-2 pl-11.5 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold shrink-0 mt-1">•</span>
                    <span>Engineered end-to-end cloud ML pipelines covering ingestion, hyperparameter sweeps, and API deployment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold shrink-0 mt-1">•</span>
                    <span>Accelerated integration delivery by <strong>~60%</strong> utilizing modular Python automation tools.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold shrink-0 mt-1">•</span>
                    <span>Implemented Vertex AI bias auditing, model tracking, and safety interpretability guardrails.</span>
                  </li>
                </ul>
              </div>

              {/* Differentiator 3 */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500/10 p-2 rounded-xl text-purple-400 border border-purple-500/20">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <h5 className="font-display font-bold text-slate-100 text-base">
                    Edge Optimization & OpenCV Trackers
                  </h5>
                </div>
                <ul className="space-y-2 pl-11.5 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold shrink-0 mt-1">•</span>
                    <span>Developed custom deep convolutional neural networks maintaining <strong>91.4% drowsiness accuracy</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold shrink-0 mt-1">•</span>
                    <span>Optimized frames to <strong>28 FPS</strong> with <strong>sub-150ms execution latency</strong> for standard CPU-bound edge hardware.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold shrink-0 mt-1">•</span>
                    <span>Triggered safety protocol alerts and audio alarms within <strong>1.2 seconds</strong> of microsleep indications.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Featured Projects Interactive Showcase */}
        <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest block">
                Engineering Showcase
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Production-Grade AI Platforms
              </h3>
            </div>
            <p className="text-slate-450 text-sm max-w-md leading-relaxed">
              These representing 4 fully deployed pipelines and agent hubs built autonomously. Click on any project card to inspect structural points, tags, and source paths.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left list of cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {projects.map((proj) => {
                const isSelected = selectedProject.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`w-full text-left p-5 rounded-2xl backdrop-blur-md transition-all duration-305 border cursor-pointer flex flex-col space-y-3 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 ${
                      isSelected
                        ? "bg-white/15 border-cyan-400/40 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30"
                        : "bg-white/5 border-white/5 hover:bg-white/8 hover:border-cyan-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-lg text-xs font-mono font-bold uppercase ${
                          proj.id === "proj-1" ? "bg-cyan-500/15 text-cyan-400" :
                          proj.id === "proj-2" ? "bg-emerald-500/15 text-emerald-400" :
                          proj.id === "proj-3" ? "bg-blue-500/15 text-blue-400" :
                          "bg-purple-500/15 text-purple-400"
                        }`}>
                          {proj.id === "proj-1" ? "Agentic" :
                           proj.id === "proj-2" ? "Computer Vision" :
                           proj.id === "proj-3" ? "Full-Stack" : "NLP"}
                        </div>
                      </div>
                      <ChevronRight className={`h-4.5 w-4.5 transition-transform duration-300 text-slate-500 ${
                        isSelected ? "translate-x-1.5 text-cyan-400" : ""
                      }`} />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-lg text-white leading-tight group-hover:text-cyan-400">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-400 italic">
                        {proj.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 font-mono">
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 3 && (
                        <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-500 font-mono">
                          +{proj.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right details bento panel */}
            <div className="lg:col-span-7 rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-56 h-56 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="space-y-6">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/5 pb-5">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-widest font-bold">
                        Interactive Code Blueprint
                      </span>
                      <span className="inline-flex items-center gap-1.25 text-[10px] font-mono text-slate-400 select-none">
                        <Clock className="h-3.5 w-3.5 text-cyan-400" />
                        <span>
                          {selectedProject.id === "proj-1" ? "3 min read" : 
                           selectedProject.id === "proj-2" ? "2 min read" : 
                           selectedProject.id === "proj-3" ? "3 min read" : "2 min read"}
                        </span>
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-slate-500" />
                      {selectedProject.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    {/* Share Button representing recommendation tool */}
                    <button
                      onClick={() => handleShareProject(selectedProject.id)}
                      className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-805 hover:border-cyan-500/20 text-xs font-mono text-slate-300 py-2.5 px-3.5 rounded-xl transition-all cursor-pointer shadow-sm group font-medium"
                      title="Share this project layout block"
                    >
                      {sharedProjId === selectedProject.id ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-400">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="h-4 w-4 text-slate-450 group-hover:text-cyan-400 transition-colors" />
                          <span>Share Blueprint</span>
                        </>
                      )}
                    </button>

                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white py-2.5 px-4 rounded-xl transition-all duration-305 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-md shadow-cyan-500/5 group font-semibold"
                      >
                        <Github className="h-4.5 w-4.5 text-cyan-455 group-hover:text-cyan-300" />
                        <span>Source Repository</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Body paragraph */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2 text-slate-350 bg-slate-900/40 p-4 rounded-xl text-sm italic">
                    <Info className="h-4.5 w-4.5 text-cyan-400 mt-0.5 shrink-0" />
                    <p>{selectedProject.description}</p>
                  </div>

                  {/* Bullet points highlights */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      Core Implementation Metrics
                    </span>
                    <ul className="space-y-2">
                      {selectedProject.points.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-400">
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-450 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Technologies full list footer */}
              <div className="border-t border-white/5 pt-5 mt-8 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                  Assembled Technical Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-cyan-950/40 text-cyan-350 border border-cyan-900/30 font-mono px-3 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 relative">
          
          <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest block">
              Professional Timeline
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
              Google Grounded Experience
            </h3>
            <p className="text-slate-450 text-sm">
              Practical industry projects covering model optimization, pipeline architectures, and prompt grounding on Google Vertex AI.
            </p>
          </div>

          {/* Interactive Timeline Layout */}
          <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l border-white/10 space-y-12 py-4">
            {experience.map((exp, index) => (
              <div key={exp.id} className="relative group">
                
                {/* Visual Connector Dot */}
                <div className="absolute left-[-31px] sm:left-[-35px] top-1.5 w-4 h-4 rounded-full border-4 border-[#020617] bg-cyan-400 group-hover:bg-cyan-300 group-hover:scale-110 transition-all shadow-md shadow-cyan-400/20" />
                
                <div className="grid sm:grid-cols-12 gap-4 items-start">
                  
                  {/* Left Column: Organization & Dates */}
                  <div className="sm:col-span-4 space-y-1">
                    <span className="text-xs font-sans font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/10 inline-block">
                      {exp.startDate} – {exp.endDate}
                    </span>
                    <h4 className="font-display font-bold text-slate-100 text-lg leading-snug">
                      {exp.organization}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                      Location: Remote / Virtual
                    </p>
                  </div>

                  {/* Right Column: Card with Bullet description items */}
                  <div className="sm:col-span-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/8 transition-all duration-300 space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/15">
                        <Terminal className="h-4.5 w-4.5" />
                      </div>
                      <h4 className="font-display font-bold text-white text-base">
                        {exp.title}
                      </h4>
                    </div>

                    <div className="space-y-2.5">
                      {exp.highlights.map((highlight, idx) => (
                        <p key={idx} className="text-slate-400 text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                          <span className="text-cyan-400 font-bold shrink-0 mt-1">•</span>
                          <span>{highlight}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Skills Scaffold */}
        <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-10">
            
            <div className="lg:col-span-4 space-y-4 sticky top-24">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest block">
                Technical Stack
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Language & System Matrix
              </h3>
              <p className="text-slate-450 text-sm leading-relaxed">
                Highly focused expertise encompassing agentic patterns, machine learning math, vector databases, and full stack web pipelines.
              </p>

              {/* Filter selection chips */}
              <div className="pt-4 flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1">
                  Filter Category
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {skillCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedSkillCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                        selectedSkillCategory === cat
                          ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 ring-1 ring-cyan-500/20"
                          : "bg-slate-900 border-slate-800 text-slate-450 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Text Search bar */}
              <div className="relative pt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-2">
                  <Search className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="Query skill name (e.g. OpenCV)..."
                  value={skillSearchQuery}
                  onChange={(e) => setSkillSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 text-slate-300 text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Showcase skills map */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {filteredSkillShowcase.map((group, index) => {
                // Pick category color themes
                const isGenAI = group.category.includes("GenAI");
                const isML = group.category.includes("ML / AI");
                const isWeb = group.category.includes("Web");
                
                return (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md relative hover:border-white/12 transition-all space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="font-display font-bold text-sm text-white">
                        {group.category}
                      </span>
                      <div className={`p-1.5 rounded-lg border text-xs ${
                        isGenAI ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/25" :
                        isML ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" :
                        isWeb ? "bg-blue-500/10 text-blue-400 border-blue-500/25" :
                        "bg-slate-800 text-slate-400 border-slate-700/60"
                      }`}>
                        {isGenAI ? <Cpu className="h-3.5 w-3.5" /> :
                         isML ? <Sliders className="h-3.5 w-3.5" /> :
                         isWeb ? <Code2 className="h-3.5 w-3.5" /> : <Layers className="h-3.5 w-3.5" />}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-slate-900 border border-slate-800 hover:border-cyan-500/20 px-3 py-1.5 rounded-xl text-slate-300 font-mono tracking-wide transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              {filteredSkillShowcase.length === 0 && (
                <div className="sm:col-span-2 text-center py-12 bg-white/[0.02] rounded-3xl border border-white/5">
                  <p className="text-slate-505 text-sm italic">No skills matching that search query were found.</p>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Credentials & Certifications / Academics */}
        <section id="credentials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest block">
              Credibility Proofs
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
              Certifications & Honors
            </h3>
            <p className="text-slate-450 text-sm">
              Verified credentials from Google Cloud, Harvard University, and accredited organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {certifications.map((cert) => {
              // Pick custom badge themes
              const isGoogle = cert.issuer.includes("Google");
              const isHarvard = cert.issuer.includes("Harvard");
              
              return (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 backdrop-blur-sm hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {cert.date}
                      </span>
                      <div className={`p-1 text-xs rounded ${
                        isGoogle ? "bg-cyan-500/10 text-cyan-400" :
                        isHarvard ? "bg-red-500/10 text-red-450 font-semibold" :
                        "bg-slate-900 text-slate-400"
                      }`}>
                        {isGoogle ? "Google Cloud" : isHarvard ? "Harvard" : "Accredited"}
                      </div>
                    </div>

                    <h4 className="font-display font-bold text-slate-100 text-sm sm:text-base leading-snug group-hover:text-cyan-400">
                      {cert.name}
                    </h4>
                    
                    <p className="text-xs text-slate-450">
                      Issuer: <strong className="text-slate-300">{cert.issuer}</strong>
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[11px] font-mono text-cyan-500">
                    <span>Credential Verified</span>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hackathon Honor section banner */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-cyan-950/20 to-blue-950/20 border border-cyan-500/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-full bg-cyan-400/[0.01] rounded-full blur-[40px] pointer-events-none" />
            <div className="flex items-center space-x-4">
              <div className="bg-amber-500/10 p-3.5 rounded-xl text-amber-400 border border-amber-500/25 shrink-0 animate-pulse">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                  Competitive Hackathon Award
                </span>
                <p className="text-slate-200 text-sm sm:text-base font-semibold">
                  {honors[0]}
                </p>
                <p className="text-xs text-slate-450 leading-relaxed italic">
                  Challenged against 40+ engineering teams to build modular backend menus at Kakinada Institute.
                </p>
              </div>
            </div>
            
            <a
              href="#about"
              className="text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/30 px-4.5 py-2.5 rounded-xl shrink-0 text-center focus:outline-none transition-colors"
            >
              Academic Background
            </a>
          </div>

        </section>

        {/* Contact and Work Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest block">
                Let's Connect
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Establish Direct Contact
              </h3>
              <p className="text-slate-450 leading-relaxed text-sm sm:text-base">
                Anusha is seeking internship opportunities in Software Engineering and Machine Learning for 2026 and 2027 classes. Reach out via email, social networks, or perform a live chat interview with her grounded AI twin.
              </p>

              {/* Direct links list with copy buttons */}
              <div className="space-y-3.5">
                
                {/* Email copy bar */}
                <div className="p-4 rounded-xl bg-slate-900/55 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0">
                    <Mail className="h-5 w-5 text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 font-mono uppercase block">Email Address</span>
                      <a href={`mailto:${personalInfo.email}`} className="text-slate-350 text-sm block truncate hover:text-white transition-colors">{personalInfo.email}</a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-teal-400 cursor-pointer active:scale-95 transition-all"
                    title="Copy Email Address to clipboard"
                  >
                    {copiedEmail ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Phone copy bar */}
                <div className="p-4 rounded-xl bg-slate-900/55 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0">
                    <Phone className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 font-mono uppercase block">Phone Contact</span>
                      <a href="tel:+919346588878" className="text-slate-350 text-sm block truncate hover:text-white transition-colors">{personalInfo.phone}</a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-teal-400 cursor-pointer active:scale-95 transition-all"
                    title="Copy Phone Number to clipboard"
                  >
                    {copiedPhone ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Location marker */}
                <div className="p-4 rounded-xl bg-slate-900/55 border border-slate-800 flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">Primary Residency</span>
                    <span className="text-slate-350 text-sm block font-sans">{personalInfo.location}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated instant engagement board */}
            <div className="lg:col-span-7 rounded-3xl bg-white/[0.02] border border-white/5 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-[80px]" />
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
                  Live Recruiter Gateway
                </span>
                <h4 className="font-display font-bold text-white text-xl">
                  Quick Interview or Query
                </h4>
                <p className="text-slate-450 text-xs sm:text-sm">
                  Don't have time for a call? Instantly engage her conversational agent module. Her AI Twin responds in real-time about her project architectures!
                </p>
              </div>

              {/* Instant suggested quick-query prompts buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suggestedQuestions.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setIsChatOpen(true);
                      handleChipClick(q);
                    }}
                    className="text-left text-xs bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/20 text-slate-300 p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span className="truncate">{q}</span>
                    <ChevronRight className="h-3 w-3 text-slate-500 shrink-0" />
                  </button>
                ))}
              </div>

              <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-650 hover:from-cyan-400 hover:to-blue-505 text-white font-semibold rounded-xl text-xs sm:text-sm active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span>Launch Interactive Chat Console</span>
                </button>
                <span className="text-xs text-slate-500 font-mono leading-relaxed text-center sm:text-left">
                  Powered by Gemini on Vertex AI
                </span>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Atmospheric Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Stack indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-900 flex items-center justify-center text-[10px] font-bold text-teal-400" title="Python Language">Py</div>
              <div className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-900 flex items-center justify-center text-[10px] font-bold text-cyan-400" title="TensorFlow Deep Learning">Tf</div>
              <div className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-900 flex items-center justify-center text-[10px] font-bold text-blue-400" title="LangChain/LangGraph Orchestration">Lc</div>
              <div className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-900 flex items-center justify-center text-[10px] font-bold text-purple-400" title="Google Cloud Platform / Vertex AI">GCP</div>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Core Ecosystem Stack: Python • TensorFlow • LangGraph • FastAPI • React.js • Google Cloud Platform
            </span>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-4">
            <a
              href={personalInfo.github}
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub Repository Profile Link"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn Profile URL Link"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <span className="text-[11px] font-mono text-slate-500">
              © {new Date().getFullYear()} • Kancharla Anusha Portfolio
            </span>
          </div>

        </div>
      </footer>

      {/* Floating Widget Action Trigger for Chat AI Twin (When drawer is closed) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 sm:px-4.5 sm:py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-500/20 border border-cyan-400/20 cursor-pointer"
          title="Interview Anusha's AI Twin Representative"
          aria-label="Interview Anusha's AI Twin Representative"
        >
          <Sparkles className="h-5 w-5 animate-pulse text-white shrink-0" />
          <span className="hidden sm:inline text-xs font-semibold">AI Twin Chat</span>
        </button>
      )}

      {/* sliding DRAWER overlay model panel for Gemini AI Chat bot */}
      <div
        id="chatbot-drawer"
        className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-slate-950 border-l border-white/10 shadow-2xl transition-all duration-300 transform flex flex-col justify-between ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ height: "100%" }}
      >
        
        {/* Header container */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950 animate-pulse" />
              <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-xl border border-cyan-500/20">
                <Sparkles className="h-4.5 w-4.5 text-cyan-300" />
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm tracking-wide text-white">Anusha's AI Twin Agent</h4>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none mt-0.5">Prompt Grounded Bot</p>
            </div>
          </div>

          <button
            onClick={() => setIsChatOpen(false)}
            className="text-slate-450 hover:text-white px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 cursor-pointer text-xs"
          >
            Collapse
          </button>
        </div>

        {/* Chat message loops wrapper container */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-grid-pattern"
          style={{ scrollBehavior: "smooth" }}
        >
          {chatHistory.map((item, index) => {
            const isModel = item.role === "model";
            return (
              <div
                key={index}
                className={`flex ${isModel ? "justify-start" : "justify-end"} items-start gap-2.5`}
              >
                {isModel && (
                  <div className="bg-slate-900 text-cyan-400 p-1.5 rounded-lg border border-slate-850 mt-1 shrink-0">
                    <Cpu className="h-3.5 w-3.5" />
                  </div>
                )}
                
                <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                  isModel 
                    ? "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none" 
                    : "bg-cyan-500/15 text-cyan-200 border border-cyan-500/20 rounded-tr-none"
                }`}>
                  <p className="whitespace-pre-line">{item.text}</p>
                </div>
              </div>
            );
          })}

          {/* Chat loader state indicators */}
          {isChatLoading && (
            <div className="flex justify-start items-start gap-2.5">
              <div className="bg-slate-900 text-cyan-450 p-1.5 rounded-lg border border-slate-850 mt-1 shrink-0 animate-pulse">
                <Cpu className="h-3.5 w-3.5" />
              </div>
              <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/50 flex items-center space-x-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-405 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-405 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-405 animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="text-xs font-mono pl-1 text-slate-500">Retrieving intelligence database...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion questions drawer footer list */}
        <div className="p-2 border-t border-white/5 bg-slate-900/30 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleChipClick(q)}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[10px] px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 max-w-[200px] truncate"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Form controls button sender */}
        <form onSubmit={handleChatSubmit} className="p-3 border-t border-white/5 bg-slate-950 flex items-center space-x-2.5">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask her AI Twin about project designs..."
            className="flex-1 bg-slate-900 text-slate-200 text-xs sm:text-sm px-3.5 py-3 rounded-xl border border-slate-800/80 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            id="send-chat-btn"
            type="submit"
            disabled={!chatInput.trim() || isChatLoading}
            className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Send message to AI Twin"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
