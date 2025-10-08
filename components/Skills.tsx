"use client";

import { useMemo, useState } from "react";
import { List, Sparkles, icons, type LucideIcon } from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon?: string;
  summary?: string;
  highlights?: string[];
  familiar?: string[];
  tags?: string[];
}

interface Certification {
  id: string;
  label: string;
  issuer?: string;
  year?: string;
  icon?: string;
  link?: string;
}

interface ViewModes {
  primaryLabel: string;
  allLabel: string;
}

export interface SkillsContent {
  heading: string;
  subheading?: string;
  viewModes: ViewModes;
  categories: SkillCategory[];
  certifications?: Certification[];
}

const fallbackIcon = icons.Circle as LucideIcon;

const getIconComponent = (iconName?: string): LucideIcon => {
  if (!iconName) {
    return fallbackIcon;
  }

  const normalized = iconName as keyof typeof icons;
  return icons[normalized] ?? fallbackIcon;
};

const CategoryIcon = ({ icon, className }: { icon?: string; className?: string }) => {
  const Icon = useMemo(() => getIconComponent(icon), [icon]);
  return <Icon aria-hidden="true" className={className} />;
};

const CertificationIcon = ({ icon, className }: { icon?: string; className?: string }) => {
  const Icon = useMemo(() => getIconComponent(icon), [icon]);
  return <Icon aria-hidden="true" className={className} />;
};

const chipBaseClasses =
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide";

const Skills: React.FC<SkillsContent> = ({
  heading,
  subheading,
  viewModes,
  categories,
  certifications = [],
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = useMemo(() => categories, [categories]);

  if (!visibleCategories.length) {
    return null;
  }

  const primaryLabel = viewModes.primaryLabel ?? "Core";
  const allLabel = viewModes.allLabel ?? "All";

  return (
    <section id="skills" className="scroll-mt-32">
      <div className="text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-xs">
          {heading}
        </p>
        {subheading ? (
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {subheading}
          </h2>
        ) : null}
      </div>

      <div className="mt-8 flex w-full justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/60 bg-white/70 px-3 py-2 shadow-sm backdrop-blur">
          <span className="hidden text-xs font-medium text-slate-500 sm:inline">View</span>
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              aria-pressed={!showAll}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 sm:px-3.5 sm:py-2 sm:text-sm ${
                showAll ? "text-slate-500 hover:text-slate-700" : "bg-white text-slate-900 shadow"
              }`}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>{primaryLabel}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              aria-pressed={showAll}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 sm:px-3.5 sm:py-2 sm:text-sm ${
                showAll ? "bg-white text-slate-900 shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <List className="h-4 w-4" aria-hidden="true" />
              <span>{allLabel}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((category) => (
          <article
            key={category.id}
            className="glass-pane group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative z-[1] flex h-full flex-col gap-5">
                <header className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/30 bg-white/60 text-slate-500 shadow-inner backdrop-blur">
                    <CategoryIcon icon={category.icon} className="h-5 w-5" />
                    <span className="sr-only">{category.title}</span>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
                    {category.summary ? (
                      <p className="mt-1 text-sm text-slate-600">{category.summary}</p>
                    ) : null}
                  </div>
                </header>

                {category.highlights?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {category.highlights.map((skill) => (
                      <span
                        key={`${category.id}-highlight-${skill}`}
                        className={`${chipBaseClasses} border-white/30 bg-white/45 text-slate-600 backdrop-blur`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}

                {showAll && category.familiar?.length ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.familiar.map((skill) => (
                      <span
                        key={`${category.id}-fam-${skill}`}
                        className={`${chipBaseClasses} border-white/20 bg-white/35 text-slate-500 backdrop-blur`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
            </div>
          </article>
        ))}
      </div>

      {certifications.length ? (
        <div className="mt-10 rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            {certifications.map((cert) => {
              const content = (
                <span
                  key={cert.id}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/75 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  <CertificationIcon icon={cert.icon ?? "ShieldCheck"} className="h-4 w-4" />
                  <span>{cert.label}</span>
                  {cert.year ? (
                    <span className="text-[0.65rem] font-medium uppercase tracking-wide text-slate-500">
                      {cert.year}
                    </span>
                  ) : null}
                </span>
              );

              if (cert.link) {
                return (
                  <a
                    key={cert.id}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:-translate-y-0.5 hover:shadow"
                  >
                    {content}
                  </a>
                );
              }

              return content;
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Skills;
