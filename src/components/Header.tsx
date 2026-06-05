import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Smartphone, Code2, Sparkles, Terminal } from "lucide-react";
import { resumeData } from "../data/resumeData";

interface HeaderProps {
  onOpenChat: () => void;
}

export default function Header({ onOpenChat }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { personalInfo } = resumeData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 py-3 shadow-lg shadow-slate-950/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center space-x-2.5 group">
          <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-xl border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-300">
            <Terminal className="h-5 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-wide text-white group-hover:text-cyan-300 transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mt-0.5">
              AI / ML Engineer
            </span>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Experience", href: "#experience" },
            { label: "Skills", href: "#skills" },
            { label: "Credentials", href: "#credentials" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-900/50 transition-all focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions Menu */}
        <div className="flex items-center space-x-2">
          {/* Social Anchors in Navbar */}
          <div className="hidden sm:flex items-center space-x-1.5 mr-2">
            <a
              href={personalInfo.github}
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-cyan-400 p-1.5 rounded-lg hover:bg-slate-950 transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-slate-400 hover:text-cyan-400 p-1.5 rounded-lg hover:bg-slate-950 transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-slate-400 hover:text-cyan-400 p-1.5 rounded-lg hover:bg-slate-950 transition-colors"
              title="Email Address"
              aria-label="Email Address"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>

          <button
            id="chat-trigger-btn"
            onClick={onOpenChat}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-cyan-500/30 text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/20 active:scale-95 transition-all shadow-lg shadow-cyan-500/5 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>Chat AI Twin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
