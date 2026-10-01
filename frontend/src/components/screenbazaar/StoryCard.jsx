/**
 * Card whose illustration is the interaction trigger:
 * hover/focus → illustration collapses into a "?" + "Click to know more"; click → onOpen().
 */
export default function StoryCard({ eyebrow, badge, title, line, Art, morph = "collapse", onOpen, id }) {
  return (
    <button
      type="button"
      id={id}
      onClick={onOpen}
      data-morph={morph}
      className="sb-card group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-sb-line bg-white text-left shadow-[0_1px_0_rgba(25,25,25,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-sb-lilac hover:shadow-[0_24px_48px_-24px_rgba(75,63,208,0.45)] focus:outline-none focus-visible:ring-4 focus-visible:ring-sb-violet/40 scroll-mt-28"
    >
      {/* illustration — top two-thirds */}
      <div className="relative m-2 mb-0 aspect-[4/3] overflow-hidden rounded-[22px] bg-gradient-to-br from-sb-lavender via-white to-sb-ivory">
        <div className={`sb-illus absolute inset-0 p-2 ${badge ? "pt-12" : ""}`}>
          <Art />
        </div>
        {/* optional name badge — stays put while the illustration morphs */}
        {badge && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-sb-gold py-1.5 pl-1.5 pr-4 font-manrope text-lg font-extrabold leading-none tracking-tight text-sb-ink shadow-[3px_3px_0_#191919] transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105 sm:text-xl">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sb-ink text-[11px] tracking-normal text-white">
              {badge.n}
            </span>
            {badge.label}
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="sb-q flex h-24 w-24 items-center justify-center rounded-full bg-sb-gradient font-manrope text-6xl font-extrabold text-white shadow-[0_18px_40px_-12px_rgba(145,75,250,0.7)]">
            ?
          </span>
          <span className="sb-q-label rounded-full bg-sb-ink px-4 py-1.5 font-manrope text-sm font-bold text-white">
            Click to know more
          </span>
        </div>
      </div>

      {/* text */}
      <div className="flex flex-1 flex-col gap-2 px-6 pb-6 pt-5">
        {eyebrow && (
          <span className="font-manrope text-xs font-extrabold uppercase tracking-[0.18em] text-sb-violet">{eyebrow}</span>
        )}
        <h4 className="font-manrope text-xl font-extrabold leading-snug tracking-tight text-sb-ink">{title}</h4>
        <p className="font-manrope text-[15px] leading-relaxed text-sb-slate">{line}</p>
        <span className="mt-auto pt-3 font-manrope text-sm font-bold text-sb-indigo md:hidden">Tap to know more →</span>
      </div>
    </button>
  );
}
