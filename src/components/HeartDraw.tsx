import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const COLORS = [
  "#ff4d5e",
  "#4d7cff",
  "#4dff88",
  "#ffe14d",
  "#4de1ff",
  "#ff4dea",
  "#ffa14d",
  "#ff9ecb",
];

const RAYS = 120;

/** A turtle-graphics style heart, drawn ray by ray on a canvas. */
export default function HeartDraw() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrap, { once: true, margin: "-120px" });
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const scale = Math.min(w / 40, h / 40);
    const cx = w / 2;
    const cy = h / 2 + 4 * scale;
    const origin = { x: cx, y: cy - 40 * (scale / 15) * 0.0 - 40 * 0 }; // centre of the rays
    origin.y = cy - 40 * (scale / 15) * 0 - 0;
    // rays radiate from a point slightly above the heart's centre
    const ox = cx;
    const oy = cy - 40 * (scale / 15) * 0 - 12 * (scale / 15) * 0 - 0.28 * h * 0;

    const point = (i: number) => {
      const a = (i * Math.PI * 2) / RAYS;
      const x = 16 * Math.sin(a) ** 3 * (scale / 1.05);
      const y =
        (13 * Math.cos(a) -
          5 * Math.cos(2 * a) -
          2 * Math.cos(3 * a) -
          Math.cos(4 * a)) *
        (scale / 1.05);
      return { x: cx + x, y: cy - y };
    };

    let i = 0;
    let raf = 0;

    const star = (x: number, y: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      for (let k = 0; k < 8; k++) {
        const a = (k * Math.PI * 2) / 8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(a) * 6, y + Math.sin(a) * 6);
        ctx.stroke();
      }
    };

    const drawRay = (n: number) => {
      const p = point(n);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ox, oy || cy - 0);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      star(p.x, p.y, color);
    };

    if (reduce) {
      for (let n = 0; n < RAYS; n++) drawRay(n);
      return;
    }

    const step = () => {
      for (let k = 0; k < 2 && i < RAYS; k++, i++) drawRay(i);
      if (i < RAYS) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, replay]);

  return (
    <section ref={wrap} className="mx-auto w-full max-w-2xl px-5 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9 }}
        className="overflow-hidden rounded-2xl border border-border bg-card/40 p-6 text-center backdrop-blur-sm sm:p-9"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">
          drawn line by line
        </p>
        <h2 className="mt-3 text-3xl italic sm:text-4xl">one more thing</h2>
        <canvas
          ref={canvas}
          aria-label="An animated multicoloured heart drawn ray by ray"
          className="mx-auto mt-4 h-[300px] w-full max-w-[420px] sm:h-[380px]"
        />
        <p className="font-hand text-2xl text-candle-soft">
          120 lines, all of them pointing at the same girl
        </p>
        <button
          type="button"
          onClick={() => setReplay((r) => r + 1)}
          className="mt-6 rounded-full border border-border px-5 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
        >
          draw it again
        </button>
      </motion.div>
    </section>
  );
}
