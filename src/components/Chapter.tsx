import { useRef } from "react";
import { motion, useInView } from "motion/react";
import PhotoFrame from "./PhotoFrame";
import type { Shot } from "@/lib/media";

export default function Chapter({
  title,
  note,
  shots,
  onOpen,
}: {
  title: string;
  note: string;
  shots: Shot[];
  onOpen: (shot: Shot) => void;
}) {
  const head = useRef<HTMLDivElement>(null);
  const inView = useInView(head, { once: true, margin: "-80px" });

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
      <div ref={head} className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8 }}
          className="text-4xl italic sm:text-5xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {note}
        </motion.p>
      </div>

      <div className="mt-14 columns-2 gap-4 sm:columns-3 sm:gap-6 lg:columns-4">
        {shots.map((shot, i) => (
          <div key={shot.src} className="mb-4 break-inside-avoid sm:mb-6">
            <PhotoFrame shot={shot} index={i} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  );
}
