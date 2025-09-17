import { ArrowDown } from "lucide-react";

interface TechFocus {
  headline: string;
  summary: string;
  skills: string[];
}

interface HeroProps {
  name: string;
  jobTitle: string;
  description: string;
  techFocus: TechFocus;
  scrollTarget: string;
}

export default function Hero({
  name,
  jobTitle,
  description,
  techFocus,
  scrollTarget,
}: HeroProps) {
  const marqueeItems = [...techFocus.skills, ...techFocus.skills];

  return (
    <section className="relative flex min-h-fit flex-col justify-center gap-16 pt-20 sm:pt-24 lg:min-h-[calc(100vh-12rem)] lg:pt-12">
      <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            {name}
          </h1>
          <h2 className="mt-3 text-lg font-medium text-slate-600 sm:mt-4 sm:text-xl lg:text-2xl">
            {jobTitle}
          </h2>
          <p className="mt-6 text-base text-slate-600 sm:text-lg lg:max-w-2xl">
            {description}
          </p>
        </div>

        <div className="w-full">
          <div className="glass-pane rounded-2xl p-5 sm:p-6">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 sm:text-xs">
              Tech Focus
            </p>
            <p className="mt-3 text-base font-semibold text-slate-800 sm:text-lg">
              {techFocus.headline}
            </p>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">{techFocus.summary}</p>
            <hr className="my-4 border-slate-200/70" />
            <div className="tech-scroll-container py-1 sm:py-2">
              <div className="tech-scroll flex min-w-max gap-4">
                {marqueeItems.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="tech-scroll-item text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-sm"
                    aria-hidden={index >= techFocus.skills.length}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 text-center">
        <a
          href={scrollTarget}
          className="inline-flex items-center justify-center text-slate-500 transition hover:text-slate-700"
          aria-label="Scroll to highlighted section"
        >
          <ArrowDown className="h-6 w-6 sm:h-7 sm:w-7 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
