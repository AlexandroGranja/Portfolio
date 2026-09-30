import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import path from "node:path";
import { projects } from "../src/content/projects";
import { assetPath } from "../src/lib/assets";

test("os seis projetos têm endereços únicos e capas presentes", () => {
  assert.equal(projects.length, 6);
  assert.equal(
    new Set(projects.map((project) => project.slug)).size,
    projects.length,
  );
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const file of [
      project.image,
      ...project.gallery.map((image) => image.src),
    ]) {
      assert.ok(
        existsSync(path.join(process.cwd(), "public", file)),
        `Asset ausente: ${file}`,
      );
    }
    assert.ok(project.problem && project.contribution && project.outcome);
    for (const link of project.links)
      assert.equal(new URL(link.href).protocol, "https:");
  }
});

test("os downloads de currículo apontam para PDFs existentes", () => {
  for (const role of ["Curriculo", "Resume"])
    assert.ok(
      existsSync(
        path.join(
          process.cwd(),
          `public/curriculos/Alexandro_Granja_${role}.pdf`,
        ),
      ),
    );
});

test("assets respeitam a publicação em subdiretório", () => {
  const previous = process.env.NEXT_PUBLIC_BASE_PATH;
  try {
    process.env.NEXT_PUBLIC_BASE_PATH = "/Portfolio";
    assert.equal(
      assetPath("/media/fortao.webp"),
      "/Portfolio/media/fortao.webp",
    );
    assert.equal(
      assetPath("media/fortao.webp"),
      "/Portfolio/media/fortao.webp",
    );
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    assert.equal(assetPath("/media/fortao.webp"), "/media/fortao.webp");
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previous;
  }
});
