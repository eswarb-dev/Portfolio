import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/ui/Navbar';
import BackgroundBlobs from './components/BackgroundBlobs';
import ParticlesBackground from './components/ParticlesBackground';
import CursorGlow from './CursorGlow';
import Hero from './components/sections/Hero';
import ProjectSection from './components/sections/ProjectSection';
import Capabilities from './components/sections/Capabilities';
import Footer from './components/sections/Footer';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-black text-white selection:bg-accent-blue selection:text-white min-h-screen">
      {/* Custom Cursor / Global Effects can go here */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-blue origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <BackgroundBlobs />
      <ParticlesBackground />
      <CursorGlow />
      
      <main className="relative z-10">
        <Hero />
        <div id="about">
          <Capabilities />
        </div>
        <div id="work">
          <ProjectSection />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
