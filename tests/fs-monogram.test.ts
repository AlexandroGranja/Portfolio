import test from "node:test";
import assert from "node:assert/strict";
import { fsStrokes } from "../src/lib/fs-monogram";
import { homeShapePose } from "../src/lib/home-motion";
test("FS reúne as cinco formas à direita, com os dois trechos do S conectados", () => {
  assert.equal(fsStrokes.length,5);
  assert.deepEqual(fsStrokes[3].at(-1),fsStrokes[4][0]);
  const target=homeShapePose(0,14,6,"signature");
  assert.ok(target.position[0]>0);
  for(let i=0;i<5;i++) {
    assert.deepEqual(homeShapePose(i,14,6,"signature"),target);
    assert.ok(fsStrokes[i].flat().every(Number.isFinite));
  }
});
