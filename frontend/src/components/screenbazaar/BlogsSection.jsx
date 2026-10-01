import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BlogCard from "../../pages/blog/BlogCard";
import { BLOGS, BLOG_BASE } from "../../pages/blog/meta";
import { Sparkle } from "./Decor";
import "../../pages/blog/blog.css";

/* Landing page: latest blogs, directly after Testimonials. Hidden while there are no blogs. */
export default function BlogsSection() {
  if (!BLOGS.length) return null;
  const latest = BLOGS.slice(0, 3);
  return (
    <section id="blogs" aria-labelledby="blogs-heading" className="relative overflow-hidden border-t-2 border-sb-ink bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="relative max-w-2xl">
            <Sparkle size={22} color="#914BFA" className="absolute -top-7 right-0" />
            <span className="inline-flex rounded-full border-2 border-sb-ink bg-sb-gold px-4 py-1.5 font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink shadow-[3px_3px_0_#191919]">
              From the blog
            </span>
            <motion.h2
              id="blogs-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              className="mt-6 font-manrope text-4xl font-extrabold leading-tight tracking-tight text-sb-ink sm:text-5xl"
            >
              Ideas for screens that <span className="sb-gradient-text">pull their weight.</span>
            </motion.h2>
            <p className="mt-4 font-manrope text-lg font-semibold text-sb-slate">
              Practical guides on menu boards, multi-store campaigns, hardware and signage software.
            </p>
          </div>
          <a
            href={BLOG_BASE}
            className="inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-white px-6 py-3 font-manrope text-sm font-extrabold text-sb-ink shadow-[3px_3px_0_#191919] transition-transform hover:-translate-y-0.5"
          >
            See all blogs <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((b, i) => (
            <motion.div
              key={b.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 160, damping: 20 }}
              className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <BlogCard post={b} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
