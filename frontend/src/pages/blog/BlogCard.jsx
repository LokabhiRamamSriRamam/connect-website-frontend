import { ArrowRight, Clock3 } from "lucide-react";
import { COVERS } from "./art/covers";
import { blogPath } from "./meta";

/* Card for one blog — used on the landing page, /blogs and "Keep reading". */
export default function BlogCard({ post, headingLevel = 3, featured = false, className = "" }) {
  const Cover = COVERS[post.slug];
  const H = `h${headingLevel}`;
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border-2 border-sb-ink bg-white shadow-[6px_6px_0_#191919] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--card-accent)] ${
        featured ? "lg:flex-row" : ""
      } ${className}`}
      style={{ "--card-accent": post.accent }}
    >
      <div
        className={`relative m-2 overflow-hidden rounded-[20px] border-2 border-sb-ink ${featured ? "aspect-video lg:m-3 lg:aspect-auto lg:w-[58%]" : "aspect-video"}`}
        style={{ background: post.tint }}
      >
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
          <Cover />
        </div>
        <span
          className="absolute left-3 top-3 rounded-full border-2 border-sb-ink px-3 py-1 font-manrope text-[11px] font-extrabold uppercase tracking-[0.12em] text-white shadow-[2px_2px_0_#191919]"
          style={{ background: post.accent }}
        >
          {post.category}
        </span>
      </div>
      <div className={`flex flex-1 flex-col px-5 pb-6 pt-3 font-manrope ${featured ? "lg:justify-center lg:px-8" : ""}`}>
        <H className={`font-extrabold leading-snug tracking-tight text-sb-ink ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <a href={blogPath(post.slug)} className="after:absolute after:inset-0 focus:outline-none focus-visible:underline">
            {post.title}
          </a>
        </H>
        <p className={`mt-3 text-sb-slate ${featured ? "text-base sm:text-lg" : "text-[15px]"} leading-relaxed`}>{post.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm font-bold">
          <span className="inline-flex items-center gap-1.5 text-sb-muted">
            <Clock3 size={15} aria-hidden="true" /> {post.readMins} min read
          </span>
          <span className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-1" style={{ color: post.accent }} aria-hidden="true">
            Read <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
