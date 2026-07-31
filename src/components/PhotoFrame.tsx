import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { Shot } from "@/lib/media";

/**
 * A polaroid-style frame. Photos keep their natural aspect ratio — nothing is
 * squashed or cropped by CSS; the tilt is the only decoration.
 */
export default function PhotoFrame({
  shot,
  index = 0,
  onOpen,
}: {
  shot: Shot;
  index?: number;
  onOpen?: (shot: Shot) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const tilt = ((index % 5) - 2) * 1.6;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen?.(shot)}
      initial={{ opacity: 0, y: 40, rotate: tilt * 2.2, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, rotate: tilt, scale: 1 } : undefined}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
      className="frame-photo group block w-full cursor-zoom-in text-left"
    >
      <div className="overflow-hidden rounded-[1px] bg-night-deep">
        {shot.kind === "video" ? (
          <video
            src={shot.src}
            className="block h-auto w-full"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={shot.src}
            alt={shot.caption}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        )}
      </div>
      <p className="px-1 pb-1 pt-2 font-hand text-lg leading-tight text-night-deep">
        {shot.caption}
      </p>
    </motion.button>
  );
}
