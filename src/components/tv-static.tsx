"use client";

import { useEffect, useRef } from "react";

export function TvStatic() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const context = canvas.current?.getContext("2d", { alpha: false });
    if (!context) return;
    const frame = context.createImageData(768, 480);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let previous = 0;
    const draw = () => {
      for (let i = 0; i < frame.data.length; i += 4) {
        const value = Math.floor(Math.random() * 256);
        frame.data[i] = value;
        frame.data[i + 1] = value;
        frame.data[i + 2] = value;
        frame.data[i + 3] = 255;
      }
      context.putImageData(frame, 0, 0);
    };
    const animate = (time: number) => {
      if (time - previous >= 85) {
        draw();
        previous = time;
      }
      raf = requestAnimationFrame(animate);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (document.hidden) return;
      draw();
      // Light mode uses a still fine grain; dark mode retains subtle TV motion.
      if (document.documentElement.dataset.theme === "dark" && !reduced.matches)
        raf = requestAnimationFrame(animate);
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div className="tv-static" aria-hidden="true">
      <canvas ref={canvas} width={768} height={480} />
      <div className="tv-scanlines" />
    </div>
  );
}
