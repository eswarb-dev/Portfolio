import React from 'react';
import { motion } from 'framer-motion';

const AgroCircuit = () => {
  const espTopPins = ["VIN", "GND", "D13", "D12", "D14", "D27", "D26", "D25", "D33", "D32", "D35", "D34", "VN", "VP", "EN"];
  const espBottomPins = ["3V3", "GND", "D15", "D2", "D4", "RX2", "TX2", "D5", "D18", "D19", "D21", "RX0", "TX0", "D22", "D23"];
  
  // Pin Coordinates (Relative to SVG)
  const getPinPos = (row, index) => {
    const startX = 212; // Start of ESP32
    const pinSpacing = 26.5;
    const y = row === 'top' ? 100 : 260;
    return { x: startX + index * pinSpacing, y };
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950 p-8 rounded-xl overflow-hidden border border-white/5">
      <svg viewBox="0 0 800 550" className="w-full h-full">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* ESP32 DEV MODULE */}
        <g transform="translate(200, 100)">
          <rect width="400" height="160" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <rect x="10" y="55" width="50" height="50" rx="2" fill="#020617" stroke="#334155" />
          <text x="35" y="85" textAnchor="middle" fill="#334155" className="text-[10px] font-mono font-bold" transform="rotate(-90, 35, 85)">USB-C</text>
          
          <text x="200" y="85" textAnchor="middle" fill="white" className="text-2xl font-black font-mono tracking-widest opacity-20">ESP32-DEV-KIT</text>
          
          {/* Top Pins Labels & Holes */}
          {espTopPins.map((pin, i) => {
            const pos = { x: 12 + i * 26.5, y: 0 };
            return (
              <g key={`top-${i}`}>
                <circle cx={pos.x} cy={pos.y} r="3" fill="#fbbf24" stroke="#d97706" />
                {/* Simplified to just holes, label moved to top layer */}
              </g>
            );
          })}

          {/* Bottom Pins Labels & Holes */}
          {espBottomPins.map((pin, i) => {
            const pos = { x: 12 + i * 26.5, y: 160 };
            return (
              <g key={`bottom-${i}`}>
                <circle cx={pos.x} cy={pos.y} r="3" fill="#fbbf24" stroke="#d97706" />
                {/* Simplified to just holes, label moved to top layer */}
              </g>
            );
          })}
        </g>

        {/* ALIGNED SENSORS (y=420) */}
        
        {/* DHT22 */}
        <g transform="translate(100, 420)">
          <rect width="100" height="80" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="25" y="10" width="50" height="30" fill="#e2e8f0" rx="1" />
          <text x="50" y="65" textAnchor="middle" fill="#475569" className="text-[10px] font-bold font-mono">DHT22</text>
          <g className="pins">
            <circle cx="20" cy="0" r="2" fill="#94a3b8" />
            <circle cx="40" cy="0" r="2" fill="#94a3b8" />
            <circle cx="60" cy="0" r="2" fill="#94a3b8" />
            <circle cx="80" cy="0" r="2" fill="#94a3b8" />
          </g>
        </g>

        {/* MQ-136 GAS SENSOR */}
        <g transform="translate(350, 420)">
          <rect width="100" height="80" rx="4" fill="#1e3a8a" stroke="#1d4ed8" strokeWidth="2" />
          <circle cx="50" cy="30" r="25" fill="#3b82f6" fillOpacity="0.2" stroke="#60a5fa" strokeWidth="1" />
          <text x="50" y="70" textAnchor="middle" fill="white" className="text-[10px] font-bold font-mono">MQ-136 GAS</text>
          <g className="pins">
            <circle cx="20" cy="0" r="2" fill="#fbbf24" />
            <circle cx="40" cy="0" r="2" fill="#fbbf24" />
            <circle cx="60" cy="0" r="2" fill="#fbbf24" />
            <circle cx="80" cy="0" r="2" fill="#fbbf24" />
          </g>
        </g>

        {/* OLED DISPLAY */}
        <g transform="translate(600, 410)">
          <rect width="120" height="100" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <rect x="10" y="15" width="100" height="70" rx="2" fill="#000" stroke="#334155" />
          <text x="60" y="55" textAnchor="middle" fill="#00f2ff" className="text-[10px] font-mono" filter="url(#glow)">TEMP: 26.8°C</text>
          <text x="60" y="93" textAnchor="middle" fill="#475569" className="text-[7px] font-mono uppercase tracking-tighter">SSD1306 OLED</text>
          <g className="pins">
            <circle cx="30" cy="0" r="2" fill="#fbbf24" />
            <circle cx="50" cy="0" r="2" fill="#fbbf24" />
            <circle cx="70" cy="0" r="2" fill="#fbbf24" />
            <circle cx="90" cy="0" r="2" fill="#fbbf24" />
          </g>
        </g>

        {/* WIRING (Precision Mapped) */}
        <g fill="none" strokeWidth="2" filter="url(#glow)">
          {/* --- SIGNAL PATHS --- */}
          
          {/* DHT22 OUT -> D27 */}
          <motion.path 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 2, repeat: Infinity }}
            d={`M 140 420 V 350 H ${getPinPos('top', 5).x} V 100`} 
            stroke="#ef4444" 
          />
          
          {/* MQ-136 AOUT -> D34 */}
          <motion.path 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            d={`M 430 420 V 320 H ${getPinPos('top', 11).x} V 100`} 
            stroke="#10b981" 
          />

          {/* OLED I2C (SDA -> D21, SCL -> D22) */}
          <motion.path 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            d={`M 690 410 V 380 H ${getPinPos('bottom', 10).x} V 260`} 
            stroke="#6366f1" 
          />
          <motion.path 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
            d={`M 670 410 V 360 H ${getPinPos('bottom', 13).x} V 260`} 
            stroke="#a855f7" 
          />

          {/* --- POWER PATHS (Simplified for clarity) --- */}
          
          {/* VCC 3.3V Connections */}
          <path d={`M 120 420 V 300 H ${getPinPos('bottom', 0).x - 10} V 260`} stroke="#dc2626" opacity="0.3" strokeDasharray="4 2" />
          <path d={`M 630 410 V 300 H ${getPinPos('bottom', 0).x} V 260`} stroke="#dc2626" opacity="0.3" strokeDasharray="4 2" />
          
          {/* GND Connections */}
          <path d={`M 180 420 V 340 H ${getPinPos('top', 1).x} V 100`} stroke="#94a3b8" opacity="0.3" strokeDasharray="4 2" />
          <path d={`M 390 420 V 340 H ${getPinPos('top', 1).x} V 100`} stroke="#94a3b8" opacity="0.3" strokeDasharray="4 2" />
          <path d={`M 650 410 V 340 H ${getPinPos('top', 1).x} V 100`} stroke="#94a3b8" opacity="0.3" strokeDasharray="4 2" />
        </g>

        {/* PIN LABELS RENDERED LAST (Above Wiring) */}
        <g className="pin-infos">
          {/* ESP32 Top Pin Labels */}
          <g transform="translate(200, 100)">
            {espTopPins.map((pin, i) => {
              const pos = { x: 12 + i * 26.5, y: 0 };
              return (
                <text key={`label-top-${i}`} x={pos.x} y={pos.y + 15} textAnchor="middle" fill="#fbbf24" className="text-[7px] font-bold font-mono pointer-events-none" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>
                  {pin}
                </text>
              );
            })}
          </g>
          
          {/* ESP32 Bottom Pin Labels */}
          <g transform="translate(200, 100)">
            {espBottomPins.map((pin, i) => {
              const pos = { x: 12 + i * 26.5, y: 160 };
              return (
                <text key={`label-bottom-${i}`} x={pos.x} y={pos.y - 10} textAnchor="middle" fill="#fbbf24" className="text-[7px] font-bold font-mono pointer-events-none" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>
                  {pin}
                </text>
              );
            })}
          </g>

          {/* Sensor Pin Labels */}
          {/* DHT22 */}
          <g transform="translate(100, 420)">
            <text x="20" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>VCC</text>
            <text x="40" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>OUT</text>
            <text x="60" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-neutral-500" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>NC</text>
            <text x="80" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>GND</text>
          </g>
          {/* MQ-136 */}
          <g transform="translate(350, 420)">
            <text x="20" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>VCC</text>
            <text x="40" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>GND</text>
            <text x="60" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>DOUT</text>
            <text x="80" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>AOUT</text>
          </g>
          {/* OLED */}
          <g transform="translate(600, 410)">
            <text x="30" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>VCC</text>
            <text x="50" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>GND</text>
            <text x="70" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>SCL</text>
            <text x="90" y="-8" textAnchor="middle" className="text-[7px] font-bold font-mono fill-accent-blue" style={{ textShadow: '0 0 4px rgba(0,0,0,0.8)' }}>SDA</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default AgroCircuit;
