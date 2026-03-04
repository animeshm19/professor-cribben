import { motion } from "framer-motion";
import { ArrowUpRight, Play, Terminal } from "lucide-react";

export default function Broadcast() {
  return (
    <section id="media" className="relative min-h-screen bg-[#050505] flex items-center justify-center py-32 px-6 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl">
        
        {/* Header */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.4em] uppercase text-zinc-500 flex items-center gap-5"
          >
            <span className="w-10 h-[1px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            Media & Broadcast
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Large Video Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            data-hide-cursor="true"
            className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0a0a0c]"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Play className="text-white fill-white ml-1" size={32} />
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <span className="bg-blue-500 text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Featured Keynote</span>
              <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Deciphering the Neural Architecture</h3>
              <p className="text-zinc-400 font-light">Global Summit on Neuroscience & Analytics, 2025</p>
            </div>
          </motion.div>

          {/* Terminal Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="relative rounded-2xl border border-white/5 bg-[#0a0a0c] p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <Terminal className="text-blue-500" size={20} />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Live Updates</span>
            </div>
            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <p className="text-green-400">$ system_status</p>
              <p> Grant approved: NSERC Discovery</p>
              <p className="mt-2"> Processing fMRI datasets... <span className="text-blue-400 animate-pulse">84%</span></p>
              <p className="mt-2"> New publication accepted in NeuroImage.</p>
              <p className="mt-2 text-blue-500 animate-pulse">_</p>
            </div>
          </motion.div>

          {/* Article Block */}
          <motion.a 
            href="#"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            data-hide-cursor="true"
            className="relative rounded-2xl border border-white/5 bg-gradient-to-br from-[#111115] to-[#050505] p-8 flex flex-col justify-between group cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-500" />
            <div className="flex justify-between items-start relative z-10">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Press</span>
              <ArrowUpRight className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2 leading-snug">Alberta School of Business Spotlight</h3>
              <p className="text-sm text-zinc-400">Read the latest interview on predictive sports analytics.</p>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}