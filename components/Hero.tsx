import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
}

const accentTitle = (title: string) => {
  if (!title.includes("&")) {
    return { primary: title, accent: "" };
  }

  const [primary, accent] = title.split("&").map((part) => part.trim());
  return { primary, accent };
};

export default function Hero({ title, subtitle }: HeroProps) {
  const { primary, accent } = accentTitle(title);
  const focusPoints = subtitle.split(".").map((sentence) => sentence.trim()).filter(Boolean);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-10 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl">
      <div className="absolute inset-y-0 -right-24 hidden h-[140%] w-72 -rotate-12 transform bg-gradient-to-b from-sky-400/70 via-teal-300/60 to-emerald-400/70 blur-3xl md:block" aria-hidden="true" />

      <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-900 shadow-sm shadow-sky-100">
            <Sparkles className="h-4 w-4" />
            <span>Professional Render Mode</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {primary}
            {accent ? (
              <span className="ml-3 inline-block bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 bg-clip-text font-bold text-transparent">
                &amp; {accent}
              </span>
            ) : null}
          </h1>

          <div className="space-y-3 text-lg leading-relaxed text-slate-600">
            {focusPoints.map((point, index) => (
              <p key={index} className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm shadow-slate-200/60">
                {point}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
              href="#projects"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-200/80 transition hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              href="#contact"
            >
              Connect with Me
            </a>
          </div>
        </div>

        <div className="glass-pane relative mt-6 flex w-full max-w-xs flex-col gap-4 rounded-3xl p-6 text-sm text-slate-700 shadow-lg shadow-slate-900/10 md:mt-0">
          <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Currently</div>
          <div className="text-lg font-semibold text-slate-900">Designing resilient systems</div>
          <p className="text-sm leading-relaxed text-slate-600">
            Focused on building AI-powered platforms and operational tooling that scale from prototype to production without sacrificing developer velocity.
          </p>
          <div className="grid grid-cols-2 gap-3 text-left text-xs uppercase text-slate-500">
            <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-3 shadow-sm">
              <div className="text-[0.7rem] font-medium text-slate-500">Core Stack</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Next.js · GCP</div>
            </div>
            <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-3 shadow-sm">
              <div className="text-[0.7rem] font-medium text-slate-500">Specialty</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">AI Pipelines</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
