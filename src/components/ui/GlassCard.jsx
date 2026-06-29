import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const GlassCard = ({ children, className, delay = 0 }) => {
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20",
        className
      )}
    >
      {children}
    </MotionDiv>
  );
};

export default GlassCard;
