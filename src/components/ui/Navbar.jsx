import React from "react";

const navItems = [
  { label: "Proof", href: "#proof" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => (
  <header className="fixed left-0 right-0 top-2 z-50 py-2">
    <nav
      aria-label="Primary navigation"
      className="site-nav flex items-center justify-between rounded-xl border-[3px] border-black bg-white px-3 py-2 shadow-[4px_4px_0_#050505] sm:px-4"
    >
      <a href="#hero" className="min-w-0 leading-none" aria-label="Go to Eswar B hero section">
        <span className="block text-base font-black uppercase sm:text-lg">Eswar B</span>
        <span className="block text-[10px] font-black uppercase tracking-normal text-[#5c25b8] sm:text-xs">
          AI Engineer
        </span>
      </a>

      <div className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-lg border-[2px] border-black px-2.5 py-1.5 text-[11px] font-black uppercase transition-transform hover:-translate-y-0.5 hover:bg-[#ffe14d] focus-visible:bg-[#ffe14d]"
          >
            {item.label}
          </a>
        ))}
      </div>

      <a
        href="https://github.com/eswarb-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-lg border-[3px] border-black bg-[#39ff14] px-3 py-1.5 text-[11px] font-black uppercase shadow-[2px_2px_0_#050505] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none focus-visible:translate-x-0.5 focus-visible:translate-y-0.5 focus-visible:shadow-none"
      >
        GitHub
      </a>
    </nav>
  </header>
);

export default Navbar;
