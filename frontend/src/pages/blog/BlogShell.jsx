import { useEffect, useState } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronDown, Clock3 } from "lucide-react";
import TopNav from "../../components/TopNav";
import FinalCTA from "../../components/screenbazaar/FinalCTA";
import SBFooter from "../../components/screenbazaar/SBFooter";
import { ScreenBazaarMark } from "../../components/screenbazaar/ScreenBazaarLogo";
import { COVERS } from "./art/covers";
import BlogCard from "./BlogCard";
import { Faq } from "./kit";
import { AUTHOR, BLOGS, BLOG_BASE } from "./meta";
import "../../components/screenbazaar/sb.css";
import "./blog.css";

const fmtDate = (d) => new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/* Highlights the section currently being read. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

function Toc({ toc, active }) {
  return (
    <nav aria-label="On this page" className="bl-toc">
      {toc.map((t) => (
        <a key={t.id} href={`#${t.id}`} aria-current={active === t.id ? "true" : undefined}>
          {t.label}
        </a>
      ))}
    </nav>
  );
}

/* Shared reading layout around each blog body. Everything inside `children` is written for that blog. */
export default function BlogShell({ post, toc, children, afterFaq }) {
  const Cover = COVERS[post.slug];
  const fullToc = [...toc, ...(post.faqs?.length ? [{ id: "faq", label: "Frequently Asked Questions" }] : [])];
  const active = useActiveSection(fullToc.map((t) => t.id));
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const idx = BLOGS.findIndex((b) => b.slug === post.slug);
  const more = [1, 2, 3].map((k) => BLOGS[(idx + k) % BLOGS.length]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="sb-root blog-root min-h-screen overflow-x-clip" style={{ "--accent": post.accent, "--tint": post.tint }}>
        <motion.div className="bl-progress" style={{ scaleX }} aria-hidden="true" />
        <TopNav theme="cream" />
        <main>
          <article>
            {/* title block */}
            <header className="relative overflow-hidden pb-10 pt-32 sm:pt-36" style={{ background: `linear-gradient(180deg, ${post.tint}, #F8F6F2)` }}>
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <nav aria-label="Breadcrumb" className="font-manrope text-sm font-bold text-sb-muted">
                  <ol className="flex flex-wrap items-center gap-1.5">
                    <li>
                      <a href="/" className="hover:text-sb-ink">Home</a>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                      <a href={BLOG_BASE} className="hover:text-sb-ink">Blogs</a>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="truncate text-sb-ink" style={{ maxWidth: "16rem" }}>
                      {post.category}
                    </li>
                  </ol>
                </nav>
                <span
                  className="mt-6 inline-flex rounded-full border-2 border-sb-ink px-4 py-1.5 font-manrope text-xs font-extrabold uppercase tracking-[0.18em] text-white shadow-[3px_3px_0_#191919]"
                  style={{ background: post.accent }}
                >
                  {post.category}
                </span>
                <h1 className="mt-5 font-manrope text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-sb-ink sm:text-5xl lg:text-[3.4rem]">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-3xl font-manrope text-lg font-semibold leading-relaxed text-sb-slate sm:text-xl">{post.dek}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-manrope text-sm font-bold text-sb-slate">
                  <span className="inline-flex items-center gap-2 text-sb-ink">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-sb-ink bg-white">
                      <ScreenBazaarMark size={20} />
                    </span>
                    {AUTHOR}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={16} aria-hidden="true" />
                    <time dateTime={post.date}>{fmtDate(post.date)}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={16} aria-hidden="true" />
                    {post.readMins} min read
                  </span>
                </div>
              </div>
              <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
                <div className="aspect-video overflow-hidden rounded-[28px] border-2 border-sb-ink shadow-[8px_8px_0_#191919]" style={{ background: post.tint }}>
                  <Cover />
                </div>
              </div>
            </header>

            {/* body */}
            <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
              <aside className="hidden lg:block">
                <div className="sticky top-28 pt-12">
                  <p className="mb-3 font-manrope text-xs font-extrabold uppercase tracking-[0.18em] text-sb-muted">On this page</p>
                  <Toc toc={fullToc} active={active} />
                </div>
              </aside>
              <div className="min-w-0 max-w-[740px] pt-8 font-manrope">
                <details className="mb-8 rounded-2xl border-2 border-sb-ink bg-white lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-extrabold text-sb-ink">
                    On this page <ChevronDown size={18} aria-hidden="true" />
                  </summary>
                  <div className="px-4 pb-4">
                    <Toc toc={fullToc} active={active} />
                  </div>
                </details>

                <div className="blog-prose">
                  {children}

                  {post.faqs?.length > 0 && (
                    <section aria-labelledby="faq">
                      <h2 id="faq">Frequently Asked Questions</h2>
                      <Faq items={post.faqs} />
                    </section>
                  )}
                  {afterFaq}
                </div>

                {post.related && (
                  <a
                    href={post.related.href}
                    className="mt-12 flex items-center justify-between gap-4 rounded-2xl border-2 border-sb-ink bg-white p-5 font-extrabold text-sb-ink shadow-[4px_4px_0_#191919] transition-transform hover:-translate-y-0.5"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-[0.16em]" style={{ color: post.accent }}>
                        Related
                      </span>
                      {post.related.label}
                    </span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* keep reading */}
          <section aria-labelledby="keep-reading" className="border-t-2 border-sb-ink bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 id="keep-reading" className="font-manrope text-3xl font-extrabold tracking-tight text-sb-ink sm:text-4xl">
                  Keep reading
                </h2>
                <a href={BLOG_BASE} className="inline-flex items-center gap-1 font-manrope font-extrabold text-sb-violet hover:underline">
                  All blogs <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {more.map((b) => (
                  <BlogCard key={b.slug} post={b} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <FinalCTA />
        <SBFooter />
      </div>
    </MotionConfig>
  );
}
