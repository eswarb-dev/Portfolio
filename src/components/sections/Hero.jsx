import React from "react";
import { motion } from "framer-motion";
import { Github, Code2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-mono mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
          </span>
          AI ENGINEERING STUDENT @ SREC
        </span>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          ESWAR B
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 font-mono max-w-2xl mx-auto mb-10">
          Crafting intelligent systems and minimalist interfaces with a focus on performance and clean architecture.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="https://github.com/Eswar-AIDS"
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-medium transition-colors hover:bg-neutral-200"
          >
            <Github size={18} />
            Browse GitHub
          </motion.a>
          
          <motion.a
            href="#work"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium backdrop-blur-md transition-colors hover:bg-white/10"
          >
            <Code2 size={18} />
            Explore Projects
          </motion.a>
        </div>
      </motion.div>

      {/* Cinematic Floating Element */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block"
      >
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
