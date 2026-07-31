import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import StarField from "./StarField";
import { msUntilBirthday, splitDuration } from "@/lib/birthday";

const UNITS = [
  { key: "days", label: "days" },
  { key: "hours", label: "hours" },
  { key: "minutes", label: "minutes" },
  { key: "seconds", label: "seconds" },
] as const;

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const left = msUntilBirthday();
      setMs(left);
      if (left <= 0) onUnlock();
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [onUnlock]);

  const parts = useMemo(() => splitDuration(ms ?? 0), [ms]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 -z-10">
        <StarField density={1.4} />
      </div>
      {/* moon glow */}
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--candle) 55%, transparent), transparent 70%)" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[0.7rem] uppercase tracking-[0.45em] text-muted-foreground"
      >
        Sealed until
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.15 }}
        className="mt-5 text-center text-5xl leading-[1.05] text-glow sm:text-7xl"
      >
        18 September
        <span className="block text-2xl text-primary sm:text-3xl">00:00 · IST</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.35 }}
        className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5"
      >
        {UNITS.map((u) => (
          <div
            key={u.key}
            className="min-w-[5.5rem] rounded-xl border border-border bg-card/50 px-5 py-4 text-center backdrop-blur-sm"
          >
            <div className="font-display text-4xl tabular-nums text-primary sm:text-5xl">
              {ms === null ? "--" : String(parts[u.key]).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
              {u.label}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="mt-14 max-w-md text-center"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          Something was made for a girl called Subbi. It refuses to open even one minute early,
          because some things are worth waiting for.
        </p>
        <p className="mt-6 font-hand text-2xl text-accent">come back at midnight, lilliput</p>
      </motion.div>
    </main>
  );
}
