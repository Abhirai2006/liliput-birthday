import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; sp: number };

/** Lightweight canvas star field with a slow parallax drift. */
export default function StarField({ density = 1, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((canvas.offsetWidth * canvas.offsetHeight) / 9000) * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: Math.random() * 1.3 + 0.3,
        a: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.6 + 0.2,
      }));
    };

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const s of stars) {
        const twinkle = reduce ? 0.7 : 0.45 + 0.55 * Math.abs(Math.sin(s.a + t * s.sp));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 246, 224, ${twinkle * 0.9})`;
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none h-full w-full ${className}`} />;
}
