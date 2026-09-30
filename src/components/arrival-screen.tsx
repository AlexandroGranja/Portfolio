"use client";
import { useLanguage } from '@/components/language-provider';
import { useCallback, useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";
import { SceneShell } from "./scene-shell";

export function ArrivalScreen({ children }: { children: React.ReactNode }) {
const { t, language } = useLanguage();

  const [sceneReady, setSceneReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [settled, setSettled] = useState(false);
  const [expired, setExpired] = useState(false);
  const [visible, setVisible] = useState(true);
  const onReady = useCallback(() => setSceneReady(true), []);
  const complete = expired || (sceneReady && fontsReady && settled);

  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => { if (alive) setFontsReady(true); });
    const minimum = window.setTimeout(() => setSettled(true), 700);
    // A failed/slow graphics download must never block the portfolio.
    const maximum = window.setTimeout(() => setExpired(true), 6000);
    return () => { alive = false; clearTimeout(minimum); clearTimeout(maximum); };
  }, []);

  useEffect(() => {
    if (!complete) return;
    const timer = window.setTimeout(() => setVisible(false), 350);
    return () => clearTimeout(timer);
  }, [complete]);

  return <>
    <SceneShell onReady={onReady} />
    <div className="arrival-content" inert={visible} aria-hidden={visible || undefined}>
      {children}
    </div>
    {visible && <div className={`arrival-screen${complete ? " is-complete" : ""}`}>
      <div className="arrival-center" role="status" aria-live="polite">
        <div className="arrival-symbol"><BrandMark /></div>
        <p>{t("Materializando as formas")}<span className="arrival-dots">...</span></p>
      </div>
      <p className="arrival-credit">{t("Criado e desenvolvido por Alexandro Granja ©")} {new Date().getFullYear()}</p>
    </div>}
  </>;
}
