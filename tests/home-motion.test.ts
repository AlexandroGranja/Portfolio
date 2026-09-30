import test from "node:test";
import assert from "node:assert/strict";
import { homeShapePose } from "../src/lib/home-motion";

test("os dois destaques recolhem as formas para lados opostos", () => {
  for (let index = 0; index < 5; index++) {
    const left = homeShapePose(index, 14, 6, "name");
    const right = homeShapePose(index, 14, 6, "signature");
    assert.ok(left.position[0] < 0 && right.position[0] > 0);
    if (index < 4) assert.ok(left.scale < homeShapePose(index, 14, 6, "rest").scale);
    // All strokes share one scale; the small resting sphere may grow into a letter.
    assert.equal(left.scale, right.scale);
  }
});
test("o menu reorganiza as formas sem sair da tela em formatos estreitos", () => {
  for (const [width, height] of [
    [14, 6],
    [3, 7],
    [7, 3],
  ]) {
    for (let index = 0; index < 5; index++) {
      const pose = homeShapePose(index, width, height, "menu", 2);
      assert.ok(
        [...pose.position, ...pose.rotation, pose.scale].every(Number.isFinite),
      );
      assert.ok(Math.abs(pose.position[0]) < width / 2);
      assert.ok(Math.abs(pose.position[1]) < height / 2);
    }
  }
  assert.notDeepEqual(
    homeShapePose(0, 14, 6, "menu", 0),
    homeShapePose(0, 14, 6, "menu", 1),
  );
});
