import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Text } from "@react-three/drei";
import { AdditiveBlending, CanvasTexture, type Group, type Mesh, type PointLight } from "three";

/** Sum of sines — cheap, smooth, non-repeating flicker. */
function flicker(t: number, seed = 0) {
  return (
    Math.sin(t * 8.7 + seed) * 0.5 +
    Math.sin(t * 14.3 + seed * 2.1) * 0.3 +
    Math.sin(t * 23.1 + seed * 3.7) * 0.2
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


function Cake({ lit }: { lit: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.32) * 0.5;
  });

  const berries = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return [Math.cos(a) * 1.02, 0.78, Math.sin(a) * 1.02] as const;
  });

  return (
    <group ref={group} position={[0, -0.7, 0]}>
      {/* plate */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <cylinderGeometry args={[1.65, 1.7, 0.08, 64]} />
        <meshStandardMaterial color="#e8e2f2" metalness={0.35} roughness={0.35} />
      </mesh>
      {/* bottom tier */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[1.3, 1.35, 0.72, 64]} />
        <meshStandardMaterial color="#f7d9e3" roughness={0.6} />
      </mesh>
      {/* cream ring */}
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.09, 16, 64]} />
        <meshStandardMaterial color="#fff6ec" roughness={0.4} />
      </mesh>
      {/* top tier */}
      <mesh position={[0, 1.02, 0]} castShadow>
        <cylinderGeometry args={[0.82, 0.9, 0.56, 64]} />
        <meshStandardMaterial color="#f2c3d6" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.07, 16, 64]} />
        <meshStandardMaterial color="#fff6ec" roughness={0.4} />
      </mesh>
      {berries.map((p, i) => (
        <mesh key={i} position={[p[0], p[1] + 0.05, p[2]]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={i % 2 ? "#d9557a" : "#ffb0c4"} roughness={0.35} />
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
      <Canvas
        camera={{ position: [0, 1.4, 5.2], fov: 42 }}
        dpr={[1, 1.8]}
        onPointerDown={() => {
          setHint(false);
          if (lit) onBlow();
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 5, 3]} intensity={0.5} />
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <Cake lit={lit} />
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
      {lit && hint && (
        <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          tap the cake to blow it out
        </p>
      )}
    </div>
  );
}
