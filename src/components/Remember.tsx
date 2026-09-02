import { useRef } from "react";
import { motion, useInView } from "motion/react";

/**
 * The sticky-note drawing SR made for her before she left Mysuru for the
 * holidays. Sits where the drawn heart used to be.
 */
export default function Remember() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto w-full max-w-3xl px-5 py-20 sm:py-28">
      <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9 }}
          className="min-w-0"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">A SMALL GESTURE</p>
          <h2 className="mt-4 font-hand text-4xl leading-tight text-accent sm:text-5xl">
            do u remember this?
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            SR drew this for her the day she was leaving Mysuru for the holidays - engineering
            classes shut, bags packed, hometown waiting. One sticky note, one winking Eevee, and a
            &ldquo;See ya soon!!&rdquo; that she kept.
          </p>
          <p className="mt-4 font-hand text-2xl text-candle-soft">
            some people give gifts. some people draw.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 6, scale: 0.92 }}
          animate={
            inView
              ? { opacity: 1, rotate: -2.5, scale: 1 }
              : { opacity: 0, rotate: 6, scale: 0.92 }
          }
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="frame-photo mx-auto w-full max-w-xs"
        >
          <img
            src="/media/sr-eevee.jpg"
            alt="A hand-drawn winking Eevee on a yellow sticky note, signed See ya soon"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full rounded-[1px]"
          />
          <p className="px-1 pb-1 pt-2 font-hand text-lg leading-tight text-night-deep">
            drawn by SR · &ldquo;See ya soon!!&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
