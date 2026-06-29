import React from "react";
import { motion } from "framer-motion";
import { Award, Blocks, Code2, Cpu, Database, Eye, ServerCog, Workflow } from "lucide-react";
import { Badge, BrutalCard, SectionHeader } from "../ui/Brutal";

const skillGroups = [
  {
    title: "AI + Vision",
    icon: Eye,
    variant: "white",
    skills: ["YOLOv8", "TFLite", "Computer Vision", "LLM Apps", "Prompt Engineering"],
  },
  {
    title: "Full Stack",
    icon: Code2,
    variant: "white",
    skills: ["React", "FastAPI", "Dashboards", "REST APIs", "Responsive UI"],
  },
  {
    title: "Systems",
    icon: Cpu,
    variant: "white",
    skills: ["ESP32", "IoT Sensors", "Android", "Automation", "Data Pipelines"],
  },
  {
    title: "Product Thinking",
    icon: Workflow,
    variant: "white",
    skills: ["Workflow Design", "QA Metrics", "User Flows", "Documentation", "Shipping"],
  },
];

const achievements = [
  {
    title: "BovineScan performance",
    detail: "Reached 94.31% accuracy across 66 indigenous cattle breeds.",
    icon: Award,
  },
  {
    title: "Multi-platform builds",
    detail: "Built across Android, web, LLM backends, IoT boards, and dashboard interfaces.",
    icon: Blocks,
  },
  {
    title: "Automation mindset",
    detail: "Designed customs, study, agriculture, and recruitment systems around repeated real-world work.",
    icon: ServerCog,
  },
  {
    title: "Data-backed interfaces",
    detail: "Turned model output, sensor readings, and workflow QA into clear product screens.",
    icon: Database,
  },
];

const Capabilities = () => {
  const MotionDiv = motion.div;

  return (
    <>
      <section id="skills" className="neo-section" aria-labelledby="skills-heading">
        <SectionHeader
          id="skills-heading"
          label="Skills"
          title="Sharp Tools, Loud Labels"
          subtitle="Sticker-style stack badges grouped by how I build: models, apps, devices, and product workflows."
          labelVariant="secondary"
        />

        <div className="grid gap-5 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <MotionDiv
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <BrutalCard variant={group.variant} label={group.title} labelVariant="secondary" className="h-full p-4">
                <group.icon aria-hidden="true" size={28} strokeWidth={3} />
                <h3 className="mt-4 text-xl font-black uppercase leading-none">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skill}
                      variant={skillIndex % 2 === 0 ? "white" : "primary"}
                      className="sticker-tilt"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </BrutalCard>
            </MotionDiv>
          ))}
        </div>
      </section>

      <section id="achievements" className="neo-section pt-0" aria-labelledby="achievements-heading">
        <SectionHeader
          id="achievements-heading"
          label="Achievements"
          title="Proof I Can Ship"
          subtitle="Compact wins that show the range: model accuracy, product interfaces, edge systems, and operational thinking."
          labelVariant="primary"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {achievements.map((achievement) => (
            <BrutalCard key={achievement.title} variant="white" label="Win" labelVariant="blue" className="flex gap-4 p-4">
              <div className="h-fit rounded-xl border-[3px] border-black bg-[#b56cff] p-2.5 text-white shadow-[3px_3px_0_#050505]">
                <achievement.icon aria-hidden="true" size={22} strokeWidth={3} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase">{achievement.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-[#2b2b2b]">{achievement.detail}</p>
              </div>
            </BrutalCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default Capabilities;
