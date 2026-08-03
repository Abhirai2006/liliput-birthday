import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { Shot } from "@/lib/media";

const TILTS: number[] = [-6, 4, -3, 7, -5, 3];

/**
 * Pinned polaroid wall — the scrapbook look from the reel he sent:
 * photos drop in one by one, each held by a little heart pin.
 */
export default function PolaroidWall({
  shots,
  onOpen,
}: {
  shots: Shot[];
  onOpen: (s: Shot) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto w-full max-w-5xl px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">the wall</p>
        <h2 className="mt-4 text-4xl italic sm:text-5xl">Pinned up, all of them</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          If I had a real wall instead of a website, this is exactly how it would look. Hearts
          holding up the corners and nothing arranged straight.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-8">
        {shots.map((s, i) => (
          <motion.button
            key={s.src}
            type="button"
            onClick={() => onOpen(s)}
            initial={{ opacity: 0, y: -40, rotate: 0 }}
            animate={
              inView
                ? { opacity: 1, y: 0, rotate: TILTS[i % TILTS.length] ?? 0 }
                : { opacity: 0, y: -40, rotate: 0 }
            }
            transition={{ duration: 0.8, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="group relative block rounded-sm bg-card p-2 pb-8 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.8)] ring-1 ring-border"
          >
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-lg text-accent drop-shadow"
            >
              ♥
            </span>
            <img
              src={s.src}
              alt={s.caption}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
            <span className="absolute bottom-1.5 left-0 right-0 truncate px-2 font-hand text-base text-muted-foreground">
              {s.caption}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
