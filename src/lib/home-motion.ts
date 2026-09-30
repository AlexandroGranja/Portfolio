export type HomePose = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};
export type HomeMode = "rest" | "name" | "signature" | "menu";

export function homeShapePose(
  index: number,
  width: number,
  height: number,
  mode: HomeMode,
  menuItem = -1,
): HomePose {
  const mobile = width / height < 1.2;
  if (mobile && mode === "rest") {
    const scale = width / 4.8;
    const poses: HomePose[] = [
      { position: [-width * .3, height * .37, -.4], rotation: [.05, .12, 1.05], scale },
      { position: [width * .47, height * .44, -.5], rotation: [.12, .15, 1.1], scale },
      { position: [-width * .43, -height * .43, -.35], rotation: [.1, .1, -.7], scale },
      { position: [width * .35, -height * .43, -.4], rotation: [.1, -.15, .1], scale },
      { position: [0, height * .32, -.5], rotation: [0, 0, 0], scale: scale * .43 },
    ];
    return poses[index];
  }
  const size = Math.min(width / 9.4, height / 4.3);
  const resting: HomePose[] = [
    {
      position: [-width * 0.37, height * 0.48, -0.4],
      rotation: [0.05, 0.12, -0.25],
      scale: size,
    },
    {
      position: [width * 0.36, height * 0.48, -0.5],
      rotation: [0.12, 0.15, -0.65],
      scale: size,
    },
    {
      position: [-width * 0.32, -height * 0.49, -0.35],
      rotation: [0.1, 0.1, 0.15],
      scale: size,
    },
    {
      position: [width * 0.34, -height * 0.41, -0.4],
      rotation: [0.1, -0.15, 0.25],
      scale: size,
    },
    {
      position: [0, height * 0.49, -0.5],
      rotation: [0, 0, 0],
      scale: size * 0.48,
    },
  ];
  if (mode === "rest") return resting[index];
  const compact = mobile && mode === "menu" ? Math.min(width / 4.2, height / 5) : Math.min(width / 12, height / 8);
  if (mode === "name" || mode === "signature")
    return {
      position: [mobile ? 0 : width * (mode === "name" ? -0.29 : 0.27), mobile ? height * 0.04 : 0, -0.4],
      rotation: [0, 0, 0],
      scale: mobile ? width / 4.2 : compact * 1.2,
    };
  const centerX = mobile ? 0 : -width * 0.36;
  const centerY = 0;
  const cluster = [
    [-0.35, 1.55, 0.35],
    [0.95, 0.05, 0.8],
    [-0.85, -0.5, -1.35],
    [0.2, -1.8, Math.PI],
    [0.95, 1.3, 0],
  ];
  const [x, y, angle] = cluster[index];
  const spread = menuItem < 0 ? 1 : 1.08;
  return {
    position: [
      centerX + x * compact * spread,
      centerY + y * compact * spread,
      -0.5 + index * 0.16,
    ],
    rotation: [
      0.12,
      0.1,
      angle + Math.max(menuItem, 0) * 0.12,
    ],
    scale: compact * (index === 4 ? 0.43 : 0.66),
  };
}
