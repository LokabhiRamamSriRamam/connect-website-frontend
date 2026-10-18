/**
 * WhatsApp links — the one place the numbers and the prefilled messages live.
 *
 * Every `wa.me` link on the site is built here. Changing the number is one edit
 * in this file; nothing else hardcodes it.
 *
 * The prefilled message carries the page the visitor clicked from, so a chat
 * arrives already saying what it is about — that context is the whole point of
 * routing people to WhatsApp rather than the form.
 *
 * Plain .js (no JSX) so Node scripts can import it.
 */

/** Sales WhatsApp, in wa.me form (country code, digits only). */
export const WA_PRIMARY = "919967392920";
export const WA_SECONDARY = "918291489909";

/** Display form, for when a number is shown as text rather than used as a link. */
export const waDisplay = (n) => `+${n.slice(0, 2)} ${n.slice(2, 7)} ${n.slice(7)}`;

const GENERIC = "Hi! I'd like to know more about Screen Bazaar.";

/**
 * Prefilled message per page context.
 *
 * Keys are context ids, not paths — a page passes its own id so the message
 * does not depend on the URL shape. `waContextForPath` maps the current path to
 * one of these for the floating button, which has no page to ask.
 */
export const WA_MESSAGES = {
  generic: GENERIC,
  home: GENERIC,
  pricing: "Hi! I saw your pricing page and I'd like a quote for digital signage.",
  contact: GENERIC,
  blog: "Hi! I was reading your digital signage blog and I'd like to know more.",

  // Screen Bazaar industry pages — slug matches content.js.
  retail: "Hi! I'd like to know more about digital signage for my retail store.",
  restaurants: "Hi! I'd like to know more about digital signage for my restaurant/café.",
  healthcare: "Hi! I'd like to know more about digital signage for my clinic/hospital.",
  hospitality: "Hi! I'd like to know more about digital signage for my hotel.",
  fitness: "Hi! I'd like to know more about digital signage for my gym/studio.",
  education: "Hi! I'd like to know more about digital signage for my school/campus.",
  automotive: "Hi! I'd like to know more about digital signage for my dealership/showroom.",
  "real-estate": "Hi! I'd like to know more about digital signage for my real estate business.",
  corporate: "Hi! I'd like to know more about digital signage for my office.",

  // Other Connect Gen AI products.
  vital: "Hi! I'd like to know more about Vital AI, the medical transcriber.",
  molaris: "Hi! I'd like to know more about Molaris AI for my dental clinic.",
  nexus: "Hi! I'd like to know more about Nexus CRM.",
  saarthi: "Hi! I'd like to know more about Saarthi.",
  contractors: "Hi! I'd like to know more about Saarthi for Contractors.",
  beauty: "Hi! I'd like to know more about Beauty Manager for my salon/spa.",
};

/**
 * Build a wa.me link.
 *
 * @param {string} context  a key of WA_MESSAGES; anything unknown falls back to generic
 * @param {string} number   defaults to the primary sales number
 */
export function waLink(context = "generic", number = WA_PRIMARY) {
  const text = WA_MESSAGES[context] || GENERIC;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * The context for a path, for the floating button — which renders on every page
 * and so has to work out for itself where the visitor is.
 */
export function waContextForPath(pathname = "/") {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/") return "home";
  if (path === "/pricing") return "pricing";
  if (path === "/get-in-touch") return "contact";

  if (path.startsWith("/digital-signage/")) {
    const slug = path.slice("/digital-signage/".length);
    return WA_MESSAGES[slug] ? slug : "generic";
  }

  if (path.startsWith("/blog")) return "blog";

  if (path.startsWith("/products/saarthi/contractors")) return "contractors";
  if (path.startsWith("/products/saarthi") || path.startsWith("/saarthi")) return "saarthi";
  if (path.startsWith("/products/vital")) return "vital";
  if (path.startsWith("/products/nexus")) return "nexus";
  if (path.startsWith("/industry/dentalclinics")) return "molaris";
  if (path.startsWith("/industry/salon")) return "beauty";

  return "generic";
}

/** Paths where the floating button must not appear. */
const FAB_HIDDEN = ["/test-drive"];

export const showWaFab = (pathname = "/") =>
  !FAB_HIDDEN.some((p) => pathname === p || pathname.startsWith(`${p}/`));
