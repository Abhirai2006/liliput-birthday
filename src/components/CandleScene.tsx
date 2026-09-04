import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Text } from "@react-three/drei";
import {
  AdditiveBlending,
  CanvasTexture,
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

/** Red velvet inside the tiers. */
const SPONGE = "#9c1f34";

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

function Cake({ lit, onTap }: { lit: boolean; onTap: () => void }) {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.32) * 0.5;
  });


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

      {/* red velvet inside — only ever seen through the cut */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[1.24, 1.29, 0.71, 48]} />
        <meshStandardMaterial color={SPONGE} roughness={0.65} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.77, 0.85, 0.55, 48]} />
        <meshStandardMaterial color={SPONGE} roughness={0.65} />
      </mesh>


      {/* bottom tier */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[1.3, 1.35, 0.72, 64]} />
        <meshStandardMaterial color="#f7d9e3" roughness={0.6} side={2} />
      </mesh>
      {/* cream ring */}
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.09, 16, 64]} />
        <meshStandardMaterial color="#fff6ec" roughness={0.4} />
      </mesh>

      {/* piped rosettes */}
      {rosettes.map((r, i) => (
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
        <cylinderGeometry args={[0.82, 0.9, 0.56, 64]} />
        <meshStandardMaterial color="#f2c3d6" roughness={0.6} side={2} />
      </mesh>
      {/* icing drips down the top tier */}
      {drips.map((d) => (
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
        <torusGeometry args={[0.82, 0.07, 16, 64]} />
        <meshStandardMaterial color="#fff6ec" roughness={0.4} />
      </mesh>

      {topBerries.map((b, i) => (
        <mesh key={`tb-${i}`} position={[b.pos[0], b.pos[1], b.pos[2]]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={i % 2 ? "#d9557a" : "#ffb0c4"} roughness={0.35} />
        </mesh>
      ))}

      {/* berries on the bottom tier */}
      {berries.map((b, i) => (
        <mesh key={`b-${i}`} position={[b.pos[0], b.pos[1] + 0.05, b.pos[2]]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={i % 2 ? "#d9557a" : "#ffb0c4"} roughness={0.35} />
        </mesh>
      ))}

      {/* sprinkles */}
      {sprinkles.map((s, i) => (
        <mesh key={`s-${i}`} position={s.pos} rotation={s.rot}>
          <capsuleGeometry args={[0.012, 0.05, 4, 8]} />
          <meshStandardMaterial color={s.color} roughness={0.4} />
        </mesh>
      ))}


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

export default function CandleScene({ lit, onBlow }: { lit: boolean; onBlow: () => void }) {
  const [hint, setHint] = useState(true);

  return (
    <div className="relative h-[380px] w-full sm:h-[460px]">
      <Canvas camera={{ position: [0, 1.4, 5.2], fov: 42 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 5, 3]} intensity={0.5} />
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <Cake
              lit={lit}
              onTap={() => {
                setHint(false);
                if (lit) onBlow();
              }}
            />
          </Float>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={0.9}
            maxPolarAngle={1.5}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {lit && hint ? "tap the cake to blow the candle out" : "drag to spin the cake"}
      </p>
    </div>
  );
}
