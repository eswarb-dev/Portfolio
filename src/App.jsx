import React, { useCallback, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import PrivateStatsModal from "./components/ui/PrivateStatsModal";
import Hero from "./components/sections/Hero";
import ProjectSection from "./components/sections/ProjectSection";
import Capabilities from "./components/sections/Capabilities";
import Footer from "./components/sections/Footer";
import { useSecretSequence } from "./hooks/useSecretSequence";
import { useVisitTracking } from "./hooks/useVisitTracking";

function App() {
  const MotionDiv = motion.div;
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const openStats = useCallback(() => setIsStatsOpen(true), []);

  useSecretSequence("eswarstats", openStats);
  useVisitTracking();

  return (
    <div className="site-shell selection:bg-[#b56cff] selection:text-white">
      <MotionDiv
        className="fixed left-0 right-0 top-0 z-[100] h-2 origin-left border-b-4 border-black bg-[#39ff14]"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <Capabilities />
        <ProjectSection />
        <Footer />
      </main>

      <PrivateStatsModal open={isStatsOpen} onClose={() => setIsStatsOpen(false)} />
    </div>
  );
}

export default App;
