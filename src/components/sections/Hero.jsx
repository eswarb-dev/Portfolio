import React from "react";
import { motion } from "framer-motion";
import { FileText, Github, Mail, Sparkles, Zap } from "lucide-react";
import { Badge, BrutalButton, BrutalCard } from "../ui/Brutal";
import ResumeRequestModal from "../ui/ResumeRequestModal";

const heroBadges = ["YOLOv8", "LLM Apps", "React", "FastAPI", "Kotlin", "ESP32"];

const Hero = () => {
  const MotionSection = motion.section;
  const MotionDiv = motion.div;
  const [showResume, setShowResume] = React.useState(false);

  return (
    <>
      <MotionSection
        id="hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="hero-section neo-section flex min-h-screen items-center pt-28 sm:pt-32"
      >
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
              <Badge variant="secondary">AI Engineer</Badge>
              <Badge variant="purple">Full-Stack Builder</Badge>
              <Badge variant="primary">Computer Vision</Badge>
            </div>

            <h1 className="hero-title max-w-4xl font-black uppercase tracking-normal">
              ESWAR B
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-black uppercase leading-tight text-[#5c25b8] sm:text-2xl md:text-3xl">
              AI Engineer / Full-Stack Builder
            </p>
            <p className="mt-5 max-w-3xl text-base font-bold leading-7 text-[#222] sm:text-lg md:text-xl md:leading-8">
              I build AI-powered systems, computer vision apps, automation dashboards, and full-stack products that solve real problems.
            </p>

            <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
              {heroBadges.map((badge, index) => (
                <Badge
                  key={badge}
                  variant={["secondary", "primary", "purple", "white", "blue", "pink"][index]}
                  className="sticker-tilt"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <BrutalButton href="#work" variant="secondary" icon={Zap}>
                View Projects
              </BrutalButton>
              <BrutalButton
                href="https://github.com/eswarb-dev"
                target="_blank"
                rel="noopener noreferrer"
                variant="white"
                icon={Github}
              >
                GitHub
              </BrutalButton>
              <BrutalButton
                as="button"
                type="button"
                onClick={() => setShowResume(true)}
                variant="purple"
                icon={FileText}
              >
                Request Resume
              </BrutalButton>
              <BrutalButton
                href="https://mail.google.com/mail/?view=cm&fs=1&to=eswarbalu28@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                icon={Mail}
              >
                Contact
              </BrutalButton>
            </div>
          </div>

          <MotionDiv
            className="hero-feature-wrap"
            animate={{ rotate: [-0.4, 0.4, -0.4], y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <BrutalCard variant="primary" label="Live Build Preview" labelVariant="pink" className="hero-feature-card relative overflow-hidden p-4 md:p-6">
              <div className="absolute -right-4 top-14 h-20 w-20 rotate-12 border-[3px] border-black bg-[#39ff14] shadow-[4px_4px_0_#050505] sm:-right-6 sm:h-24 sm:w-24" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <Sparkles size={34} strokeWidth={3} aria-hidden="true" />
                  <span className="rounded-full border-[3px] border-black bg-white px-3 py-1.5 text-[11px] font-black uppercase shadow-[2px_2px_0_#050505]">
                    94.31% CV
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border-[3px] border-black bg-white p-4 shadow-[4px_4px_0_#050505] lg:rotate-[-0.5deg]">
                  <p className="text-xs font-black uppercase text-[#5c25b8]">Featured System</p>
                  <p className="mt-2 text-3xl font-black uppercase leading-none sm:text-4xl">
                    BovineScan
                  </p>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#222] sm:text-base">
                    YOLOv8 cattle breed classifier packed into Android and web flows with TFLite-ready inference.
                  </p>
                </div>

                <div className="ml-auto mt-4 grid max-w-sm grid-cols-2 gap-2 text-xs font-black uppercase sm:text-sm lg:rotate-[0.5deg]">
                  {["66 breeds", "TFLite", "Android", "Dashboards"].map((item) => (
                    <span key={item} className="rounded-lg border-[2px] border-black bg-[#b56cff] p-2.5 text-white shadow-[2px_2px_0_#050505]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </BrutalCard>
          </MotionDiv>
        </div>
      </MotionSection>

      <ResumeRequestModal open={showResume} onClose={() => setShowResume(false)} />
    </>
  );
};

export default Hero;
