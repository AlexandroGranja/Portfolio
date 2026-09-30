import assert from "node:assert/strict";
import test from "node:test";
import { pointerRotation } from "../src/lib/pointer";

test("o centro da tela mantém a cena neutra", () => {
  assert.deepEqual(pointerRotation(500, 400, 1000, 800), { x: 0, y: 0 });
});
test("o movimento do ponteiro inclina a cena com amplitude limitada", () => {
  assert.deepEqual(pointerRotation(1000, 0, 1000, 800), { x: -0.18, y: 0.18 });
  assert.deepEqual(pointerRotation(2000, -800, 1000, 800), {
    x: -0.18,
    y: 0.18,
  });
});
test("dimensões inválidas e eventos não finitos não contaminam a cena", () => {
  for (const input of [
    [1, 2, 0, 0],
    [NaN, 1, 100, 100],
    [1, 2, -1, 100],
  ]) {
    assert.deepEqual(
      pointerRotation(...(input as [number, number, number, number])),
      { x: 0, y: 0 },
    );
  }
});
