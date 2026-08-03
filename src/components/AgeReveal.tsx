import { useRef } from "react";
import { motion, useInView } from "motion/react";

/**
 * "Age reveal" moment, borrowed from the reel he sent me:
 * 20 crosses itself out, 21 lands with a flash of sparks.
 */
export default function AgeReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const sparks = Array.from({ length: 16 });

  return (
    <section
      ref={ref}
      className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center sm:py-32"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[0.65rem] uppercase tracking-[0.45em] text-primary"
      >
        age reveal
      </motion.p>

      <div className="relative mt-8 flex h-[190px] w-full items-center justify-center sm:h-[240px]">
        {/* the year she's leaving behind */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={
            inView
              ? { opacity: [0, 1, 1, 0], y: [20, 0, 0, -34], scale: [0.9, 1, 1, 0.8] }
              : { opacity: 0 }
          }
          transition={{ duration: 2.1, times: [0, 0.2, 0.6, 1] }}
          className="absolute font-display text-[5.5rem] leading-none text-muted-foreground/50 sm:text-[7rem]"
          aria-hidden
        >
          20
        </motion.span>

        {/* sparks */}
        {sparks.map((_, i) => {
          const angle = (i / sparks.length) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              aria-hidden
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={
                inView
                  ? {
                      opacity: [0, 1, 0],
                      x: Math.cos(angle) * (110 + (i % 4) * 22),
                      y: Math.sin(angle) * (110 + (i % 3) * 20),
                      scale: [0.4, 1, 0.2],
                    }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.4, delay: 1.5 + (i % 5) * 0.05 }}
              className="absolute h-1.5 w-1.5 rounded-full bg-primary"
            />
          );
        })}

        <motion.span
          initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
          animate={
            inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4, rotate: -12 }
          }
          transition={{ delay: 1.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-glow font-display text-[7.5rem] leading-none text-primary sm:text-[10rem]"
        >
          21
        </motion.span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ delay: 2.1, duration: 0.9 }}
        className="mt-4 max-w-md font-hand text-2xl text-candle-soft sm:text-3xl"
      >
        twenty-one, and still the shortest person in every photo
      </motion.p>
    </section>
  );
}
