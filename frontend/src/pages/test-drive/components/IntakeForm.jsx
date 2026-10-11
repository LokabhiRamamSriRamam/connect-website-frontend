import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { inputCls, Field, useFormErrors } from "../../../components/forms/fields";
import { SB_SERVICE, LEAD_SOURCE_TEST_DRIVE } from "../../../components/forms/services";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import {
  businessField,
  businessSubmitStart,
  businessSubmitOk,
  businessSubmitFail,
  enterConsole,
} from "../state/actions.js";

/**
 * Stage 2: the only form in the test drive.
 *
 * Deliberately short. Five fields, one of them optional, and no "how many screens?"
 * — the test drive always builds exactly five, so asking would imply a choice the
 * simulator does not offer.
 *
 * Entered values live in reducer state, not local state, for two reasons: going
 * back to the welcome stage must not lose them, and neither must switching
 * language. Nothing here is ever put in the URL.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** The two industries with a creative library. Values are slugs; labels translate. */
const INDUSTRY_SLUGS = ["restaurant", "cafe"];

/**
 * What goes in the Lead document. Not the translated label: a Hindi visitor would
 * otherwise send Devanagari into a field the sales team reads in English, and the
 * same business would bucket under two different industry strings.
 */
const INDUSTRY_LEAD_LABEL = { restaurant: "Restaurant", cafe: "Café / Coffee Shop" };

function validate(business, t) {
  const e = {};

  if (business.businessName.trim().length < 2) {
    e.businessName = t("intake.err.businessName");
  }

  if (!INDUSTRY_SLUGS.includes(business.industry)) {
    e.industry = t("intake.err.industry");
  }

  // Permissive on punctuation and generous on length so international numbers pass;
  // the digit count is what actually gates it. Matches the Lead model's own rule.
  const digits = business.phone.replace(/\D/g, "");
  if (!digits) e.phone = t("intake.err.phone");
  else if (
    !/^\+?[\d\s\-().]+$/.test(business.phone.trim()) ||
    digits.length < 7 ||
    digits.length > 15
  ) {
    e.phone = t("intake.err.phoneFormat");
  }

  if (!business.email.trim()) e.email = t("intake.err.email");
  else if (!EMAIL_RE.test(business.email.trim())) e.email = t("intake.err.emailFormat");

  return e;
}

export default function IntakeForm({ onBack }) {
  const { t } = useI18n();
  const { business, lead } = useTd();
  const dispatch = useTdDispatch();
  const reduce = useReducedMotion();
  const { errors, shakeKey, formRef, fail, clearError, errProps } = useFormErrors();

  // The honeypot is the one piece of form data that is not simulator state: it is
  // never read back, never persisted, and a bot filling it should leave no trace.
  const [website, setWebsite] = useState("");

  const sending = lead.status === "sending";

  const set = (e) => {
    const { name, value } = e.target;
    dispatch(businessField(name, value));
    clearError(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return; // no double submits

    const found = validate(business, t);
    if (Object.keys(found).length) {
      fail(found);
      return;
    }

    // Bot filled the hidden field. Start the demo, send nothing.
    if (website) {
      dispatch(enterConsole());
      return;
    }

    dispatch(businessSubmitStart());

    // Every value is a string: pick() in leads.routes.js filters on
    // `typeof body[k] === "string"`, so a number would be dropped in silence.
    const payload = {
      name: business.name.trim(),
      businessName: business.businessName.trim(),
      industry: INDUSTRY_LEAD_LABEL[business.industry],
      phone: business.phone.trim(),
      email: business.email.trim(),
      service: SB_SERVICE,
      source: LEAD_SOURCE_TEST_DRIVE,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // A 400 is the model rejecting a value — something the visitor can fix, and
        // the only failure worth holding them on the form for. Entering the console
        // would unmount the field errors we just mapped.
        if (response.status === 400 && data.fields) {
          dispatch(businessSubmitFail(data.error || "invalid"));
          fail(data.fields);
          return;
        }
        throw new Error(data.error || "lead rejected");
      }

      dispatch(businessSubmitOk(data.id ?? null));
    } catch (err) {
      dispatch(
        businessSubmitFail(err instanceof TypeError ? "network" : err.message || "error")
      );
    }

    // Owner decision: for every other failure the demo starts anyway. Losing the
    // visitor to a network blip costs more than losing the lead, and the first Save
    // retries quietly.
    dispatch(enterConsole());
  };

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
      };

  const req = <span className="text-sb-violet">*</span>;

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <motion.div {...rise}>
        <h1 className="text-[1.75rem] font-extrabold leading-tight tracking-tight sm:text-4xl">
          {t("intake.heading")}
        </h1>
        <p className="mt-3 text-[15px] font-semibold leading-relaxed text-sb-slate">
          {t("intake.description")}
        </p>
      </motion.div>

      <div className="relative mt-8">
        <div
          className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] border-2 border-sb-ink bg-sb-gradient"
          aria-hidden="true"
        />
        <div className="relative rounded-[28px] border-2 border-sb-ink bg-sb-ivory p-5 sm:p-7">
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
            <Field
              id="businessName"
              label={<span>{t("intake.businessName")} {req}</span>}
              error={errors.businessName}
              shakeKey={shakeKey}
            >
              <input
                id="businessName"
                name="businessName"
                value={business.businessName}
                onChange={set}
                autoComplete="organization"
                maxLength={150}
                className={inputCls(errors.businessName)}
                {...errProps("businessName")}
              />
            </Field>

            <Field
              id="industry"
              label={<span>{t("intake.industry")} {req}</span>}
              error={errors.industry}
              shakeKey={shakeKey}
            >
              <select
                id="industry"
                name="industry"
                value={business.industry}
                onChange={set}
                className={inputCls(errors.industry)}
                {...errProps("industry")}
              >
                <option value="">{t("intake.industryPlaceholder")}</option>
                {INDUSTRY_SLUGS.map((slug) => (
                  <option key={slug} value={slug}>
                    {t(`industries.${slug}`)}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="phone"
                label={<span>{t("intake.phone")} {req}</span>}
                error={errors.phone}
                shakeKey={shakeKey}
              >
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={business.phone}
                  onChange={set}
                  autoComplete="tel"
                  maxLength={20}
                  placeholder="+91 98765 43210"
                  className={inputCls(errors.phone)}
                  {...errProps("phone")}
                />
              </Field>

              <Field
                id="email"
                label={<span>{t("intake.email")} {req}</span>}
                error={errors.email}
                shakeKey={shakeKey}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  value={business.email}
                  onChange={set}
                  autoComplete="email"
                  maxLength={200}
                  className={inputCls(errors.email)}
                  {...errProps("email")}
                />
              </Field>
            </div>

            <Field
              id="name"
              label={t("intake.yourName")}
              optional={t("common.optional")}
              error={errors.name}
              shakeKey={shakeKey}
            >
              <input
                id="name"
                name="name"
                value={business.name}
                onChange={set}
                autoComplete="name"
                maxLength={100}
                className={inputCls(errors.name)}
                {...errProps("name")}
              />
            </Field>

            {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
            <div className="absolute -left-[9999px] top-0" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <p className="flex items-start gap-2 text-[12px] font-semibold leading-relaxed text-sb-muted">
              <Lock size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              {t("intake.privacy")}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                data-td-target="intake-submit"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full border-2 border-sb-ink bg-sb-gradient px-6 py-3.5 font-manrope text-base font-extrabold text-white shadow-[5px_5px_0_#191919] transition-shadow hover:shadow-[7px_7px_0_#191919] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sb-violet/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t("intake.submitting")}
                  </>
                ) : (
                  <>
                    {t("intake.cta")}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex min-h-[44px] items-center rounded-full border-2 border-sb-ink bg-white px-5 py-2.5 font-manrope text-sm font-extrabold shadow-[3px_3px_0_#191919] transition-transform hover:-translate-y-0.5"
                >
                  {t("common.back")}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
