import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ExternalLink, Github, X } from "lucide-react";
import { Badge, BrutalButton, BrutalCard } from "./Brutal";

const tagColors = ["green", "yellow", "purple", "pink", "white"];

const ProjectCard = ({
  title,
  description,
  problem,
  result,
  tags,
  icon: Icon,
  github,
  preview,
  previewImages = [],
  previewGraphics = [],
  number,
  accent = "white",
  variant,
}) => {
  const MotionArticle = motion.article;
  const MotionDiv = motion.div;
  const [showPreview, setShowPreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const previewItems = [
    ...previewGraphics.map((Graphic, index) => ({
      type: "graphic",
      key: `graphic-${index}`,
      Graphic,
      label: index === 0 ? "System Architecture" : "OLED Interface",
    })),
    ...previewImages.map((src, index) => ({
      type: "image",
      key: `image-${index}`,
      src,
      label: `Image ${index + 1}`,
    })),
  ];
  const hasPreviewItems = previewItems.length > 0;
  const currentPreview = previewItems[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((index) => (index + 1) % previewItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((index) => (index - 1 + previewItems.length) % previewItems.length);
  };

  return (
    <>
      <MotionArticle
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="h-full"
      >
        <BrutalCard
          variant={variant || accent}
          label={`Project ${number}`}
          labelVariant="dark"
          className="group flex h-full min-w-0 flex-col p-4 transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505] focus-within:translate-x-0.5 focus-within:translate-y-0.5 focus-within:shadow-[2px_2px_0_#050505] sm:p-5"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="rounded-xl border-[3px] border-black bg-white p-2.5 shadow-[3px_3px_0_#050505]">
              {Icon ? <Icon aria-hidden="true" size={24} strokeWidth={3} /> : null}
            </div>
            <span className="rounded-full border-[3px] border-black bg-white px-2.5 py-1.5 text-xs font-black text-black">
              {number}
            </span>
          </div>

          <h3 className="text-2xl font-black uppercase leading-none">{title}</h3>
          <p className="mt-3 text-sm font-black uppercase leading-6 text-[#252525]">{description}</p>

          <div className="mt-4 grid gap-2.5">
            <div className="rounded-xl border-[2px] border-black bg-white p-3 shadow-[2px_2px_0_#050505]">
              <p className="text-[11px] font-black uppercase text-[#5c25b8]">Problem Solved</p>
              <p className="mt-1.5 text-sm font-bold leading-6 text-[#252525]">{problem}</p>
            </div>
            <div className="rounded-xl border-[2px] border-black bg-[#d9ffd1] p-3 shadow-[2px_2px_0_#050505]">
              <p className="text-[11px] font-black uppercase">Result / Proof</p>
              <p className="mt-1.5 text-sm font-black leading-6 text-[#111]">{result}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" aria-label={`${title} technology stack`}>
            {tags.map((tag, index) => (
              <Badge key={tag} variant={tagColors[index % tagColors.length]}>
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-auto grid gap-2.5 pt-6 sm:grid-cols-2">
            {github ? (
              <BrutalButton href={github} target="_blank" rel="noopener noreferrer" variant="dark" icon={Github}>
                GitHub
              </BrutalButton>
            ) : null}
            {preview ? (
              <BrutalButton href={preview} target="_blank" rel="noopener noreferrer" variant="white" icon={ExternalLink}>
                Live Demo
              </BrutalButton>
            ) : null}
            {hasPreviewItems ? (
              <BrutalButton as="button" type="button" onClick={() => setShowPreview(true)} variant="primary" icon={BookOpen}>
                Case Study
              </BrutalButton>
            ) : null}
          </div>
        </BrutalCard>
      </MotionArticle>

      <AnimatePresence>
        {showPreview ? (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4"
            onClick={() => setShowPreview(false)}
          >
            <MotionDiv
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              className="relative w-full max-w-5xl rounded-2xl border-4 border-black bg-white p-3 shadow-[6px_6px_0_#39ff14] sm:p-4 md:shadow-[9px_9px_0_#39ff14]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-black uppercase md:text-lg">{title} Preview</p>
                <button
                  type="button"
                  aria-label="Close project preview"
                  onClick={() => setShowPreview(false)}
                  className="rounded-xl border-4 border-black bg-[#ff5aa5] p-2 shadow-[3px_3px_0_#050505]"
                >
                  <X aria-hidden="true" size={20} strokeWidth={3} />
                </button>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-xl border-4 border-black bg-[#fffaf0]">
                {currentPreview?.type === "graphic" ? (
                  <div className="h-full w-full">
                    {React.createElement(currentPreview.Graphic)}
                  </div>
                ) : (
                  <img
                    src={currentPreview?.src}
                    alt={`${title} ${currentPreview?.label || "preview"}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                )}
              </div>

              {previewItems.length > 1 ? (
                <div className="mt-4 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
                  <BrutalButton as="button" type="button" onClick={prevImage} variant="white" icon={null}>
                    Previous
                  </BrutalButton>
                  <span className="text-center text-sm font-black uppercase">
                    {currentImageIndex + 1} / {previewItems.length}
                  </span>
                  <BrutalButton as="button" type="button" onClick={nextImage} variant="secondary" icon={null}>
                    Next
                  </BrutalButton>
                </div>
              ) : null}
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
