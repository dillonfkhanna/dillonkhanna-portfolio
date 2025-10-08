"use client";

import { useMemo, useState } from "react";
import { CalendarClock, ChevronDown, LayoutGrid, type LucideIcon } from "lucide-react";

export type WorkExperienceAccent = "blue" | "slate" | "violet" | "teal";

export interface WorkExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string | null;
  dateRange: string;
  isCurrent: boolean;
  summary: string;
  impact: string[];
  skills: string[];
  accent?: WorkExperienceAccent;
}

export interface WorkExperienceContent {
  heading: string;
  subheading?: string;
  viewPrompt?: string;
  timelineLabel: string;
  cardsLabel: string;
  entries: WorkExperienceEntry[];
}

type ExperienceView = "timeline" | "cards";

const accentStyles: Record<WorkExperienceAccent, { dot: string; innerDot: string; ring: string; badge: string; chip: string }> = {
  blue: {
    dot: "border-sky-300/70",
    innerDot: "bg-sky-400",
    ring: "ring-2 ring-sky-200/60",
    badge: "border border-white/30 bg-white/45 text-sky-700 backdrop-blur",
    chip: "border border-white/25 bg-white/35 text-slate-600 backdrop-blur",
  },
  slate: {
    dot: "border-slate-300/70",
    innerDot: "bg-slate-400",
    ring: "ring-2 ring-slate-200/60",
    badge: "border border-white/30 bg-white/45 text-slate-700 backdrop-blur",
    chip: "border border-white/25 bg-white/35 text-slate-600 backdrop-blur",
  },
  violet: {
    dot: "border-violet-300/70",
    innerDot: "bg-violet-400",
    ring: "ring-2 ring-violet-200/60",
    badge: "border border-white/30 bg-white/45 text-violet-700 backdrop-blur",
    chip: "border border-white/25 bg-white/35 text-slate-600 backdrop-blur",
  },
  teal: {
    dot: "border-teal-300/70",
    innerDot: "bg-teal-400",
    ring: "ring-2 ring-teal-200/60",
    badge: "border border-white/30 bg-white/45 text-teal-700 backdrop-blur",
    chip: "border border-white/25 bg-white/35 text-slate-600 backdrop-blur",
  },
};

const getAccent = (accent?: WorkExperienceAccent) => accentStyles[accent ?? "slate"];

const WorkExperience: React.FC<WorkExperienceContent> = ({
  heading,
  subheading,
  viewPrompt = "View",
  timelineLabel,
  cardsLabel,
  entries,
}) => {
  const [view, setView] = useState<ExperienceView>("timeline");
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set());

  const toggleItem = (entryId: string) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }

      return next;
    });
  };

  const isOpen = (entryId: string) => openItems.has(entryId);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) {
        return -1;
      }
      if (!a.isCurrent && b.isCurrent) {
        return 1;
      }

      return (b.start || "").localeCompare(a.start || "");
    });
  }, [entries]);

  if (!sortedEntries.length) {
    return null;
  }

  return (
    <section id="experience" className="scroll-mt-32">
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
        <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/45 px-3 py-2 shadow-sm backdrop-blur">
          <span className="hidden text-xs font-medium text-slate-600 sm:inline">{viewPrompt}</span>
          <div className="inline-flex rounded-full bg-white/40 p-1 backdrop-blur">
            <ToggleButton
              icon={CalendarClock}
              label={timelineLabel}
              active={view === "timeline"}
              onClick={() => setView("timeline")}
            />
            <ToggleButton
              icon={LayoutGrid}
              label={cardsLabel}
              active={view === "cards"}
              onClick={() => setView("cards")}
            />
          </div>
        </div>
      </div>

      {view === "timeline" ? (
        <TimelineView entries={sortedEntries} isOpen={isOpen} onToggle={toggleItem} />
      ) : (
        <CardView entries={sortedEntries} isOpen={isOpen} onToggle={toggleItem} />
      )}
    </section>
  );
};

interface ToggleButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 sm:px-3.5 sm:py-2 sm:text-sm ${
      active ? "bg-white text-slate-900 shadow" : "text-slate-500 hover:text-slate-700"
    }`}
    aria-pressed={active}
  >
    <Icon className="h-4 w-4" aria-hidden="true" />
    <span>{label}</span>
  </button>
);

interface ViewProps {
  entries: WorkExperienceEntry[];
  isOpen: (entryId: string) => boolean;
  onToggle: (entryId: string) => void;
}

const TimelineView: React.FC<ViewProps> = ({ entries, isOpen, onToggle }) => (
  <div className="relative mt-12">
    <div className="pointer-events-none absolute inset-y-6 left-[1.375rem] hidden w-px bg-gradient-to-b from-slate-200 via-slate-200/60 to-transparent sm:block" />
    <ul className="space-y-8 sm:space-y-10">
      {entries.map((entry) => (
        <TimelineItem key={entry.id} entry={entry} open={isOpen(entry.id)} onToggle={onToggle} />
      ))}
    </ul>
  </div>
);

interface TimelineItemProps {
  entry: WorkExperienceEntry;
  open: boolean;
  onToggle: (entryId: string) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ entry, open, onToggle }) => {
  const accent = getAccent(entry.accent);

  return (
    <li className="relative pl-10 sm:pl-16">
      <span
        className={`absolute left-4 top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white ${accent.dot} sm:left-[1.35rem]`}
        aria-hidden="true"
      >
        <span className={`h-2 w-2 rounded-full ${accent.innerDot}`} aria-hidden="true" />
      </span>
      <article
        className={`glass-pane group relative flex flex-col overflow-hidden rounded-2xl border border-white/20 p-6 transition-transform duration-300 ${open ? accent.ring : "ring-0"} hover:-translate-y-1`}
      >
        <div className="relative z-[1] flex flex-col gap-6">
          <header className="flex flex-col gap-3 sm:grid sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] sm:items-start sm:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                {entry.dateRange}
                {entry.isCurrent ? (
                  <span className={`ml-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${accent.badge}`}>
                    Current
                  </span>
                ) : null}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">{entry.role}</h3>
              <p className="text-sm font-medium text-slate-600">{entry.company} · {entry.location}</p>
            </div>

            <p className="text-sm text-slate-600 sm:text-base">{entry.summary}</p>
          </header>

          <footer>
            {entry.skills.length ? (
              <div className="flex flex-wrap gap-2">
                {entry.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${accent.chip}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => onToggle(entry.id)}
              aria-expanded={open}
              aria-controls={`${entry.id}-details`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
              <span>{open ? "Hide impact" : "Show impact"}</span>
            </button>

            <ExperienceDetails entryId={entry.id} impact={entry.impact} open={open} />
          </footer>
        </div>
      </article>
    </li>
  );
};

const CardView: React.FC<ViewProps> = ({ entries, isOpen, onToggle }) => (
  <div className="mt-12 grid gap-6 md:grid-cols-2">
    {entries.map((entry) => (
      <CardItem key={entry.id} entry={entry} open={isOpen(entry.id)} onToggle={onToggle} />
    ))}
  </div>
);

interface CardItemProps {
  entry: WorkExperienceEntry;
  open: boolean;
  onToggle: (entryId: string) => void;
}

const CardItem: React.FC<CardItemProps> = ({ entry, open, onToggle }) => {
  const accent = getAccent(entry.accent);

  return (
    <article
      className={`glass-pane group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 p-6 transition-transform duration-300 hover:-translate-y-1 ${
        open ? accent.ring : "ring-0"
      }`}
    >
      <div className="relative z-[1] flex h-full flex-col">
        <header className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{entry.role}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {entry.company} · {entry.location}
              </p>
            </div>
            {entry.isCurrent ? (
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${accent.badge}`}>
                Current
              </span>
            ) : null}
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">{entry.dateRange}</p>
          <p className="text-sm text-slate-600 sm:text-base">{entry.summary}</p>
        </header>

        {entry.skills.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.skills.map((skill) => (
              <span
                key={skill}
                className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${accent.chip}`}
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => onToggle(entry.id)}
          aria-expanded={open}
          aria-controls={`${entry.id}-card-details`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          <span>{open ? "Hide impact" : "Show impact"}</span>
        </button>

        <ExperienceDetails
          entryId={`${entry.id}-card`}
          impact={entry.impact}
          open={open}
          containerClassName="mt-1"
        />
      </div>
    </article>
  );
};

interface ExperienceDetailsProps {
  entryId: string;
  impact: string[];
  open: boolean;
  containerClassName?: string;
}

const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({ entryId, impact, open, containerClassName }) => (
  <div
    id={`${entryId}-details`}
    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} ${
      containerClassName ?? "mt-2"
    }`}
    aria-hidden={!open}
  >
    <div className="overflow-hidden">
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
        {impact.map((item, index) => (
          <li key={`${entryId}-impact-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default WorkExperience;
