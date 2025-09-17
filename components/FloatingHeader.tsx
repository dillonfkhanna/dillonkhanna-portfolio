"use client";

import type { MouseEvent } from "react";
import { useCallback, useMemo } from "react";
import { Download, Github, Linkedin, Terminal } from "lucide-react";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Career", href: "#career" },
  { label: "Principles", href: "#principles" },
];

const FloatingHeader: React.FC = () => {
  const resumeHref = useMemo(() => {
    const fallback = encodeURI("/Khanna, Dillon - Resume.pdf");
    return process.env.NEXT_PUBLIC_RESUME_URL ?? fallback;
  }, []);

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const target = event.currentTarget.getAttribute("href");

      if (!target || !target.startsWith("#")) {
        return;
      }

      const section = document.querySelector(target);

      if (section instanceof HTMLElement) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  return (
    <header className="fixed top-4 left-1/2 z-[60] w-[95%] max-w-6xl -translate-x-1/2">
      <div className="glass-pane flex h-16 items-center justify-between rounded-2xl border border-white/30 px-4 sm:px-6">
        <div className="text-lg font-semibold tracking-tight text-slate-800 sm:text-xl">
          DK
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="transition-colors hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="https://github.com/dillonfkhanna"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-black/5"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/dillonkhanna/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-black/5"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={resumeHref}
            download
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-black/5"
            aria-label="Download Resume"
            title="Download Resume"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-black/5"
            aria-label="Toggle Terminal"
            title="Toggle Terminal"
          >
            <Terminal className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default FloatingHeader;
