import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/** Accessible modal: Esc/overlay closes, body scroll locked, focus moves in and returns. */
export default function StoryModal({ open, onClose, eyebrow, title, Art, children }) {
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-sb-ink/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] bg-sb-cream font-manrope text-sb-ink shadow-2xl outline-none sm:rounded-[28px]"
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
          >
            <div className="relative shrink-0 bg-gradient-to-br from-sb-lavender via-white to-sb-ivory">
              {Art && (
                <div className="mx-auto h-40 max-w-sm sm:h-48">
                  <Art />
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sb-ink shadow-md transition hover:rotate-90 hover:bg-sb-ink hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-6 pb-8 pt-6 sm:px-10">
              {eyebrow && (
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sb-violet">{eyebrow}</p>
              )}
              <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{title}</h3>
              <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-sb-slate">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ---------- Body blocks shared by both modal types ---------- */

export function Bullets({ items }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 text-sb-ink">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sb-gradient" />
          <span className="font-semibold">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Imagine({ lines, label = "Imagine" }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-sb-gradient p-5 text-white sm:p-6">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sb-gold">{label}</p>
      <div className="mt-2 space-y-1.5 font-semibold">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <svg className="absolute -right-3 -top-3 h-16 w-16 opacity-30" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z" fill="#fff" />
      </svg>
    </div>
  );
}

export function Blocks({ body }) {
  return body.map((b, i) => {
    if (b.list)
      return (
        <div key={i} className="space-y-3">
          {b.lead && <p>{b.lead}</p>}
          <Bullets items={b.list} />
        </div>
      );
    if (b.table)
      return (
        <div key={i} className="space-y-3">
          {b.lead && <p>{b.lead}</p>}
          <div className="overflow-hidden rounded-2xl border border-sb-line bg-white">
            {b.table.map(([k, v]) => (
              <div key={k} className="flex items-center gap-4 border-b border-sb-line px-4 py-3 last:border-0">
                <span className="w-24 shrink-0 text-sm font-extrabold text-sb-violet">{k}</span>
                <span className="font-semibold text-sb-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>
      );
    if (b.imagine) return <Imagine key={i} lines={b.imagine} />;
    if (b.flow)
      return (
        <p key={i} className="inline-block rounded-full bg-sb-ink px-5 py-2.5 text-base font-extrabold text-white">
          {b.flow}
        </p>
      );
    if (b.quote) return <p key={i} className="border-l-4 border-sb-lilac pl-4 text-lg italic text-sb-ink">{b.quote}</p>;
    if (b.callout)
      return (
        <p key={i} className="inline-flex items-center gap-2 rounded-2xl bg-sb-blush px-4 py-3 font-extrabold text-[#B42318]">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#EF4444]" />
          {b.callout}
        </p>
      );
    if (b.outro) return <p key={i} className="pt-1 text-lg font-extrabold text-sb-ink">{b.outro}</p>;
    return <p key={i}>{b.p}</p>;
  });
}
