"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, MathUtils } from "three";
import { pointerRotation } from "@/lib/pointer";
import { HomeSculptures } from "./home-sculptures";

type SceneProps = { page: string; active: boolean; onReady: () => void };

function Forms({ page }: { page: string }) {
  const group = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current = pointerRotation(
        event.clientX,
        event.clientY,
        window.innerWidth,
        window.innerHeight,
      );
    };
    const reset = () => {
      pointer.current = { x: 0, y: 0 };
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.removeEventListener("pointerleave", reset);
    };
  }, []);
  useFrame((state, delta) => {
    if (!group.current || !orbit.current) return;
    const ease = 1 - Math.exp(-4 * Math.min(delta, 0.1));
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      pointer.current.x,
      ease,
    );
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      pointer.current.y,
      ease,
    );
    group.current.position.x = MathUtils.lerp(
      group.current.position.x,
      pointer.current.y * 0.8,
      ease,
    );
    group.current.position.y = MathUtils.lerp(
      group.current.position.y,
      -pointer.current.x * 0.6,
      ease,
    );
    const scale = page === "home" ? 1 : 0.94;
    group.current.scale.lerp({ x: scale, y: scale, z: scale }, ease);
    orbit.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.09;
    orbit.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.12;
  });
  return (
    <group ref={group}>
      <group ref={orbit}>
        {page === "home" ? (
          <HomeSculptures />
        ) : (
          <>
            <mesh
              position={[viewport.width * 0.36, viewport.height * 0.18, -0.5]}
              rotation={[0.65, -0.35, -0.4]}
            >
              <torusGeometry args={[1.15, 0.37, 24, 80, Math.PI * 1.65]} />
              <meshStandardMaterial
                color="#e8653e"
                roughness={0.3}
                metalness={0.08}
              />
            </mesh>
            <mesh
              position={[-viewport.width * 0.39, -viewport.height * 0.25, -0.7]}
              rotation={[-0.5, 0.4, 0.8]}
            >
              <torusGeometry args={[0.82, 0.29, 24, 64, Math.PI * 1.45]} />
              <meshStandardMaterial
                color="#888bb2"
                roughness={0.35}
                metalness={0.12}
              />
            </mesh>
            <mesh
              position={[viewport.width * 0.23, -viewport.height * 0.32, -0.3]}
            >
              <sphereGeometry args={[0.36, 32, 24]} />
              <meshStandardMaterial color="#e8b247" roughness={0.26} />
            </mesh>
            <mesh
              position={[-viewport.width * 0.2, viewport.height * 0.34, -0.5]}
              rotation={[0, 0, -0.7]}
            >
              <capsuleGeometry args={[0.16, 0.65, 8, 20]} />
              <meshStandardMaterial color="#a6ad93" roughness={0.5} />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
}

export default function Scene({ page, active, onReady }: SceneProps) {
  const [visible, setVisible] = useState(true);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () => setDark(document.documentElement.dataset.theme === "dark");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  const darkHome = page === "home" && dark;
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={visible && active ? "always" : "never"}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={onReady}
    >
      <ambientLight intensity={darkHome ? 0.65 : 1.7} />
      <directionalLight position={[3, 5, 6]} intensity={darkHome ? 1.2 : 3.2} />
      <directionalLight position={[-4, 0, 3]} color={darkHome ? "#ffffff" : "#d5d5ff"} intensity={darkHome ? 0.15 : 1} />
      {page === "home" && (
        <pointLight position={[-2, 4, 5]} intensity={darkHome ? 14 : 28} decay={2} />
      )}
      <Forms page={page} />
    </Canvas>
  );
}
