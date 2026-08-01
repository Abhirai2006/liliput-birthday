import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto w-full max-w-2xl px-5 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1 }}
        className="rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-sm sm:p-10"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">18 · 09 · 2005</p>
        <h2 className="mt-4 text-4xl italic sm:text-5xl">Happy 21st, Subbi</h2>
        <div className="mt-7 space-y-5 font-hand text-2xl leading-snug text-candle-soft sm:text-3xl">
          <p>
            Twenty-one years ago a girl was born in Ainapur who would grow up to sing sad songs under
            her breath, take four hundred mirror selfies before leaving the house, and forgive
            everybody who didn't deserve it.
          </p>
          <p>
            You never made a big deal out of being important to people. You just quietly became it.
          </p>
          <p>
            So here's a whole website full of you — every silly photo, every video I never deleted,
            every name we invented for each other. Built by the person who counts your birthdays like
            they're his own.
          </p>
          <p className="text-accent">Stay exactly this soft. I'll handle the rest.</p>
          <p className="text-right text-foreground">— Pappa</p>
        </div>
      </motion.div>
    </section>
  );
}
