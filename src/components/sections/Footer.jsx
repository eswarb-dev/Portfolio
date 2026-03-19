import React from "react";
import { Github, Linkedin, Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import GlassCard from "../ui/GlassCard";

const Footer = () => {
  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/eswar-b-491b12328", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/Eswar-AIDS", icon: Github },
    { name: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=eswarbalu28@gmail.com", icon: Mail },
  ];

  return (
    <footer className="py-24 px-6 max-w-7xl mx-auto">
      <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-12 p-12 bg-white/[0.02]">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black mb-4 tracking-tighter">READY TO SYNERGIZE?</h2>
          <p className="text-neutral-400 font-mono text-sm max-w-md">
            Currently seeking internship opportunities in AI research and software engineering. Reach out for a chat.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto">
          <a
            href="https://wa.me/918925252192"
            className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-white text-black font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={20} />
            SAY HELLO
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <div className="flex justify-center md:justify-start gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                className="p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-neutral-400 hover:text-white"
                aria-label={link.name}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </GlassCard>
      
      <div className="mt-24 text-center">
        <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.4em]">
          &copy; 2026 ESWAR B • ENGINEERED FOR EXCELLENCE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
