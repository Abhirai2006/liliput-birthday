import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { idCard } from "@/lib/media";

const LINES = [
  "Aishwarya M Teli. Ganiger.",
  "Subbi to the people who love her.",
  "Lilliput to exactly one person, because five feet is five feet.",
  "And that one person she decided to call Pappa.",
];

export default function AboutHer({ onOpen }: { onOpen: (s: typeof idCard) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [revealed, setRevealed] = useState(false);

  return (
    <section ref={ref} className="mx-auto w-full max-w-5xl px-5 py-20 sm:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[0.65rem] uppercase tracking-[0.4em] text-primary"
          >
            The girl from Ainapur
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 text-4xl leading-tight sm:text-5xl"
          >
            Belgaum soil,
            <span className="block italic text-primary">north Karnataka heart.</span>
          </motion.h2>

          <div className="mt-8 space-y-3">
            {LINES.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.14 }}
                className="text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-9 rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              her worst habit
            </p>
            {revealed ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm leading-relaxed text-foreground"
              >
                She forgives people far too easily. People hurt her, and she hands the whole thing
                back like it never happened. It drives me mad. It is also, annoyingly, the best thing
                about her — 21 years in and the world hasn't managed to make her hard.
              </motion.p>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                className="mt-3 font-hand text-2xl text-accent underline decoration-dotted underline-offset-4"
              >
                you already know it, don't you? tap.
              </button>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: -1.5 } : { opacity: 0, scale: 0.94, rotate: 3 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="frame-photo cursor-zoom-in"
          onClick={() => onOpen(idCard)}
        >
          <img
            src={idCard.src}
            alt={idCard.caption}
            loading="lazy"
            className="block h-auto w-full rounded-[1px]"
          />
          <p className="px-1 pb-1 pt-2 font-hand text-lg leading-tight text-night-deep">
            {idCard.caption}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
