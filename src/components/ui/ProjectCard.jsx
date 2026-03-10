import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code2, X, ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "./GlassCard";

const ProjectCard = ({ title, description, tags, icon: Icon = Code2, delay, github = "#", preview, previewImages = [], number, CustomGraphic }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const graphics = CustomGraphic ? (Array.isArray(CustomGraphic) ? CustomGraphic : [CustomGraphic]) : [];
  const totalItems = previewImages.length + graphics.length;

  useEffect(() => {
    const handleWheelRaw = (e) => {
      if (showPreview && modalRef.current) {
        e.preventDefault();
        
        // Calculate mouse position relative to modal for zoom origin
        const rect = modalRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        const delta = e.deltaY * -0.001;
        
        setScale(prevScale => {
          const nextScale = Math.min(Math.max(1, prevScale + delta), 4);
          
          if (nextScale === 1) {
            setPosition({ x: 0, y: 0 });
          } else if (nextScale > prevScale) {
            // Adjust position to zoom towards cursor
            const ratio = (nextScale - prevScale) / prevScale;
            setPosition(prevPos => ({
              x: prevPos.x - mouseX * ratio,
              y: prevPos.y - mouseY * ratio
            }));
          }
          
          return nextScale;
        });
      }
    };

    const currentModal = modalRef.current;
    if (showPreview && currentModal) {
      currentModal.addEventListener('wheel', handleWheelRaw, { passive: false });
    }

    return () => {
      if (currentModal) {
        currentModal.removeEventListener('wheel', handleWheelRaw);
      }
    };
  }, [showPreview]);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % totalItems);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  
  const handleDrag = (event, info) => {
    setPosition({ x: info.point.x, y: info.point.y });
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{ 
          opacity: { duration: 0.8, delay },
          x: { duration: 0.8, delay },
          y: {
            duration: 4 + Math.random() * 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 2
          }
        }}
      >
        <GlassCard delay={delay} className="group h-full flex flex-col relative overflow-hidden">
          <div className="absolute top-8 right-8 text-white/5 text-5xl font-black italic group-hover:text-accent-indigo/10 transition-colors pointer-events-none select-none z-0">
            {number}
          </div>
          <div className="mb-4 inline-flex p-3 rounded-lg bg-white/5 text-accent-indigo group-hover:bg-accent-indigo group-hover:text-white transition-colors relative z-10 w-fit">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-indigo transition-colors relative z-10">{title}</h3>
          <p className="text-neutral-400 text-sm mb-6 flex-grow leading-relaxed relative z-10">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6 relative z-10">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-mono text-neutral-500">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity relative z-10">
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-mono text-white hover:text-accent-blue flex items-center gap-1"
            >
              <Github size={14} /> SOURCE
            </a>
            {preview && (
              <a 
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white hover:text-accent-blue flex items-center gap-1"
              >
                <ExternalLink size={14} /> LIVE
              </a>
            )}
            {totalItems > 0 ? (
              <button 
                onClick={() => setShowPreview(true)}
                className="text-xs font-mono text-white hover:text-accent-blue flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
              >
                <ExternalLink size={14} /> PREVIEW
              </button>
            ) : (
              <a href="#" className="text-xs font-mono text-white hover:text-accent-blue flex items-center gap-1">
                <ExternalLink size={14} /> PREVIEW
              </a>
            )}
          </div>
        </GlassCard>
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video bg-neutral-900/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => {
                  setShowPreview(false);
                  setScale(1);
                }}
                className="absolute top-4 right-4 z-[11] p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>

              <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden cursor-zoom-in">
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-mono text-white/70 tracking-widest uppercase">
                    {currentImageIndex < graphics.length 
                      ? (graphics.length > 1 && currentImageIndex === 1 ? 'OLED INTERFACE' : 'SYSTEM ARCHITECTURE')
                      : `IMAGE ${currentImageIndex - graphics.length + 1} OF ${previewImages.length}`}
                  </div>
                  {scale > 1 && (
                    <div className="px-3 py-1 bg-accent-indigo/60 backdrop-blur-md rounded-full border border-accent-indigo/30 text-[10px] font-mono text-white tracking-widest uppercase text-center">
                      {Math.round(scale * 100)}% ZOOM
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-6 right-6 z-10 hidden md:block">
                  <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                    Scroll to Zoom {scale > 1 && "• Drag to Pan"}
                  </p>
                </div>
                
                <motion.div 
                  className={`w-full h-full flex items-center justify-center pointer-events-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  animate={{ 
                    scale,
                    x: scale === 1 ? 0 : position.x,
                    y: scale === 1 ? 0 : position.y
                  }}
                  drag={scale > 1}
                  onDrag={(e, info) => setPosition({ x: info.offset.x, y: info.offset.y })}
                  dragConstraints={{ 
                    left: -400 * (scale - 1), 
                    right: 400 * (scale - 1), 
                    top: -400 * (scale - 1), 
                    bottom: 400 * (scale - 1) 
                  }}
                  dragMomentum={false}
                  dragElastic={0.1}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {currentImageIndex < graphics.length ? (
                    <div className="w-full h-full pointer-events-auto">
                      {React.createElement(graphics[currentImageIndex])}
                    </div>
                  ) : (
                    <img 
                      src={previewImages[currentImageIndex - graphics.length]} 
                      alt={`${title} preview`}
                      className="max-w-full max-h-full object-contain shadow-2xl rounded-lg pointer-events-auto"
                    />
                  )}
                </motion.div>

                {totalItems > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {[...Array(totalItems)].map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-accent-indigo' : 'bg-white/20'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
