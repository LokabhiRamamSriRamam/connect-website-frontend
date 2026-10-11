/**
 * Shared Screen Bazaar form primitives.
 *
 * Extracted verbatim from pages/get-in-touch.jsx so /test-drive can reuse them.
 * Visual output is unchanged — if you restyle anything here, check BOTH
 * /get-in-touch and /test-drive.
 */
import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

/** Input/select/textarea classes. Pass the field's error to get the red state. */
export const inputCls = (err) =>
  `w-full scroll-mt-32 rounded-2xl border-2 bg-white px-4 py-3 font-manrope text-base font-semibold text-sb-ink placeholder:font-medium placeholder:text-sb-muted/70 transition-shadow focus:outline-none ${
    err
      ? "border-red-500 shadow-[3px_3px_0_#ef4444]"
      : "border-sb-ink focus:shadow-[4px_4px_0_#914BFA]"
  }`;

/** A fieldset of radio pills. `options` is an array of strings; the value IS the label. */
export function PillGroup({ legend, name, value, options, onChange, optional }) {
  return (
    <fieldset>
      <legend className="mb-2 flex w-full items-baseline justify-between font-manrope text-xs font-extrabold uppercase tracking-[0.16em] text-sb-ink">
        {legend}
        {optional && <span className="text-[10px] font-bold normal-case tracking-normal text-sb-muted">optional</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((c) => (
          <label key={c} className="cursor-pointer">
            <input type="radio" name={name} value={c} checked={value === c} onChange={onChange} className="peer sr-only" />
            <span className="inline-block rounded-full border-2 border-sb-ink bg-white px-4 py-2 font-manrope text-sm font-extrabold text-sb-ink transition-all peer-checked:-translate-y-0.5 peer-checked:bg-sb-gradient peer-checked:text-white peer-checked:shadow-[3px_3px_0_#191919] peer-focus-visible:ring-4 peer-focus-visible:ring-sb-violet/40 hover:bg-sb-lilac">
              {c}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Label + control + animated error line. `shakeKey` re-triggers the shake on repeat submits.
 *
 * `optional` may be `true` for the default English word, or a string — the test
 * drive passes a translated one, since it runs in Hindi too.
 */
export function Field({ id, label, optional, error, shakeKey, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between font-manrope text-xs font-extrabold uppercase tracking-[0.16em] text-sb-ink">
        {label}
        {optional && <span className="text-[10px] font-bold normal-case tracking-normal text-sb-muted">{typeof optional === "string" ? optional : "optional"}</span>}
      </label>
      {children}
      {error && (
        <p key={shakeKey} id={`${id}-err`} className="sb-shake mt-1.5 flex items-center gap-1.5 font-manrope text-sm font-bold text-red-600">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

/**
 * The errors + shake + focus-first-invalid pattern.
 *
 * Attach `formRef` to the <form>; after a failed submit, focus moves to the first
 * control marked aria-invalid. Spread `errProps(name)` onto each control.
 */
export function useFormErrors() {
  const [errors, setErrors] = useState({});
  const [shakeKey, setShakeKey] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    if (!shakeKey) return;
    formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
  }, [shakeKey]);

  /** Show these errors and (re)trigger the shake + focus. */
  const fail = (found) => {
    setErrors(found);
    setShakeKey((k) => k + 1);
  };

  /** Clear one field's error — call from the change handler. */
  const clearError = (name) =>
    setErrors((er) => (er[name] ? { ...er, [name]: undefined } : er));

  const errProps = (name) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-err` } : {};

  return { errors, setErrors, shakeKey, formRef, fail, clearError, errProps };
}
