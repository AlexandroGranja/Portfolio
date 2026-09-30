import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { themeInitializationScript } from "../src/lib/theme";

test("o tema salvo é aplicado antes da hidratação", () => {
  const document = { documentElement: { dataset: { theme: "" } } };
  runInNewContext(themeInitializationScript, {
    document,
    localStorage: { getItem: () => "dark" },
  });
  assert.equal(document.documentElement.dataset.theme, "dark");
});

test("uma preferência inválida ou storage bloqueado mantém o tema claro", () => {
  for (const getItem of [
    () => "invalid",
    () => null,
    () => {
      throw Error("Storage bloqueado");
    },
  ]) {
    const document = { documentElement: { dataset: { theme: "" } } };
    runInNewContext(themeInitializationScript, {
      document,
      localStorage: { getItem },
    });
    assert.equal(document.documentElement.dataset.theme, "light");
  }
});
