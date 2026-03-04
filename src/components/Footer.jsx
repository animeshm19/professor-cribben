import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin, Mail, ArrowUp } from "lucide-react";
import { siteConfig } from "../data/config";

export default function Footer() {
  // Live Edmonton Time Clock
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const edmontonTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Edmonton',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(new Date());
      setTime(edmontonTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] pt-24 overflow-hidden border-t border-white/5 flex flex-col justify-between">
      
      {/* 1. BACKGROUND ARCHITECTURAL GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row justify-between gap-16 mb-20 mt-8">
        
        {/* LEFT COLUMN: Mission & Contact */}
        <div className="flex flex-col gap-8 max-w-md">
          <div>
            <p className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase mb-4">
              {siteConfig.professor.title}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Bridging the gap between <span className="text-zinc-600">statistical learning</span> and <span className="text-zinc-600">neuroscience.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            <a 
              href={`mailto:${siteConfig.professor.email}`} 
              data-hide-cursor="true" 
              className="group flex items-center gap-4 text-zinc-400 hover:text-white transition-colors cursor-pointer w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300">
                <Mail size={16} className="group-hover:text-blue-400" />
              </div>
              <span className="font-mono text-sm">{siteConfig.professor.email}</span>
            </a>
            
            <div className="flex items-start gap-4 text-zinc-400">
              <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <span className="font-mono text-sm leading-relaxed max-w-[250px] pt-2">
                {siteConfig.professor.office}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Navigation & Academic Links */}
        <div className="flex gap-16 md:gap-24 pt-2">
          
          {/* Sitemap */}
          <div className="flex flex-col gap-5">
            <p className="text-white font-semibold mb-2">Sitemap</p>
            {siteConfig.navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                data-hide-cursor="true" 
                className="text-zinc-500 hover:text-blue-400 text-sm transition-colors cursor-pointer w-fit"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Academic Profiles */}
          <div className="flex flex-col gap-5">
            <p className="text-white font-semibold mb-2">Profiles</p>
            {['Google Scholar', 'ResearchGate', 'LinkedIn', 'UAlberta Directory'].map((link) => (
              <a 
                key={link} 
                href="https://scholar.google.ca/citations?user=57549j8AAAAJ&hl=en" 
                data-hide-cursor="true" 
                className="group flex items-center gap-1 text-zinc-500 hover:text-blue-400 text-sm transition-colors cursor-pointer w-fit"
              >
                {link} 
                <ArrowUpRight 
                  size={14} 
                  className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MASSIVE WATERMARK TYPOGRAPHY */}
      <div className="relative w-full overflow-hidden flex justify-center items-center pointer-events-none select-none z-0 -mb-4 md:-mb-8 lg:-mb-12">
        <h1 
          className="text-[14vw] font-black text-[#ffffff06] whitespace-nowrap leading-none tracking-tighter" 
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          IVOR CRIBBEN
        </h1>
      </div>

      {/* 4. THE STATUS BAR (Time, Copyright, Top-Scroll) */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#050505] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.professor.name}. All Rights Reserved.
          </p>
          
          {/* Live Edmonton Clock */}
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span>Edmonton, AB • {time}</span>
          </div>

          <button 
            onClick={scrollToTop}
            data-hide-cursor="true"
            className="group flex items-center gap-3 hover:text-white transition-colors cursor-pointer"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all duration-300">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}