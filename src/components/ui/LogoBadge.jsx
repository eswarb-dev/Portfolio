import React from "react";
import { motion } from "framer-motion";

const LogoBadge = ({ initials, size = 100, className = "" }) => {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Orbs/Glows */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[60%] h-[60%] rounded-full bg-accent-purple/20 blur-xl top-0 right-0"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute w-[50%] h-[50%] rounded-full bg-accent-blue/20 blur-xl bottom-0 left-0"
      />

      {/* Multiple Concentric Rings */}
      {[0.9, 0.82, 0.74].map((scale, i) => (
        <svg
          key={i}
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={48 * scale}
            fill="none"
            stroke="white"
            strokeWidth="0.25"
          />
        </svg>
      ))}

      {/* Main Container SVG for precise shapes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0C3FC" />
            <stop offset="100%" stopColor="#8EC5FC" />
          </linearGradient>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        {/* Central Hexagon */}
        <motion.polygon
          points="50,20 84.6,35 84.6,65 50,80 15.4,65 15.4,35"
          fill="url(#hexGradient)"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />

        {/* Technical Accents (Magnifying Glass & Bracket) */}
        <g className="text-white/40" stroke="currentColor" strokeWidth="1" fill="none">
          {/* Magnifying Glass */}
          <circle cx="78" cy="38" r="3" />
          <line x1="80" y1="40" x2="83" y2="43" />
          
          {/* Bracket */}
          <path d="M 80,55 L 85,60 L 80,65" />
        </g>
      </svg>

      {/* The Initials with Gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10"
      >
        <span 
          className="font-black tracking-tighter"
          style={{ 
            fontSize: size * 0.3,
            background: 'linear-gradient(to bottom, #E0C3FC, #8EC5FC)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block'
          }}
        >
          {initials}
        </span>
      </motion.div>
    </div>
  );
};

export default LogoBadge;
