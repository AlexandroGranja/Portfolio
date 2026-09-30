"use client";
import { useEffect, useRef } from "react";
import { useHomeInteraction } from "./home-interaction";
import { useLanguage } from "./language-provider";

export function HomeName({
  children,
  kind,
}: {
  children: React.ReactNode;
  kind: "name" | "signature";
}) {
  const { activeName, setActiveName } = useHomeInteraction();
  const { language } = useLanguage();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timeout.current) clearTimeout(timeout.current);
  };
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  return (
    <button
      type="button"
      className="home-name"
      aria-label={typeof children === "string" ? `${children}: ${language === 'en' ? 'animate the background shapes' : 'animar as formas do fundo'}` : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") {
          clear();
          setActiveName(kind);
        }
      }}
      onPointerLeave={() => {
        clear();
        setActiveName(null);
      }}
      onFocus={() => {
        clear();
        setActiveName(kind);
      }}
      onBlur={() => {
        clear();
        setActiveName(null);
      }}
      onClick={() => {
        clear();
        setActiveName(kind);
        timeout.current = setTimeout(() => setActiveName(null), 3200);
      }}
      data-active={activeName === kind}
    >
      <strong>{children}</strong>
    </button>
  );
}
