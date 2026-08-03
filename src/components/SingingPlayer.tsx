import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { songs } from "@/lib/media";

/**
 * "Her voice" — the ten recordings of her singing, in one small player.
 * Only one <audio> element; tapping a track swaps the source.
 */
export default function SingingPlayer() {
  const ref = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    const track = current === null ? undefined : songs[current];
    if (!el || !track) return;
    el.src = track.src;
    el.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [current]);


  const toggle = (i: number) => {
    const el = audioRef.current;
    if (current === i && el) {
      if (el.paused) {
        el.play();
        setPlaying(true);
      } else {
        el.pause();
        setPlaying(false);
      }
      return;
    }
    setCurrent(i);
  };

  return (
    <section ref={ref} className="mx-auto w-full max-w-3xl px-5 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
        transition={{ duration: 0.9 }}
        className="text-center"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">her actual voice</p>
        <h2 className="mt-4 text-4xl italic sm:text-5xl">Eight recordings</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          She sends these at odd hours, sings half a Kannada song, then says it wasn't good. It was
          good. They're all here now, so she can't argue.
        </p>
      </motion.div>

      <div className="mt-12 space-y-2">
        {songs.map((s, i) => {
          const active = current === i;
          return (
            <motion.button
              key={s.src}
              type="button"
              onClick={() => toggle(i)}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-colors ${
                active
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-card/30 hover:border-primary/30"
              }`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xs ${
                  active ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
                aria-hidden
              >
                {active && playing ? "❚❚" : "▶"}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-foreground sm:text-base">{s.title}</span>
                <span className="mt-1 flex h-3 items-end gap-[3px]" aria-hidden>
                  {Array.from({ length: 18 }).map((_, b) => (
                    <span
                      key={b}
                      className={`w-[3px] rounded-sm ${active && playing ? "bg-primary" : "bg-border"}`}
                      style={{
                        height: active && playing ? undefined : `${4 + ((b * 7) % 9)}px`,
                        animation:
                          active && playing
                            ? `flicker ${0.6 + ((b % 5) * 0.13)}s ease-in-out ${b * 0.04}s infinite alternate`
                            : undefined,
                        ...(active && playing ? { height: `${5 + ((b * 5) % 11)}px` } : null),
                      }}
                    />
                  ))}
                </span>
              </span>

              <span className="shrink-0 font-hand text-xl text-candle-soft">{s.len}</span>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-8 text-center font-hand text-2xl text-muted-foreground">
        turn the volume up, lilliput — this one's you
      </p>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} onEnded={() => setPlaying(false)} preload="none" />
    </section>
  );
}
