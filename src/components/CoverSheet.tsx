import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A wrapping-paper sheet laid over the whole page.
 *
 * It is a real cloth: a grid of point masses joined by springs, integrated with
 * Verlet steps under gravity. Dragging a finger or the mouse across it snaps the
 * springs it passes through, so the paper tears along the path, the loose strips
 * swing on the remaining links and then fall off the screen.
 *
 * Physics, in order, every frame:
 *  1. gravity + a little wind
 *  2. Verlet position integration with velocity damping
 *  3. spring relaxation (several passes) — springs over their break length snap
 *  4. pinned points held at the top edge until the sheet is mostly torn
 */
export default function CoverSheet({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setGone(true);
    window.setTimeout(onDone, 900);
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;

    /* ── the paper itself, drawn once into an offscreen canvas ── */
    const paper = document.createElement("canvas");
    const drawPaper = () => {
      paper.width = W;
      paper.height = H;
      const p = paper.getContext("2d");
      if (!p) return;
      const g = p.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#2b1633");
      g.addColorStop(0.45, "#5c2140");
      g.addColorStop(1, "#8d3550");
      p.fillStyle = g;
      p.fillRect(0, 0, W, H);

      // confetti dots + tiny sparks
      for (let i = 0; i < Math.round((W * H) / 5200); i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const r = 1 + Math.random() * 3.2;
        p.globalAlpha = 0.18 + Math.random() * 0.4;
        p.fillStyle = ["#ffd27a", "#ffb0c4", "#fff6ec", "#e97ba0"][i % 4]!;
        p.beginPath();
        p.arc(x, y, r, 0, Math.PI * 2);
        p.fill();
      }
      p.globalAlpha = 1;

      // ribbon
      const band = Math.max(38, Math.min(W, H) * 0.075);
      p.fillStyle = "rgba(255, 210, 122, 0.16)";
      p.fillRect(W / 2 - band / 2, 0, band, H);
      p.fillRect(0, H / 2 - band / 2, W, band);
      p.strokeStyle = "rgba(255, 210, 122, 0.35)";
      p.lineWidth = 1.5;
      p.strokeRect(W / 2 - band / 2, 0, band, H);
      p.strokeRect(0, H / 2 - band / 2, W, band);

      // words
      const scale = Math.min(W, H);
      p.textAlign = "center";
      p.fillStyle = "rgba(255, 246, 236, 0.92)";
      p.font = `600 ${Math.round(scale * 0.028)}px ui-sans-serif, system-ui, sans-serif`;
      p.fillText("18 SEPTEMBER", W / 2, H / 2 - scale * 0.14);
      p.font = `italic ${Math.round(scale * 0.115)}px Georgia, "Times New Roman", serif`;
      p.fillStyle = "#ffd9a8";
      p.fillText("Happy Birthday", W / 2, H / 2 - scale * 0.03);
      p.fillStyle = "#ffb0c4";
      p.fillText("Subbi", W / 2, H / 2 + scale * 0.09);
      p.fillStyle = "rgba(255, 246, 236, 0.68)";
      p.font = `500 ${Math.round(scale * 0.026)}px ui-sans-serif, system-ui, sans-serif`;
      p.fillText("drag your finger across — tear it open", W / 2, H / 2 + scale * 0.2);
    };

    /* ── cloth ── */
    type Pt = { x: number; y: number; px: number; py: number; pin: boolean };
    type Sp = { a: number; b: number; len: number; on: boolean; dir: 0 | 1 };

    let cols = 0;
    let rows = 0;
    let pts: Pt[] = [];
    let sps: Sp[] = [];
    let spacing = 0;
    let broken = 0;
    let released = false;
    // per-cell edge flags, so drawing never has to scan the spring list
    let rightOn = new Uint8Array(0);
    let downOn = new Uint8Array(0);

    const build = () => {
      spacing = Math.max(22, Math.min(W, H) / 26);
      cols = Math.ceil(W / spacing) + 1;
      rows = Math.ceil(H / spacing) + 1;
      pts = [];
      sps = [];
      rightOn = new Uint8Array(cols * rows).fill(1);
      downOn = new Uint8Array(cols * rows).fill(1);
      broken = 0;
      released = false;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = (x * W) / (cols - 1);
          const py = (y * H) / (rows - 1);
          pts.push({ x: px, y: py, px, py, pin: y === 0 });
        }
      }
      const idx = (x: number, y: number) => y * cols + x;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (x < cols - 1) {
            const a = idx(x, y);
            const b = idx(x + 1, y);
            sps.push({ a, b, len: Math.hypot(pts[b]!.x - pts[a]!.x, pts[b]!.y - pts[a]!.y), on: true, dir: 0 });
          }
          if (y < rows - 1) {
            const a = idx(x, y);
            const b = idx(x, y + 1);
            sps.push({ a, b, len: Math.hypot(pts[b]!.x - pts[a]!.x, pts[b]!.y - pts[a]!.y), on: true, dir: 1 });
          }
        }
      }
    };

    const snap = (s: Sp) => {
      s.on = false;
      broken++;
      if (s.dir === 0) rightOn[s.a] = 0;
      else downOn[s.a] = 0;
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawPaper();
      build();
    };
    resize();

    /* ── pointer: tearing + dragging ── */
    let down = false;
    let mx = -1;
    let my = -1;
    let lastX = -1;
    let lastY = -1;
    let held = -1;
    const TEAR = Math.max(26, spacing * 1.15);

    const totalSprings = () => sps.length || 1;

    const cut = (x0: number, y0: number, x1: number, y1: number) => {
      const r = TEAR;
      for (const s of sps) {
        if (!s.on) continue;
        const a = pts[s.a]!;
        const b = pts[s.b]!;
        const cxm = (a.x + b.x) / 2;
        const cym = (a.y + b.y) / 2;
        // distance from spring midpoint to the swipe segment
        const dx = x1 - x0;
        const dy = y1 - y0;
        const l2 = dx * dx + dy * dy || 1;
        let t = ((cxm - x0) * dx + (cym - y0) * dy) / l2;
        t = Math.max(0, Math.min(1, t));
        const d = Math.hypot(cxm - (x0 + t * dx), cym - (y0 + t * dy));
        if (d < r) snap(s);
      }
      if (!released && broken / totalSprings() > 0.34) {
        released = true;
        for (const p of pts) p.pin = false;
      }
    };

    const nearest = (x: number, y: number) => {
      let best = -1;
      let bd = spacing * 1.4;
      for (let i = 0; i < pts.length; i++) {
        const d = Math.hypot(pts[i]!.x - x, pts[i]!.y - y);
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return best;
    };

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onDown = (e: PointerEvent) => {
      const { x, y } = pos(e);
      down = true;
      mx = lastX = x;
      my = lastY = y;
      held = nearest(x, y);
      canvas.setPointerCapture(e.pointerId);
      cut(x, y, x, y);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const { x, y } = pos(e);
      mx = x;
      my = y;
      cut(lastX, lastY, x, y);
      lastX = x;
      lastY = y;
    };
    const onUp = () => {
      down = false;
      held = -1;
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    window.addEventListener("resize", resize);

    /* ── simulation + render ── */
    const GRAV = 1400;
    const DAMP = 0.985;
    let raf = 0;
    let last = performance.now();

    const step = (dt: number) => {
      const wind = Math.sin(performance.now() / 700) * 30;
      for (const p of pts) {
        if (p.pin) {
          p.px = p.x;
          p.py = p.y;
          continue;
        }
        const vx = (p.x - p.px) * DAMP;
        const vy = (p.y - p.py) * DAMP;
        p.px = p.x;
        p.py = p.y;
        p.x += vx + wind * dt * dt;
        p.y += vy + GRAV * dt * dt;
      }
      if (down && held >= 0) {
        const p = pts[held]!;
        p.x = mx;
        p.y = my;
        p.px = mx;
        p.py = my;
      }
      for (let k = 0; k < 3; k++) {
        for (const s of sps) {
          if (!s.on) continue;
          const a = pts[s.a]!;
          const b = pts[s.b]!;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          if (d > s.len * 3.4) {
            snap(s);
            continue;
          }
          const diff = (d - s.len) / d / 2;
          const ox = dx * diff;
          const oy = dy * diff;
          if (!a.pin) {
            a.x += ox;
            a.y += oy;
          }
          if (!b.pin) {
            b.x -= ox;
            b.y -= oy;
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cw = W / (cols - 1);
      const ch = H / (rows - 1);
      const idx = (x: number, y: number) => y * cols + x;
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const i0 = idx(x, y);
          const i1 = idx(x + 1, y);
          const i2 = idx(x, y + 1);
          // a cell only exists while its top and left edges hold
          if (!rightOn[i0] || !downOn[i0]) continue;
          const p0 = pts[i0]!;
          const p1 = pts[i1]!;
          const p2 = pts[i2]!;
          const ax = (p1.x - p0.x) / cw;
          const ay = (p1.y - p0.y) / cw;
          const bx = (p2.x - p0.x) / ch;
          const by = (p2.y - p0.y) / ch;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p1.x + bx * ch, p1.y + by * ch);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();
          ctx.clip();
          ctx.transform(ax, ay, bx, by, p0.x - (ax * x * cw + bx * y * ch), p0.y - (ay * x * cw + by * y * ch));
          ctx.drawImage(paper, 0, 0);
          ctx.restore();
        }
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      step(dt);
      draw();

      // gone once nearly everything has torn or fallen past the bottom
      const off = pts.reduce((n, p) => n + (p.y > H + 120 ? 1 : 0), 0);
      if (broken / totalSprings() > 0.7 || off / pts.length > 0.72) {
        finish();
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", resize);
    };
  }, [finish]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-[900ms] ${gone ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full touch-none" />
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground backdrop-blur"
      >
        skip
      </button>
    </div>
  );
}
