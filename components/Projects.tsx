"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ExternalLink, Github, MonitorPlay } from "lucide-react";

type ProjectStatusTone = "amber" | "emerald" | "slate";

type ProjectLinkIcon = "github" | "external" | "demo";

interface ProjectStatus {
  label: string;
  tone: ProjectStatusTone;
}

interface ProjectDetailSection {
  title: string;
  body: string;
}

interface ProjectLink {
  label: string;
  href: string;
  icon: ProjectLinkIcon;
}

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  summary: string;
  result?: string;
  detailSections: ProjectDetailSection[];
  techStack: string[];
  links?: ProjectLink[];
}

interface ProjectsProps {
  projects: Project[];
}

const statusAccentMap: Record<ProjectStatusTone, { dot: string; text: string; ring: string }> = {
  amber: {
    dot: "bg-amber-400",
    text: "text-amber-600",
    ring: "ring-amber-200/60",
  },
  emerald: {
    dot: "bg-emerald-400",
    text: "text-emerald-600",
    ring: "ring-emerald-200/60",
  },
  slate: {
    dot: "bg-slate-400",
    text: "text-slate-500",
    ring: "ring-slate-200/60",
  },
};

const linkIconMap = {
  github: Github,
  external: ExternalLink,
  demo: MonitorPlay,
} as const;

const LinkIcon = ({ icon }: { icon: ProjectLinkIcon }) => {
  const IconComponent = linkIconMap[icon] ?? ExternalLink;
  return <IconComponent className="h-4 w-4" aria-hidden="true" />;
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id ?? null);

  const toggleProject = useCallback(
    (projectId: string) => {
      setExpandedId((current) => (current === projectId ? null : projectId));
    },
    []
  );

  if (!projects.length) {
    return null;
  }

  return (
    <section id="projects" className="scroll-mt-32">
      <div className="text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-xs">
          Featured Work
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Projects that blend AI with craft
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
          A sampling of systems where I shaped the end-to-end experience - from data pipelines to interaction design - focused on delivering measurable impact.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            expanded={expandedId === project.id}
            onToggle={toggleProject}
          />
        ))}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  expanded: boolean;
  onToggle: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, expanded, onToggle }) => {
  const detailWrapperRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const statusAccent = useMemo(
    () => statusAccentMap[project.status.tone] ?? statusAccentMap.slate,
    [project.status.tone]
  );

  useEffect(() => {
    const element = detailWrapperRef.current;

    if (!element) {
      return;
    }

    const updateHeight = () => {
      setMeasuredHeight(element.scrollHeight);
    };

    updateHeight();

    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [project.id]);

  return (
    <article
      className={`glass-pane group relative flex flex-col overflow-hidden rounded-2xl border border-white/20 transition-transform duration-300 hover:-translate-y-1 ${expanded ? "ring-2 " + statusAccent.ring : "ring-0"}`}
    >
      <div className="relative z-[1] p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${statusAccent.dot}`} aria-hidden="true" />
              <span className={`text-[0.7rem] font-medium uppercase tracking-[0.25em] ${statusAccent.text}`}>
                {project.status.label}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-900 md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600 md:text-base">{project.summary}</p>
          </div>

          <div className="flex w-full items-start justify-between md:w-auto md:flex-col md:items-end md:gap-4">
            {project.result ? (
              <p className="inline-flex items-center rounded-full bg-white/40 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur md:text-sm">
                {project.result}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => onToggle(project.id)}
              aria-expanded={expanded}
              aria-controls={`${project.id}-details`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-inner transition hover:bg-slate-100"
            >
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
              <span className="sr-only">Toggle details for {project.title}</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative z-[1] overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: expanded ? measuredHeight : 0 }}
        id={`${project.id}-details`}
      >
        <div
          ref={detailWrapperRef}
          className={`border-t border-white/20 bg-white/35 px-6 pb-6 pt-5 text-sm text-slate-600 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="grid gap-6 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] md:gap-10">
            <div className="space-y-4">
              {project.detailSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-slate-900 md:text-base">{section.title}</h4>
                  <p className="mt-1 text-slate-600">{section.body}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 md:text-base">Tech Stack</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/45 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 backdrop-blur"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.links?.length ? (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 md:text-base">Explore</h4>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900"
                      >
                        <LinkIcon icon={link.icon} />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Projects;
