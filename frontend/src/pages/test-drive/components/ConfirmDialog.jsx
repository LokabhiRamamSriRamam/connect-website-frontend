import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * A small two-button confirm.
 *
 * Not StoryModal: that one is built for prose — an illustration, an eyebrow, a
 * title and body blocks — and has no footer, no confirm action and no notion of a
 * destructive choice. Borrowing it would mean passing buttons in as `children`
 * and styling around its layout. This is the same accessibility contract (Esc
 * closes, the overlay closes, body scroll locks, focus moves in and returns)
 * written for a decision rather than a story.
 *
 * Focus lands on CANCEL, not confirm. Every use of this dialog is a change the
 * visitor might not have meant, so the default action under a stray Enter should
 * be "no".
 */
export default function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    // rAF, because the node is not focusable until the portal has painted.
    const raf = requestAnimationFrame(() => cancelRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      lastFocus.current?.focus?.();
    };
  }, [open, onCancel]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-sb-ink/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="td-sheet td-safe-bottom relative w-full max-w-md overflow-y-auto rounded-t-[28px] border-2 border-sb-ink bg-sb-cream p-5 font-manrope text-sb-ink shadow-[6px_6px_0_#191919] sm:rounded-[28px]"
      >
        <h3 className="text-lg font-extrabold leading-tight tracking-tight">{title}</h3>
        <p className="mt-2 text-[14px] font-semibold leading-relaxed text-sb-slate">{body}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onConfirm}
            /* sb-blush is the palette's only warning fill — there is no sb-alert
               token, and an invented class would silently do nothing. */
            className={`td-tap rounded-full border-2 border-sb-ink px-4 py-2 text-[13px] font-extrabold shadow-[3px_3px_0_#191919] ${
              destructive ? "bg-sb-blush text-sb-ink" : "bg-sb-gradient text-white"
            }`}
          >
            {confirmLabel}
          </button>
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="td-tap rounded-full border-2 border-sb-ink bg-white px-4 py-2 text-[13px] font-extrabold"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
