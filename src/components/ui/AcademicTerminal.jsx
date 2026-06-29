import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AcademicTerminal = () => {
  const MotionDiv = motion.div;
  const [lines, setLines] = useState([
    { text: "Initializing academic_core...", type: "system" },
    { text: "Loading neural_assets/eswar_b...", type: "load" }
  ]);

  const [status, setStatus] = useState("SYNCED");

  useEffect(() => {
    const logs = [
      "Optimizing YOLOv8 inference paths...",
      "Connecting to Agro360 IoT mesh...",
      "Analyzing study_mate transformer weights...",
      "Fetching latest GitHub contributions...",
      "Awaiting next-gen architecture...",
      "Compiling reactive components...",
      "Syncing with SREC neural network...",
      "Scanning for performance bottlenecks..."
    ];

    const interval = setInterval(() => {
      const newLine = logs[Math.floor(Math.random() * logs.length)];
      setLines(prev => [...prev.slice(-5), { text: newLine, type: "log" }]);
      
      // Randomly change status for "realism"
      if (Math.random() > 0.8) {
        setStatus(Math.random() > 0.5 ? "OPTIMIZING" : "SCANNING");
        setTimeout(() => setStatus("SYNCED"), 2000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-80 font-mono text-[10px] z-20">
      <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-white/5 px-3 py-2 border-bottom border-white/10 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <span className="text-white/40 uppercase tracking-tighter">System Output</span>
        </div>
        <div className="p-4 space-y-2 min-h-[160px]">
          {lines.map((line, i) => (
            <MotionDiv
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              key={i}
              className={`flex gap-2 ${line.type === 'system' ? 'text-accent-blue' : line.type === 'load' ? 'text-white/40' : 'text-white/70'}`}
            >
              <span className="text-white/20 select-none">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className="break-all">{line.text}</span>
            </MotionDiv>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5 mt-4">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === 'SYNCED' ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-white/40 uppercase tracking-widest text-[8px]">CORE_STATUS: {status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicTerminal;
