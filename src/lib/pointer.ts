export function pointerRotation(
  x: number,
  y: number,
  width: number,
  height: number,
) {
  if (
    ![x, y, width, height].every(Number.isFinite) ||
    width <= 0 ||
    height <= 0
  ) {
    return { x: 0, y: 0 };
  }
  const clamp = (value: number) => Math.max(-1, Math.min(1, value));
  return {
    x: clamp((y / height) * 2 - 1) * 0.18,
    y: clamp((x / width) * 2 - 1) * 0.18,
  };
}
