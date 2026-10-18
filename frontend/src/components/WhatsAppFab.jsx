import { useLocation } from "react-router-dom";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLink, waContextForPath, showWaFab } from "../lib/whatsapp";

/*
 * Floating WhatsApp button — on every page except the test drive, which is an
 * app surface with its own controls the button would sit on top of.
 *
 * The prefilled message comes from the current path, so a chat started from the
 * retail page already says it is about retail. See src/lib/whatsapp.js.
 *
 */

export default function WhatsAppFab() {
  const { pathname } = useLocation();

  if (!showWaFab(pathname)) return null;

  return (
    <a
      href={waLink(waContextForPath(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full border-2 border-sb-ink bg-[#25D366] text-white shadow-[4px_4px_0_#191919] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#191919] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-ink sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon size={30} />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border-2 border-sb-ink bg-white px-3 py-1.5 font-manrope text-sm font-extrabold text-sb-ink shadow-[3px_3px_0_#191919] opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  );
}
