import React, { useRef, useEffect } from "react";
import { Cpu, Terminal, Briefcase, Brain } from "lucide-react";
import ProjectCard from "../ui/ProjectCard";
import AgroCircuit from "../ui/AgroCircuit";
import OledGraphic from "../ui/OledGraphic";

const projects = [
  {
    title: "Cattle Breed & Muzzle Biometry",
    description: "AI system using YOLOv8 to classify cattle breeds and identify individual livestock via Muzzle Biometrics. Built a native Android application with Kotlin and ONNX for real-time inference.",
    tags: ["YOLOv8", "Kotlin", "ONNX", "Biometrics"],
    icon: Cpu,
    github: "https://github.com/Eswar-AIDS/Cattle-Breed-Classification.git",
    previewImages: [
      "/projects/breed-classification/app1.jpeg",
      "/projects/breed-classification/app2.jpeg",
      "/projects/breed-classification/app3.jpeg",
      "/projects/breed-classification/app4.jpeg",
      "/projects/breed-classification/app5.jpeg"
    ]
  },
  {
    title: "AgroSphere360",
    description: "Real-time environmental monitoring system built with ESP32 and MicroPython. Collects temperature, humidity, and atmospheric gas data displayed live on an OLED screen for smart agriculture.",
    tags: ["ESP32", "MicroPython", "IoT", "Sensors"],
    icon: Terminal,
    github: "https://github.com/Eswar-AIDS/AgroSphere360.git",
    CustomGraphic: [AgroCircuit, OledGraphic],
    previewImages: [
      "/projects/agro360/pic1.jpeg",
      "/projects/agro360/pic2.jpeg"
    ]
  },
  {
    title: "Study Mate - AI Adaptive Learning",
    description: "AI-powered platform that transforms long notes into intelligent study materials. Uses LLMs to generate summaries, MCQs, and concept graphs for optimized exam preparation.",
    tags: ["React", "FastAPI", "Groq", "LangChain"],
    icon: Brain,
    github: "https://github.com/Eswar-AIDS/Study-Mate.git",
    preview: "https://study-mate-yy0u.onrender.com/",
    previewImages: [
      "/projects/Study Mate/1.png",
      "/projects/Study Mate/2.png",
      "/projects/Study Mate/3.png",
      "/projects/Study Mate/4.png",
      "/projects/Study Mate/5.png",
      "/projects/Study Mate/6.png"
    ]
  },
  {
    title: "HireWave - Campus Recruitment Platform",
    description: "Digital recruitment platform with dashboards for students and admins. Features AI-powered resume analysis and job discovery via Adzuna API for campus placements.",
    tags: ["React", "SQLite", "Gemini AI"],
    icon: Briefcase,
    github: "https://github.com/Eswar-AIDS/Hire-Wave.git",
    previewImages: [
      "/projects/Hire Wave/1.png",
      "/projects/Hire Wave/2.png",
      "/projects/Hire Wave/3.png",
      "/projects/Hire Wave/4.png",
      "/projects/Hire Wave/5.png",
      "/projects/Hire Wave/6.png",
      "/projects/Hire Wave/7.png",
      "/projects/Hire Wave/8.png",
      "/projects/Hire Wave/9.png"
    ]
  }
];

const ProjectSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // If the scroll is vertical, we scroll horizontally instead
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">PROJECTS DONE</h2>
          <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">// Selected Technical Works</p>
        </div>
        <div className="h-px flex-grow bg-white/10 hidden md:block mx-8 mb-4" />
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory px-4 md:px-0 -mx-4 md:mx-0 transition-all cursor-grab active:cursor-grabbing scroll-smooth"
      >
        {projects.map((project, index) => (
          <div key={project.title} className="flex-none w-[320px] md:w-[400px] snap-start first:ml-4 md:first:ml-0">
            <ProjectCard
              {...project}
              number={String(index + 1).padStart(2, '0')}
              delay={index * 0.1}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
