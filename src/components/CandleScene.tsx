import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Text } from "@react-three/drei";
import {
  AdditiveBlending,
  CanvasTexture,
  Vector3,
  type Group,
  type Mesh,
  type PointLight,
} from "three";

/** Sum of sines — cheap, smooth, non-repeating flicker. */
function flicker(t: number, seed = 0) {
  return (
    Math.sin(t * 8.7 + seed) * 0.5 +
    Math.sin(t * 14.3 + seed * 2.1) * 0.3 +
    Math.sin(t * 23.1 + seed * 3.7) * 0.2
  );
}

/** Width of the slice taken out of the cake (radians), centred on +z (the front). */
const WEDGE = Math.PI / 5;
const CHOCOLATE = "#40200f";
const GANACHE = "#5a2d17";

/** Cylinder theta runs x = sin(t), z = cos(t); decorations were placed with x = cos(a), z = sin(a). */
function decorInWedge(a: number) {
  let d = Math.PI / 2 - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d) < WEDGE / 2 + 0.14;
}

/** The two flat radial faces exposed when a wedge is removed. */
function CutFaces({ radius, height, y }: { radius: number; height: number; y: number }) {
  return (
    <>
      {[WEDGE / 2, -WEDGE / 2].map((t, i) => (
        <group key={i} rotation={[0, t - Math.PI / 2, 0]}>
          <mesh position={[radius / 2, y, 0]}>
            <planeGeometry args={[radius, height]} />
            <meshStandardMaterial color={CHOCOLATE} roughness={0.55} side={2} />
          </mesh>
          {/* a darker ganache band through the middle of the sponge */}
          <mesh position={[radius / 2, y, 0.004]}>
            <planeGeometry args={[radius, height * 0.16]} />
            <meshStandardMaterial color={GANACHE} roughness={0.25} side={2} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Flame({ lit }: { lit: boolean }) {
  const core = useRef<Mesh>(null);
  const mid = useRef<Mesh>(null);
  const outer = useRef<Mesh>(null);
  const glow = useRef<Mesh>(null);
  const light = useRef<PointLight>(null);
  const grow = useRef(lit ? 1 : 0);

  const halo = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const rad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rad.addColorStop(0, "rgba(255,255,255,1)");
    rad.addColorStop(0.25, "rgba(255,190,110,0.55)");
    rad.addColorStop(0.6, "rgba(255,140,60,0.16)");
    rad.addColorStop(1, "rgba(255,120,40,0)");
    g.fillStyle = rad;
    g.fillRect(0, 0, 128, 128);
    const tex = new CanvasTexture(c);
    return tex;
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    // flame doesn't pop in/out — it grows and dies down
    const target = lit ? 1 : 0;
    grow.current += (target - grow.current) * Math.min(1, delta * (lit ? 6 : 9));
    const g = grow.current;

    const f = flicker(t);
    const lean = Math.sin(t * 1.9) * 0.05 + f * 0.012;
    const stretch = 1 + f * 0.14;

    if (outer.current) {
      outer.current.scale.set(g * (0.85 - f * 0.03), g * stretch, g * (0.85 - f * 0.03));
      outer.current.position.x = lean;
      outer.current.rotation.z = -lean * 1.6;
    }
    if (mid.current) {
      const f2 = flicker(t, 1.3);
      mid.current.scale.set(g * (0.62 + f2 * 0.03), g * (0.92 + f2 * 0.1), g * (0.62 + f2 * 0.03));
      mid.current.position.x = lean * 0.7;
      mid.current.rotation.z = -lean;
    }
    if (core.current) {
      core.current.scale.setScalar(g * (0.42 + flicker(t, 2.6) * 0.04));
      core.current.position.x = lean * 0.4;
    }
    if (glow.current) {
      const s = g * (1 + f * 0.08);
      glow.current.scale.set(s, s, s);
      (glow.current.material as { opacity: number }).opacity = g * (0.45 + f * 0.1);
    }
    if (light.current) {
      light.current.intensity = g * (7 + f * 2.4);
      light.current.position.x = lean;
    }
  });

  return (
    <group position={[0, 1.6, 0]}>
      {/* soft halo — a radial-gradient sprite, so it fades out instead of ending in an edge */}
      <mesh ref={glow} position={[0, 0.08, 0]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshBasicMaterial
          map={halo}
          color="#ffa544"
          transparent
          opacity={0.5}
          blending={AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
        />
      </mesh>
      {/* outer envelope */}
      <mesh ref={outer} position={[0, 0.1, 0]}>
        <coneGeometry args={[0.09, 0.34, 24, 1, false]} />
        <meshBasicMaterial
          color="#ff7a18"
          transparent
          opacity={0.55}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* yellow body */}
      <mesh ref={mid} position={[0, 0.07, 0]}>
        <coneGeometry args={[0.075, 0.26, 24, 1, false]} />
        <meshBasicMaterial
          color="#ffd166"
          transparent
          opacity={0.85}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* white-hot core with the blue base */}
      <mesh ref={core} position={[0, 0.03, 0]}>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshBasicMaterial color="#fffbe8" toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.02, 0]} scale={lit ? 1 : 0.001}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial
          color="#5fa8ff"
          transparent
          opacity={0.5}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={light} color="#ffb45e" distance={8} decay={2} />
      {lit && (
        <Sparkles count={14} scale={[0.35, 0.9, 0.35]} size={1.4} speed={0.9} noise={2} color="#ffb14d" />
      )}
    </group>
  );
}

function Greeting() {
  const common = useMemo(
    () => ({ font: "/fonts/GreatVibes-Regular.ttf", anchorX: "center" as const, anchorY: "middle" as const }),
    [],
  );
  return (
    <group position={[0, 0.38, 1.34]}>
      <Text {...common} position={[0, 0.13, 0]} fontSize={0.16} color="#fff6ec" outlineWidth={0.004} outlineColor="#d9557a">
        Happy Birthday
      </Text>
      <Text {...common} position={[0, -0.14, 0]} fontSize={0.24} color="#ffd9a8" outlineWidth={0.004} outlineColor="#d9557a">
        Aishu
      </Text>
    </group>
  );
}

/** Chocolate running out of the cut, plus a slowly spreading pool on the plate. */
function Slurry({ active }: { active: boolean }) {
  const drops = useRef<(Mesh | null)[]>([]);
  const pool = useRef<Mesh>(null);
  const started = useRef(0);

  const seeds = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        x: (((i * 37) % 11) / 11 - 0.5) * 0.3,
        z: 0.55 + (((i * 53) % 7) / 7) * 0.6,
        speed: 0.42 + ((i * 17) % 6) * 0.05,
        phase: ((i * 29) % 10) / 10,
        r: 0.036 + ((i * 13) % 4) * 0.008,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!active) return;
    const t = clock.getElapsedTime();
    if (!started.current) started.current = t;
    const age = t - started.current;
    const flow = age < 2.6 ? 1 : Math.max(0.35, 1 - (age - 2.6) * 0.25);

    drops.current.forEach((m, i) => {
      if (!m) return;
      const s = seeds[i]!;
      const local = (t * s.speed + s.phase) % 1;
      m.position.y = 1.2 - local * 1.28;
      m.scale.setScalar(Math.max(0.25, (1.05 - local * 0.55) * flow));
      m.visible = age > i * 0.045;
    });

    if (pool.current) {
      const grow = Math.min(1, age / 3.4);
      pool.current.scale.set(0.35 + grow * 0.85, 1, 0.35 + grow * 0.85);
    }
  });

  if (!active) return null;

  return (
    <group>
      {seeds.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            drops.current[i] = el;
          }}
          position={[s.x, 1.2, s.z]}
        >
          <sphereGeometry args={[s.r, 12, 12]} />
          <meshStandardMaterial color={GANACHE} roughness={0.18} metalness={0.08} />
        </mesh>
      ))}
      {/* pool on the plate */}
      <mesh ref={pool} position={[0, -0.02, 0.75]}>
        <cylinderGeometry args={[0.42, 0.42, 0.03, 32]} />
        <meshStandardMaterial color={CHOCOLATE} roughness={0.15} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Cake({ lit, cut, onTap }: { lit: boolean; cut: boolean; onTap: () => void }) {
  const group = useRef<Group>(null);
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    if (cut) {
      // hold still once she's cutting, so the slice comes out cleanly
      group.current.rotation.y += (0 - group.current.rotation.y) * Math.min(1, delta * 3);
    } else {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.32) * 0.5;
    }
  });

  const thetaStart = cut ? WEDGE / 2 : 0;
  const thetaLength = cut ? Math.PI * 2 - WEDGE : Math.PI * 2;

  // berries scattered on the bottom tier's top surface
  const berries = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return { pos: [Math.cos(a) * 1.02, 0.78, Math.sin(a) * 1.02] as const, a };
      }),
    [],
  );

  // piped cream rosettes around the bottom tier's rim
  const rosettes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return { pos: [Math.cos(a) * 1.3, 0.8, Math.sin(a) * 1.3] as const, a };
      }),
    [],
  );

  // icing drips running down the top tier's sides
  const drips = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const a = (i / 11) * Math.PI * 2 + 0.15;
        const r = 0.87;
        const len = 0.14 + ((i * 7) % 5) * 0.05; // 0.14 .. 0.34
        return { x: Math.cos(a) * r, z: Math.sin(a) * r, len, key: i, a };
      }),
    [],
  );

  // berries around the top tier's rim
  const topBerries = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return { pos: [Math.cos(a) * 0.82, 1.36, Math.sin(a) * 0.82] as const, a };
      }),
    [],
  );

  // colourful sprinkles scattered across both tiers' tops
  const sprinkles = useMemo(() => {
    const palette = ["#d9557a", "#ffd27a", "#9bd2ff", "#c4a6ff", "#8fe6b4", "#fff6ec"] as const;
    const out: { pos: [number, number, number]; rot: [number, number, number]; color: string; a: number }[] = [];
    let seed = 7;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 26; i++) {
      const onTop = rnd() > 0.5;
      const r = rnd() * (onTop ? 0.7 : 1.15);
      const a = rnd() * Math.PI * 2;
      const y = onTop ? 1.31 : 0.73;
      out.push({
        pos: [Math.cos(a) * r, y, Math.sin(a) * r],
        rot: [rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI],
        color: palette[i % palette.length]!,
        a,
      });
    }
    return out;
  }, []);

  // little sugar flowers around the base of the plate
  const baseFlowers = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2 + 0.3;
        const palette = ["#ffd9a8", "#ffb0c4", "#c4a6ff", "#9bd2ff", "#8fe6b4"] as const;
        return {
          x: Math.cos(a) * 1.5,
          z: Math.sin(a) * 1.5,
          color: palette[i % palette.length]!,
          key: i,
        };
      }),
    [],
  );

  const keep = (a: number) => !cut || !decorInWedge(a);

  return (
    <group ref={group} position={[0, -0.7, 0]} onPointerDown={onTap}>
      {/* plate */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <cylinderGeometry args={[1.65, 1.7, 0.08, 64]} />
        <meshStandardMaterial color="#e8e2f2" metalness={0.35} roughness={0.35} />
      </mesh>

      {/* sugar flowers around the base */}
      {baseFlowers.map((f) => (
        <group key={`f-${f.key}`} position={[f.x, -0.02, f.z]}>
          {[0, 1, 2, 3, 4].map((p) => {
            const a = (p / 5) * Math.PI * 2;
            return (
              <mesh key={p} position={[Math.cos(a) * 0.06, 0, Math.sin(a) * 0.06]}>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial color={f.color} roughness={0.4} />
              </mesh>
            );
          })}
          <mesh>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#ffe27a" roughness={0.35} />
          </mesh>
        </group>
      ))}

      {/* chocolate inside — only ever seen through the cut */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[1.24, 1.29, 0.71, 48]} />
        <meshStandardMaterial color={CHOCOLATE} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.77, 0.85, 0.55, 48]} />
        <meshStandardMaterial color={CHOCOLATE} roughness={0.5} />
      </mesh>

      {/* bottom tier */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[1.3, 1.35, 0.72, 64, 1, false, thetaStart, thetaLength]} />
        <meshStandardMaterial color="#f7d9e3" roughness={0.6} side={2} />
      </mesh>
      {cut && <CutFaces radius={1.32} height={0.72} y={0.32} />}
      {/* cream ring */}
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.09, 16, 64, cut ? Math.PI * 2 - WEDGE : Math.PI * 2]} />
        <meshStandardMaterial color="#fff6ec" roughness={0.4} />
      </mesh>
      {/* piped rosettes */}
      {rosettes.filter((r) => keep(r.a)).map((r, i) => (
        <group key={`r-${i}`} position={[r.pos[0], r.pos[1], r.pos[2]]}>
          <mesh>
            <coneGeometry args={[0.085, 0.14, 12]} />
            <meshStandardMaterial color="#fff6ec" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.075, 14, 14]} />
            <meshStandardMaterial color="#fff6ec" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* top tier */}
      <mesh position={[0, 1.02, 0]} castShadow>
        <cylinderGeometry args={[0.82, 0.9, 0.56, 64, 1, false, thetaStart, thetaLength]} />
        <meshStandardMaterial color="#f2c3d6" roughness={0.6} side={2} />
      </mesh>
      {cut && <CutFaces radius={0.86} height={0.56} y={1.02} />}
      {/* icing drips down the top tier */}
      {drips.filter((d) => keep(d.a)).map((d) => (
        <group key={`d-${d.key}`} position={[d.x, 1.24 - d.len / 2, d.z]}>
          <mesh>
            <cylinderGeometry args={[0.045, 0.03, d.len, 12]} />
            <meshStandardMaterial color="#fff6ec" roughness={0.4} />
          </mesh>
          <mesh position={[0, -d.len / 2, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#fff6ec" roughness={0.4} />
          </mesh>
        </group>
      ))}
      {/* top cream ring */}
      <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.07, 16, 64, cut ? Math.PI * 2 - WEDGE : Math.PI * 2]} />
        <meshStandardMaterial color="#fff6ec" roughness={0.4} />
      </mesh>
      {topBerries.filter((b) => keep(b.a)).map((b, i) => (
        <mesh key={`tb-${i}`} position={[b.pos[0], b.pos[1], b.pos[2]]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={i % 2 ? "#d9557a" : "#ffb0c4"} roughness={0.35} />
        </mesh>
      ))}

      {/* berries on the bottom tier */}
      {berries.filter((b) => keep(b.a)).map((b, i) => (
        <mesh key={`b-${i}`} position={[b.pos[0], b.pos[1] + 0.05, b.pos[2]]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={i % 2 ? "#d9557a" : "#ffb0c4"} roughness={0.35} />
        </mesh>
      ))}

      {/* sprinkles */}
      {sprinkles.filter((s) => keep(s.a)).map((s, i) => (
        <mesh key={`s-${i}`} position={s.pos} rotation={s.rot}>
          <capsuleGeometry args={[0.012, 0.05, 4, 8]} />
          <meshStandardMaterial color={s.color} roughness={0.4} />
        </mesh>
      ))}

      <Slurry active={cut} />

      {/* candle */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.44, 24]} />
        <meshStandardMaterial color="#fff3df" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
        <meshStandardMaterial color="#4a3a2a" />
      </mesh>
      <Greeting />
      <Flame lit={lit} />
      {lit && <Sparkles count={40} scale={[3.2, 2.4, 3.2]} size={2.4} speed={0.35} color="#ffd9a0" />}
    </group>
  );
}

/** The wedge she cut — flies out of the cake toward the screen. */
function Slice({ cut }: { cut: boolean }) {
  const g = useRef<Group>(null);
  const p = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!g.current || !cut) return;
    p.current = Math.min(1, p.current + delta / 1.5);
    const e = 1 - Math.pow(1 - p.current, 3);
    const t = clock.getElapsedTime();

    g.current.position.set(
      0 + Math.sin(t * 0.7) * 0.06 * e,
      -0.35 + e * 1.0 + Math.sin(t * 1.1) * 0.05 * e,
      1.0 + e * 2.35,
    );
    g.current.rotation.set(e * 0.22 + Math.sin(t * 0.6) * 0.05 * e, e * -0.5, Math.sin(t * 0.8) * 0.06 * e);
    const s = 1 + e * 0.5;
    g.current.scale.setScalar(s);
  });

  if (!cut) return null;

  return (
    <group ref={g} position={[0, -0.35, 1.0]}>
      {/* the wedge itself, both tiers */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[1.3, 1.35, 0.72, 24, 1, false, -WEDGE / 2, WEDGE]} />
        <meshStandardMaterial color="#f7d9e3" roughness={0.6} side={2} />
      </mesh>
      <mesh position={[0, 1.02, 0]} castShadow>
        <cylinderGeometry args={[0.82, 0.9, 0.56, 24, 1, false, -WEDGE / 2, WEDGE]} />
        <meshStandardMaterial color="#f2c3d6" roughness={0.6} side={2} />
      </mesh>
      {/* chocolate faces on both cut sides */}
      <CutFaces radius={1.32} height={0.72} y={0.32} />
      <CutFaces radius={0.86} height={0.56} y={1.02} />
      {/* a little cream and a berry so it reads as a slice, not a block */}
      <mesh position={[0, 0.7, 0.95]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#fff6ec" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.34, 0.6]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#d9557a" roughness={0.35} />
      </mesh>
      {/* ganache dripping off the front edge */}
      <mesh position={[0, 0.58, 1.0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color={GANACHE} roughness={0.18} metalness={0.08} />
      </mesh>
      <Sparkles count={16} scale={[1.2, 1.4, 1.2]} size={2} speed={0.4} color="#ffd9a0" />
    </group>
  );
}

/** A knife she can pick up with a finger or the cursor and drag into the cake. */
function Knife({
  cut,
  onCut,
  onDragChange,
}: {
  cut: boolean;
  onCut: () => void;
  onDragChange: (d: boolean) => void;
}) {
  const g = useRef<Group>(null);
  const target = useRef(new Vector3(2.35, -0.35, 1.3));
  const dragging = useRef(false);
  const { camera, pointer } = useThree();
  const tmp = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    if (!g.current) return;

    if (dragging.current) {
      // project the pointer onto the plane the knife lives on
      tmp.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
      const dist = (1.3 - camera.position.z) / tmp.z;
      target.current.copy(camera.position).addScaledVector(tmp, dist);
      target.current.y = Math.max(-1.4, Math.min(1.8, target.current.y));
    }

    const k = Math.min(1, delta * 12);
    g.current.position.lerp(target.current, k);
    const tilt = dragging.current ? -0.5 : -0.95;
    g.current.rotation.z += (tilt - g.current.rotation.z) * k;

    // close enough to the cake? that's a cut
    if (!cut && dragging.current) {
      const p = g.current.position;
      if (Math.hypot(p.x, p.z - 1.1) < 1.25 && p.y < 1.3) {
        onCut();
        dragging.current = false;
        onDragChange(false);
        target.current.set(2.35, -0.35, 1.3);
      }
    }
  });

  const grab = () => {
    if (cut) return;
    dragging.current = true;
    onDragChange(true);
    const release = () => {
      dragging.current = false;
      onDragChange(false);
      target.current.set(2.35, -0.35, 1.3);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  };

  return (
    <Float speed={cut ? 0.8 : 1.4} rotationIntensity={0.08} floatIntensity={cut ? 0.2 : 0.5}>
      <group ref={g} position={[2.35, -0.35, 1.3]} rotation={[0, 0, -0.95]} onPointerDown={grab}>
        {/* a fat invisible grab handle so fingers can find it */}
        <mesh visible={false}>
          <boxGeometry args={[0.7, 1.9, 0.7]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        {/* blade */}
        <mesh position={[0, 0.34, 0]}>
          <boxGeometry args={[0.13, 0.92, 0.02]} />
          <meshStandardMaterial color="#dfe6f0" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* tip */}
        <mesh position={[0, 0.92, 0]}>
          <coneGeometry args={[0.065, 0.24, 4]} />
          <meshStandardMaterial color="#eef3fa" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* bolster + handle */}
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[0.15, 0.1, 0.07]} />
          <meshStandardMaterial color="#cfd6e2" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <capsuleGeometry args={[0.06, 0.5, 6, 12]} />
          <meshStandardMaterial color="#5b3a2a" roughness={0.55} />
        </mesh>
      </group>
    </Float>
  );
}

export default function CandleScene({ lit, onBlow }: { lit: boolean; onBlow: () => void }) {
  const [hint, setHint] = useState(true);
  const [cut, setCut] = useState(false);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="relative h-[380px] w-full sm:h-[460px]">
      <Canvas camera={{ position: [0, 1.4, 5.2], fov: 42 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 5, 3]} intensity={0.5} />
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <Cake
              lit={lit}
              cut={cut}
              onTap={() => {
                setHint(false);
                if (lit) onBlow();
              }}
            />
          </Float>
          <Slice cut={cut} />
          <Knife
            cut={cut}
            onCut={() => {
              setHint(false);
              setCut(true);
            }}
            onDragChange={setDragging}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={!dragging}
            minPolarAngle={0.9}
            maxPolarAngle={1.5}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {cut
          ? "that slice is yours, lilliput"
          : lit && hint
            ? "tap the cake to blow it out · drag the knife into it"
            : "drag the knife into the cake"}
      </p>
    </div>
  );
}
