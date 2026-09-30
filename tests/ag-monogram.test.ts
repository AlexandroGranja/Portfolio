import test from "node:test";
import assert from "node:assert/strict";
import { agStrokes } from "../src/lib/ag-monogram";
import { homeShapePose } from "../src/lib/home-motion";

test("as cinco formas se alinham no mesmo plano para montar AG", () => {
  assert.equal(agStrokes.length, 5);
  const reference = homeShapePose(0, 14, 6, "name");
  for (let i = 0; i < 5; i++) {
    assert.deepEqual(homeShapePose(i, 14, 6, "name"), reference);
    assert.ok(
      agStrokes[i].every((p) => p.length === 3 && p.every(Number.isFinite)),
    );
  }
});
test("os bojos do ag são fechados e mantêm a descendente do g", () => {
  for (const index of [0, 2, 4]) {
    const stroke = agStrokes[index];
    assert.ok(Math.hypot(...stroke[0].map((v, i) => v - stroke.at(-1)![i])) < 1e-8);
  }
  const aBottom = Math.min(...agStrokes.slice(0, 2).flat().map(p => p[1]));
  const gBottom = Math.min(...agStrokes.slice(2).flat().map(p => p[1]));
  assert.ok(gBottom < aBottom - .5);
});
