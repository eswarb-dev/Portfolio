import React from "react";
import { Github, Linkedin, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { BrutalButton, BrutalCard, SectionHeader } from "../ui/Brutal";

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/eswar-balu", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/eswarb-dev", icon: Github },
];

const Footer = () => (
  <footer id="contact" className="neo-section" aria-labelledby="contact-heading">
    <BrutalCard variant="white" label="Available" labelVariant="secondary" className="p-5 md:p-8">
      <div className="grid items-center gap-7 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeader
            id="contact-heading"
            label="Contact CTA"
            title="Let us build the useful thing"
            subtitle="Open to AI engineering internships, full-stack product work, automation dashboards, and computer vision systems."
            labelVariant="purple"
            className="mb-0"
          />
        </div>

        <div className="flex flex-col gap-4">
          <BrutalButton
            href="https://wa.me/918925252192"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            icon={FaWhatsapp}
          >
            WhatsApp
          </BrutalButton>
          <BrutalButton
            href="https://mail.google.com/mail/?view=cm&fs=1&to=eswarbalu28@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="white"
            icon={MessageCircle}
          >
            Start a Conversation
          </BrutalButton>

          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="flex min-h-12 items-center justify-center rounded-xl border-[3px] border-black bg-white shadow-[3px_3px_0_#050505] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none focus-visible:translate-x-0.5 focus-visible:translate-y-0.5 focus-visible:shadow-none"
              >
                <link.icon aria-hidden="true" size={22} strokeWidth={3} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </BrutalCard>

    <p className="mt-12 text-center text-xs font-black uppercase tracking-normal">
      &copy; 2026 Eswar B. Engineered in bright borders and practical systems.
    </p>
  </footer>
);

export default Footer;
