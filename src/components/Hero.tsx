import { ArrowRight, Sparkles, Terminal, Code2, Cpu, Globe } from "lucide-react";
import { resumeData } from "../data/resumeData";

interface HeroProps {
  onOpenChat: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  const { personalInfo } = resumeData;

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background decoration orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[125px] -translate-x-1/2 -translate-y-1/2 animate-glow opacity-80 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[110px] translate-x-1/2 translate-y-1/2 animate-pulse-slow pointer-events-none" />

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Text information */}
          <div className="md:col-span-7 flex flex-col space-y-6">
            
            {/* Tagline / status indicator badge */}
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3.5 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">
                Active Seeking ML / SE Internships @ Google
              </span>
            </div>

            {/* Title / Name */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                Architecting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  Autonomous Intelligence
                </span>
              </h1>
              <p className="text-slate-400 text-[11px] font-mono tracking-widest uppercase font-bold text-cyan-500">
                AI & ML Systems Engineer • KIET CSE (AI & ML Specialty)
              </p>
            </div>

            {/* Brand Statement / Summary */}
            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Specializing in multi-agent architectures and low-latency digital pipelines. I build intelligent fullstack software tools that bridge real-world workflows with robust models.
            </p>

            {/* Strongest Achievement Banner */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all flex items-start space-x-3.5 max-w-xl">
              <div className="bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/25 text-cyan-400 mt-1 shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block">
                  Featured Innovation
                </span>
                <p className="text-slate-350 text-xs sm:text-sm">
                  Created <span className="text-cyan-305 font-bold">CareBridge AI</span>: A multi-agent LangGraph platform integrated with Twilio, slashing caregiver workloads by **~70%**.
                </p>
              </div>
            </div>

            {/* CTA Button Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenChat}
                className="flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-350 hover:to-blue-550 text-white font-semibold rounded-xl active:scale-95 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer text-xs sm:text-sm"
              >
                <span>Interview My AI Twin</span>
                <Sparkles className="h-4 w-4 text-cyan-200 animate-pulse" />
              </button>
              
              <a
                href="#projects"
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-250 border border-white/10 hover:border-cyan-500/20 font-medium rounded-xl transition-all text-xs sm:text-sm"
              >
                <span>View Engineering Projects</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>

          </div>

          {/* Interactive Agentic visualization */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-indigo-500/0 to-purple-500/5" />
              
              {/* Header inside mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10">
                <div className="flex items-center space-x-2 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.15)] animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                    System State: Active
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  UT UTC 2026-06-04
                </div>
              </div>

              {/* Node diagram illustration / interactive preview representation */}
              <div className="flex-1 my-6 flex flex-col justify-center items-center relative z-10">
                <div className="relative w-full aspect-video flex items-center justify-center mt-2">
                  {/* Outer connecting lines */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="20%" y1="50%" x2="50%" y2="20%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3" className="animate-[dash_20s_linear_infinite]" />
                    <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="#06b6d4" strokeWidth="1" />
                    <line x1="20%" y1="50%" x2="50%" y2="80%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />
                    <line x1="50%" y1="20%" x2="80%" y2="50%" stroke="#06b6d4" strokeWidth="1.5" />
                    <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#06b6d4" strokeWidth="1.5" />
                    <line x1="50%" y1="80%" x2="80%" y2="50%" stroke="#3b82f6" strokeWidth="1.5" />
                  </svg>

                  {/* Left Node (Input) */}
                  <div className="absolute left-[8%] bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex items-center justify-center shadow-lg hover:border-cyan-400 transition-colors">
                    <Globe className="h-5 w-5 text-slate-300" />
                  </div>

                  {/* Middle Nodes (LangGraph multi-agent) */}
                  <div className="absolute top-[5%] left-[42%] bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center space-y-1 shadow-lg hover:border-cyan-500/30 transition-colors">
                    <Cpu className="h-5 w-5 text-cyan-400" />
                    <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-cyan-400">Memory</span>
                  </div>

                  <div className="absolute top-[38%] left-[42%] bg-cyan-500/10 border border-cyan-500/40 rounded-xl p-2.5 flex flex-col items-center space-y-1 shadow-lg hover:border-cyan-300 transition-colors animate-pulse">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                    <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-cyan-300">CoT Agent</span>
                  </div>

                  <div className="absolute bottom-[5%] left-[42%] bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center space-y-1 shadow-lg hover:border-blue-400 transition-colors">
                    <Code2 className="h-5 w-5 text-blue-450" />
                    <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-blue-400">RAG db</span>
                  </div>

                  {/* Right Node (Workflow response) */}
                  <div className="absolute right-[8%] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl p-2.5 flex items-center justify-center shadow-xl">
                    <Terminal className="h-5 w-5 text-slate-950 font-bold" />
                  </div>
                </div>

                {/* Metrics statistics inside hero card */}
                <span className="text-xs font-mono text-slate-450 text-center px-4 max-w-xs mt-3 leading-relaxed">
                  Active Multi-agent Graph Orchestration utilizing LangGraph & FastAPI backend models
                </span>
              </div>

              {/* Bottom stats layout */}
              <div className="border-t border-white/5 pt-4 grid grid-cols-3 gap-2 relative z-10">
                <div className="text-center">
                  <div className="font-display font-bold text-lg text-white">B.Tech</div>
                  <div className="text-[10px] font-mono text-slate-550">Grad Class'27</div>
                </div>
                <div className="text-center border-x border-white/5">
                  <div className="font-display font-bold text-lg text-cyan-400">5+</div>
                  <div className="text-[10px] font-mono text-slate-550">AI Platforms</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-lg text-cyan-300">75%</div>
                  <div className="text-[10px] font-mono text-slate-550">KIET Score</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
