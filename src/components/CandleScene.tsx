import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import type { Group, Mesh, PointLight } from "three";

function Flame({ lit }: { lit: boolean }) {
  const flame = useRef<Mesh>(null);
  const light = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const wobble = 1 + Math.sin(t * 9) * 0.12 + Math.sin(t * 3.3) * 0.06;
    if (flame.current) {
      const s = lit ? wobble : 0.001;
      flame.current.scale.set(s * 0.7, s, s * 0.7);
      flame.current.position.x = lit ? Math.sin(t * 2.2) * 0.02 : 0;
    }
    if (light.current) {
      light.current.intensity = lit ? 6 + Math.sin(t * 11) * 1.6 : 0;
    }
  });

  return (
    <group position={[0, 1.62, 0]}>
      <mesh ref={flame}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#ffd27a" emissive="#ffb347" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <pointLight ref={light} color="#ffc36b" distance={7} decay={2} />
    </group>
  );
}

function Cake({ lit }: { lit: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.22;
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
