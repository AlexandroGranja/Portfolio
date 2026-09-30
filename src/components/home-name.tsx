"use client";
import { useEffect, useRef } from "react";
import { useHomeInteraction } from "./home-interaction";

export function HomeName({
  children,
  kind,
}: {
  children: React.ReactNode;
  kind: "name" | "signature";
}) {
  const { activeName, setActiveName } = useHomeInteraction();
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
      aria-label={typeof children === "string" ? `${children}: animar as formas do fundo` : undefined}
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
        timeout.current = setTimeout(() => setActiveName(null), 1800);
      }}
      data-active={activeName === kind}
    >
      <strong>{children}</strong>
    </button>
  );
}
