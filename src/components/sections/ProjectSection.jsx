import React from "react";
import { BookOpenCheck, BrainCircuit, BriefcaseBusiness, Cpu } from "lucide-react";
import ProjectCard from "../ui/ProjectCard";
import { SectionHeader } from "../ui/Brutal";
import AgroCircuit from "../ui/AgroCircuit";
import OledGraphic from "../ui/OledGraphic";

const projects = [
  {
    title: "BovineScan",
    description: "Indigenous cattle breed classifier for fast field-ready breed recognition.",
    problem: "Farmers and field teams need a quick way to identify native cattle breeds without manual expert review.",
    result: "66 breeds classified with 94.31% accuracy across Android, web, and TFLite-ready flows.",
    tags: ["YOLOv8", "Android", "Web", "TFLite", "66 breeds"],
    icon: Cpu,
    github: "https://github.com/Eswar-AIDS/Cattle-Breed-Classification.git",
    variant: "secondary",
    previewImages: [
      "/projects/breed-classification/app1.jpeg",
      "/projects/breed-classification/app2.jpeg",
      "/projects/breed-classification/app3.jpeg",
      "/projects/breed-classification/app4.jpeg",
      "/projects/breed-classification/app5.jpeg",
    ],
  },
  {
    title: "Study Mate",
    description: "LLM learning workspace that turns raw notes into revision-ready study blocks.",
    problem: "Students lose time converting long material into summaries, checks, and revision paths.",
    result: "Generated summaries, MCQs, concept graphs, and revision blocks in one adaptive flow.",
    tags: ["LLMs", "React", "FastAPI", "Concept graphs"],
    icon: BookOpenCheck,
    github: "https://github.com/Eswar-AIDS/Study-Mate.git",
    preview: "https://study-mate-yy0u.onrender.com/",
    variant: "white",
    previewImages: [
      "/projects/Study Mate/1.png",
      "/projects/Study Mate/2.png",
      "/projects/Study Mate/3.png",
      "/projects/Study Mate/4.png",
      "/projects/Study Mate/5.png",
      "/projects/Study Mate/6.png",
    ],
  },
  {
    title: "AgroSphere 360",
    description: "ESP32 + AI monitor for storage rot risk and market demand signals.",
    problem: "Agriculture storage decisions need earlier rot detection and clearer demand intelligence.",
    result: "Connected sensor monitoring, AI interpretation, and market-facing insight loops.",
    tags: ["ESP32", "AI", "IoT", "Market insights"],
    icon: BrainCircuit,
    github: "https://github.com/Eswar-AIDS/AgroSphere360.git",
    variant: "white",
    previewGraphics: [AgroCircuit, OledGraphic],
    previewImages: ["/projects/agro360/pic1.jpeg", "/projects/agro360/pic2.jpeg"],
  },
  {
    title: "Hire Wave",
    description: "Campus recruitment platform for placement workflows and candidate discovery.",
    problem: "Campus hiring teams need cleaner student/admin coordination and faster resume review.",
    result: "Student/admin dashboards, AI resume analysis, job discovery, and placement support.",
    tags: ["React", "SQLite", "Gemini AI", "Recruitment"],
    icon: BriefcaseBusiness,
    github: "https://github.com/Eswar-AIDS/Hire-Wave.git",
    variant: "white",
    previewImages: [
      "/projects/Hire Wave/1.png",
      "/projects/Hire Wave/2.png",
      "/projects/Hire Wave/3.png",
      "/projects/Hire Wave/4.png",
      "/projects/Hire Wave/5.png",
      "/projects/Hire Wave/6.png",
      "/projects/Hire Wave/7.png",
      "/projects/Hire Wave/8.png",
      "/projects/Hire Wave/9.png",
    ],
  },
];

const ProjectSection = () => (
  <section id="work" className="neo-section" aria-labelledby="projects-heading">
    <SectionHeader
      id="projects-heading"
      label="Featured Projects"
      title="Builds With Teeth"
      subtitle="A selected set of AI, computer vision, IoT, and product systems designed around real workflows."
      labelVariant="purple"
    />

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.title}
          {...project}
          number={String(index + 1).padStart(2, "0")}
        />
      ))}
    </div>
  </section>
);

export default ProjectSection;
