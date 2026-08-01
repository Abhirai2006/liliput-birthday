import { useRef } from "react";
import { motion, useInView } from "motion/react";
import PhotoFrame from "./PhotoFrame";
import { daaShots, usShot, type Shot } from "@/lib/media";

export function DaaSection({ onOpen }: { onOpen: (s: Shot) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8 }}
          className="text-4xl italic sm:text-5xl"
        >
          And then there's Daa
        </motion.h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Chiranth on the certificates. Daa everywhere else. The one who sits through her phone
          scrolling, her arguments and her nonsense, and shows up again the next day.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {daaShots.map((s, i) => (
          <PhotoFrame key={s.src} shot={s} index={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

export function UsSection({ onOpen }: { onOpen: (s: Shot) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto w-full max-w-5xl px-5 py-20 sm:py-28">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 4 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 2 } : { opacity: 0, y: 30, rotate: 4 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhotoFrame shot={usShot} index={1} onOpen={onOpen} />
        </motion.div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">Pappa &amp; Lilliput</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            You call me Pappa.
            <span className="block italic text-accent">I call you Lilliput.</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              You started it. Because I asked whether you ate, whether you reached, whether you slept,
              whether the person who upset you was going to get away with it.
            </p>
            <p>
              I kept the other name going because you are five feet of trouble and it's the easiest way
              to annoy you. Both names stuck. Both names mean the same thing.
            </p>
            <p className="font-hand text-2xl text-candle-soft">
              Whatever you're calling me — I'm not going anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
