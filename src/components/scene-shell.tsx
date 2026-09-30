"use client";

import dynamic from "next/dynamic";
import { BrandMark } from "./brand-mark";
import { usePathname } from "next/navigation";
import { Component, useEffect, useState } from "react";
import { useHomeInteraction } from "./home-interaction";
import { StaticNameSculpture, StaticMenuSculptures } from "./static-name-sculpture";

const Scene = dynamic(() => import("./scene"), { ssr: false });

class SceneBoundary extends Component<
  { children: React.ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function SceneShell({ onReady }: { onReady?: () => void }) {
  const pathname = usePathname();
  const { menuOpen } = useHomeInteraction();
  const visible = pathname === "/" || menuOpen;
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (enabled === false || failed) onReady?.();
  }, [enabled, failed, onReady]);
  const page =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/projetos")
        ? "projects"
        : pathname.startsWith("/sobre")
          ? "about"
          : "contact";

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let supported = false;
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2");
      supported = Boolean(context);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      supported = false;
    }
    const update = () => setEnabled(supported && !query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="scene-shell scene-home" style={{ visibility: visible ? "visible" : "hidden" }} aria-hidden="true">
      {(enabled === false || failed) && <><StaticNameSculpture kind="name" /><StaticNameSculpture kind="signature" /><StaticMenuSculptures /></>}
      {(enabled === false || failed) && <div className="static-art">
        <span className="art-orbit" />
        <span className="art-pill" />
        <span className="art-ball" />
        {page === "home" && <div className="static-monogram"><BrandMark /></div>}
        {page === "home" && <svg className="static-fs" viewBox="-2.2 -1.5 4.4 3" fill="none" stroke="currentColor" strokeWidth=".44" strokeLinecap="round" strokeLinejoin="round"><g transform="scale(1 -1)"><path d="M-.85 -.8 V.3 Q-.85 1.1 -.25 1.1 Q0 1.1 .08 .88 M-1.25 .25H-.15 M-.85 -.8 Q-.85 -1.5 -1.4 -1.15"/><path d="M1.25 .58 C.4 1.3 -.05 .35 .85 -.08 C1.8 -.55 1.15 -1.4 .28 -.72"/></g></svg>}
      </div>}
      {enabled && !failed && (
        <SceneBoundary onError={() => setFailed(true)}>
          <Scene page="home" active={visible} onReady={() => onReady?.()} />
        </SceneBoundary>
      )}
    </div>
  );
}
