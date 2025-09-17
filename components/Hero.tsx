import { ArrowRight, Sparkles } from "lucide-react";

interface Cta {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface HeroStatsItem {
  label: string;
  value: string;
}

interface HeroInfoPanel {
  metaLabel: string;
  headline: string;
  body: string;
  stats: HeroStatsItem[];
}

interface HeroProps {
  badgeLabel: string;
  title: string;
  subtitle: string;
  focusPoints: string[];
  primaryCta: Cta;
  secondaryCta: Cta;
  infoPanel: HeroInfoPanel;
}

const accentTitle = (title: string) => {
  if (!title.includes("&")) {
    return { primary: title, accent: "" };
  }

  const [primary, accent] = title.split("&").map((part) => part.trim());
  return { primary, accent };
};

export default function Hero({
  badgeLabel,
  title,
  subtitle,
  focusPoints,
  primaryCta,
  secondaryCta,
  infoPanel,
}: HeroProps) {
  const { primary, accent } = accentTitle(title);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-10 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl">
      <div
        className="absolute inset-y-0 -right-24 hidden h-[140%] w-72 -rotate-12 transform bg-gradient-to-b from-sky-400/70 via-teal-300/60 to-emerald-400/70 blur-3xl md:block"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-900 shadow-sm shadow-sky-100">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>{badgeLabel}</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {primary}
            {accent ? (
              <span className="ml-3 inline-block bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 bg-clip-text font-bold text-transparent">
                &amp; {accent}
              </span>
            ) : null}
          </h1>

          <p className="text-lg leading-relaxed text-slate-600">{subtitle}</p>

          <div className="space-y-3 text-lg leading-relaxed text-slate-600">
            {focusPoints.map((point) => (
              <p
                key={point}
                className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm shadow-slate-200/60"
              >
                {point}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
              href={primaryCta.href}
              aria-label={primaryCta.ariaLabel}
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-200/80 transition hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              href={secondaryCta.href}
              aria-label={secondaryCta.ariaLabel}
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="glass-pane relative mt-6 flex w-full max-w-xs flex-col gap-4 rounded-3xl p-6 text-sm text-slate-700 shadow-lg shadow-slate-900/10 md:mt-0">
          <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {infoPanel.metaLabel}
          </div>
          <div className="text-lg font-semibold text-slate-900">{infoPanel.headline}</div>
          <p className="text-sm leading-relaxed text-slate-600">{infoPanel.body}</p>
          <div className="grid grid-cols-2 gap-3 text-left text-xs uppercase text-slate-500">
            {infoPanel.stats.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className="rounded-2xl border border-slate-200/60 bg-white/70 p-3 shadow-sm"
              >
                <div className="text-[0.7rem] font-medium text-slate-500">{item.label}</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
