import { useEffect } from "react";
import { motion } from "motion/react";
import type { Shot } from "@/lib/media";

export default function Lightbox({ shot, onClose }: { shot: Shot | null; onClose: () => void }) {
  useEffect(() => {
    if (!shot) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [shot, onClose]);

  if (!shot) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-night-deep/92 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="max-h-full w-full max-w-lg text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {shot.kind === "video" ? (
          <video
            src={shot.src}
            className="mx-auto max-h-[74vh] w-auto rounded-md"
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        ) : (
          <img
            src={shot.src}
            alt={shot.caption}
            className="mx-auto max-h-[74vh] w-auto rounded-md"
          />
        )}
        <p className="mt-4 font-hand text-2xl text-candle-soft">{shot.caption}</p>
        <button
          onClick={onClose}
          className="mt-5 rounded-full border border-border px-5 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
        >
          close
        </button>
      </motion.div>
    </motion.div>
  );
}
