/* The giant "CONNECT" wordmark that closes every site footer.
   Gradient is inline so it renders the same on pages that don't load sb.css.
   Pass `gradient` on footers whose background is too close to the default indigo → violet. */
const DEFAULT_GRADIENT = "linear-gradient(328deg, #1F30A0 19%, #914BFA 81%)";

export default function FooterWordmark({ className = "", gradient = DEFAULT_GRADIENT }) {
  return (
    <div className={`overflow-hidden px-2 ${className}`} aria-hidden="true">
      <p
        className="select-none text-center font-manrope text-[21vw] font-extrabold leading-[0.8] tracking-[-0.04em] translate-y-[12%]"
        style={{
          backgroundImage: gradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        CONNECT
      </p>
    </div>
  );
}
