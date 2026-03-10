import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 backdrop-blur-md border-b border-white/5 bg-black/20"
    >
      <div className="text-xl font-black tracking-tighter">
        ESWAR B <span className="text-neutral-500 font-light mx-1">|</span> <span className="text-neutral-400 font-medium text-sm">AI ENGINEER</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400">
        <a href="#work" className="hover:text-white transition-colors">Work</a>
        <a href="#about" className="hover:text-white transition-colors">Stack</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <div className="w-10 h-px bg-white/20" />
    </motion.nav>
  );
};

export default Navbar;
