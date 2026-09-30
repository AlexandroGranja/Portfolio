"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Group, MathUtils } from "three";
import { useHomeInteraction } from "./home-interaction";
import { homeShapePose } from "@/lib/home-motion";
import { DarkSculptureMaterial } from "./dark-sculpture-material";
import { PastelSculptureMaterial } from "./pastel-sculpture-material";
import { agStrokes } from "@/lib/ag-monogram";
import { fsStrokes } from "@/lib/fs-monogram";
import { Mesh } from "three";
import {
  BufferAttribute,
  CatmullRomCurve3,
  Color,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

function Sculpture({
  points,
  colors,
  radius = 0.43,
  index,
}: {
  points: number[][];
  colors: string[];
  radius?: number;
  index: number;
}) {
  const mesh = useRef<Mesh>(null);
  const { activeName, menuOpen } = useHomeInteraction();
  useFrame((_, delta) => {
    const influences = mesh.current?.morphTargetInfluences;
    if (influences) {
      influences[0] = MathUtils.damp(
        influences[0],
        activeName === "name" && !menuOpen ? 1 : 0,
        7,
        Math.min(delta, 0.05),
      );
      influences[1] = MathUtils.damp(influences[1], activeName === "signature" && !menuOpen ? 1 : 0, 7, Math.min(delta, .05));
    }
  });
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () =>
      setDark(document.documentElement.dataset.theme === "dark");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  const geometry = useMemo(() => {
    const curve = new CatmullRomCurve3(points.map((p) => new Vector3(...p)));
    const tube = new TubeGeometry(curve, 100, radius, 24, false);
    const start = new SphereGeometry(radius, 24, 16).translate(
      ...(points[0] as [number, number, number]),
    );
    const end = new SphereGeometry(radius, 24, 16).translate(
      ...(points[points.length - 1] as [number, number, number]),
    );
    const dot = new SphereGeometry(0.001, 24, 16);
    const merged = mergeGeometries([tube, start, end, dot]);
    dot.dispose();
    tube.dispose();
    start.dispose();
    end.dispose();
    merged.computeBoundingBox();
    const bounds = merged.boundingBox!;
    const position = merged.getAttribute("position");
    const values = new Float32Array(position.count * 3);
    const palette = colors.map((c) => new Color(c));
    for (let i = 0; i < position.count; i++) {
      const t = Math.max(
        0,
        Math.min(
          1,
          ((position.getY(i) - bounds.min.y) / (bounds.max.y - bounds.min.y)) *
            0.75 +
            ((position.getX(i) - bounds.min.x) /
              (bounds.max.x - bounds.min.x)) *
              0.25,
        ),
      );
      const color = palette[0].clone().lerp(palette[1], t);
      color.toArray(values, i * 3);
    }
    merged.setAttribute("color", new BufferAttribute(values, 3));
    const stroke = agStrokes[index];
    const letterCurve = new CatmullRomCurve3(
      stroke.map((p) => new Vector3(...p)),
    );
    const letterTube = new TubeGeometry(letterCurve, 100, 0.22, 24, false);
    const capRadius = index === 1 || index === 3 ? 0.22 : 0.001;
    const letterStart = new SphereGeometry(capRadius, 24, 16).translate(
      ...(stroke[0] as [number, number, number]),
    );
    const letterEnd = new SphereGeometry(capRadius, 24, 16).translate(
      ...(stroke[stroke.length - 1] as [number, number, number]),
    );
    const letterDot = new SphereGeometry(index === 4 ? 0.24 : 0.001, 24, 16).translate(1.7, 1.35, 0.06);
    const letter = mergeGeometries([letterTube, letterStart, letterEnd, letterDot]);
    letterDot.dispose();
    merged.morphAttributes.position = [letter.getAttribute("position").clone()];
    merged.morphAttributes.normal = [letter.getAttribute("normal").clone()];
    letterTube.dispose();
    letterStart.dispose();
    letterEnd.dispose();
    letter.dispose();
    const fsStroke = fsStrokes[index];
    const fsTube = new TubeGeometry(new CatmullRomCurve3(fsStroke.map(p => new Vector3(...p))), 100, .22, 24, false);
    const fsStart = new SphereGeometry(index === 2 || index === 4 ? .001 : .22, 24, 16).translate(...fsStroke[0] as [number,number,number]);
    const fsEnd = new SphereGeometry(.22, 24, 16).translate(...fsStroke[fsStroke.length - 1] as [number,number,number]);
    const fsDot = new SphereGeometry(.001, 24, 16).translate(...fsStroke[0] as [number,number,number]);
    const fsLetter = mergeGeometries([fsTube, fsStart, fsEnd, fsDot]);
    merged.morphAttributes.position.push(fsLetter.getAttribute("position").clone());
    merged.morphAttributes.normal.push(fsLetter.getAttribute("normal").clone());
    fsTube.dispose(); fsStart.dispose(); fsEnd.dispose(); fsDot.dispose(); fsLetter.dispose();
    merged.computeBoundingSphere();
    return merged;
  }, [points, colors, radius, index]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh ref={mesh} args={[geometry]}>
      {dark ? (
        <DarkSculptureMaterial />
      ) : (
        <PastelSculptureMaterial />
      )}
    </mesh>
  );
}

const wave = [
  [-1.9, 0.2, 0],
  [-1, 0.65, 0],
  [0, 0.65, 0.1],
  [1, -0.05, 0],
];
const loop = [
  [-1, 0.5, 0],
  [-1, -0.4, 0],
  [0, -1, 0.1],
  [1, -0.5, 0],
  [1.05, 0.55, 0],
];
const hook = [
  [-1, -0.5, 0],
  [-0.5, 0.35, 0],
  [0.5, 0.55, 0],
  [1.15, -0.1, 0.15],
  [1.2, -1, 0],
];
const mint = ["#deed86", "#79e8b9"];
const sunset = ["#edf197", "#f0abc5"];
const lilac = ["#f0a9c6", "#a6b4f1"];
const aqua = ["#85cddf", "#6ef2c7"];
function MovingShape({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const group = useRef<Group>(null);
  const { viewport } = useThree();
  const { activeName, menuOpen, menuItem } = useHomeInteraction();
  const mode = menuOpen ? "menu" : (activeName ?? "rest");
  const target = homeShapePose(
    index,
    viewport.width,
    viewport.height,
    mode,
    menuItem,
  );
  const initial = useRef(
    homeShapePose(index, viewport.width, viewport.height, "rest"),
  );
  const velocity = useRef([0, 0, 0]);
  useFrame((_, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    // Substeps keep the spring stable when frame rate varies.
    const steps = Math.max(1, Math.ceil(dt * 120));
    for (let step = 0; step < steps; step++) {
      const time = dt / steps;
      for (let axis = 0; axis < 3; axis++) {
        const current = group.current.position.getComponent(axis);
        velocity.current[axis] +=
          ((target.position[axis] - current) * 65 -
            velocity.current[axis] * 13) *
          time;
        group.current.position.setComponent(
          axis,
          current + velocity.current[axis] * time,
        );
      }
    }
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      target.rotation[0],
      6,
      dt,
    );
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      target.rotation[1],
      6,
      dt,
    );
    group.current.rotation.z = MathUtils.damp(
      group.current.rotation.z,
      target.rotation[2],
      6,
      dt,
    );
    group.current.scale.setScalar(
      MathUtils.damp(group.current.scale.x, target.scale, 8, dt),
    );
  });
  return (
    <group
      ref={group}
      position={initial.current.position}
      rotation={initial.current.rotation}
      scale={initial.current.scale}
    >
      {children}
    </group>
  );
}
export function HomeSculptures() {
  return (
    <group>
      <MovingShape index={0}>
        <Sculpture index={0} points={wave} colors={mint} radius={0.56} />
      </MovingShape>
      <MovingShape index={1}>
        <Sculpture index={1} points={loop} colors={sunset} radius={0.57} />
      </MovingShape>
      <MovingShape index={2}>
        <Sculpture index={2} points={hook} colors={lilac} radius={0.58} />
      </MovingShape>
      <MovingShape index={3}>
        <Sculpture index={3} points={loop} colors={aqua} radius={0.6} />
      </MovingShape>
      <MovingShape index={4}>
        <Sculpture
          index={4}
          points={[
            [0, 0, 0],
            [0, 0.015, 0],
          ]}
          colors={["#f2acc6", "#99e2b9"]}
          radius={1}
        />
      </MovingShape>
    </group>
  );
}
