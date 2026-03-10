import React from 'react';
import { motion } from 'framer-motion';

const OledGraphic = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900/50 p-8 rounded-xl border border-white/5 backdrop-blur-sm">
      <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto drop-shadow-[0_0_20px_rgba(0,242,255,0.1)]">
        {/* Module PCB */}
        <rect x="50" y="50" width="300" height="200" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        
        {/* Mounting Holes */}
        <circle cx="70" cy="70" r="8" fill="#0f172a" stroke="#334155" />
        <circle cx="330" cy="70" r="8" fill="#0f172a" stroke="#334155" />
        <circle cx="70" cy="230" r="8" fill="#0f172a" stroke="#334155" />
        <circle cx="330" cy="230" r="8" fill="#0f172a" stroke="#334155" />

        {/* Header Pins */}
        <g transform="translate(140, 50)">
          {['GND', 'VCC', 'SCL', 'SDA'].map((label, i) => (
            <g key={label} transform={`translate(${i * 40}, 0)`}>
              <circle cx="0" cy="0" r="4" fill="#fbbf24" stroke="#d97706" />
              <text x="0" y="15" textAnchor="middle" fill="#94a3b8" className="text-[8px] font-mono uppercase">{label}</text>
            </g>
          ))}
        </g>

        {/* Screen Bezel */}
        <rect x="80" y="90" width="240" height="130" rx="4" fill="#000000" stroke="#334155" strokeWidth="2" />
        
        {/* Glass Reflection */}
        <path d="M 80 110 L 320 90 L 320 110 L 80 130 Z" fill="white" opacity="0.03" />

        {/* Active Screen Area */}
        <defs>
          <filter id="oled-glow">
            <feGaussianBlur stdDeviation="1.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#oled-glow)">
          {/* Top Bar with Icons */}
          <rect x="90" y="100" width="220" height="20" rx="2" fill="rgba(6, 182, 212, 0.1)" />
          <text x="100" y="114" fill="#06b6d4" className="text-[9px] font-mono font-bold tracking-wider">SYSTEM ACTIVE</text>
          <circle cx="295" cy="110" r="3" fill="#06b6d4" opacity="0.5">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
          </circle>
          
          {/* Main Content */}
          <motion.text 
            x="100" y="150" fill="#00f2ff" className="text-[14px] font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
          >
            TEMP: 28.4 °C
          </motion.text>
          
          <motion.text 
            x="100" y="175" fill="#00f2ff" className="text-[14px] font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2, times: [0, 0.1, 0.9, 1] }}
          >
            HUMID : 62 %
          </motion.text>

          <motion.text 
            x="100" y="200" fill="#00f2ff" className="text-[14px] font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 4, times: [0, 0.1, 0.9, 1] }}
          >
            GAS  : 245 ppm
          </motion.text>

          {/* Simple Animated Graph */}
          <g transform="translate(240, 140)">
            <rect width="60" height="40" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3" />
            <motion.path
              d="M 0 40 L 10 30 L 20 35 L 30 15 L 40 25 L 50 10 L 60 20"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </g>

          <text x="210" y="215" fill="#475569" className="text-[8px] font-mono uppercase tracking-widest">i2c address: 0x3C</text>
        </g>
      </svg>
    </div>
  );
};

export default OledGraphic;
