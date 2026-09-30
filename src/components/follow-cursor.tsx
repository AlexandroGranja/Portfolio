"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function FollowCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [host, setHost] = useState<Element | null>(null);
  const position = useRef({ x: 0, y: 0, shown: false });
  useEffect(() => {
    const update = () => setHost(document.querySelector('dialog[open]') || document.body);
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const outer = ring.current;
    const inner = dot.current;
    if (!outer || !inner) return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let x = position.current.x, y = position.current.y, followX = x, followY = y;
    let frame = 0;
    let shown = position.current.shown;
    let selected = false;
    let pressed = false;

    const paint = () => {
      const blocked = Boolean(document.querySelector('.arrival-screen'));
      const visible = shown && query.matches && !blocked;
      outer.dataset.visible = inner.dataset.visible = String(visible);
      outer.dataset.selected = inner.dataset.selected = String(selected);
      outer.dataset.pressed = String(pressed);
      document.documentElement.classList.toggle('custom-cursor', visible);
    };
    const tick = () => {
      followX += (x - followX) * .25;
      followY += (y - followY) * .25;
      outer.style.translate = `${followX}px ${followY}px`;
      inner.style.translate = `${x}px ${y}px`;
      paint();
      if (Math.abs(x - followX) + Math.abs(y - followY) > .1) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !query.matches) return;
      x = event.clientX; y = event.clientY;
      position.current = { x, y, shown: true };
      if (!shown) { followX = x; followY = y; }
      shown = true;
      selected = event.target instanceof Element && Boolean(event.target.closest('a, button, [role="button"]'));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const hide = () => { shown = false; position.current.shown = false; pressed = false; paint(); };
    const down = () => { pressed = true; paint(); };
    const up = () => { pressed = false; paint(); };
    const key = (event: KeyboardEvent) => { if (event.key === 'Tab') hide(); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('blur', hide);
    window.addEventListener('keydown', key);
    document.documentElement.addEventListener('pointerleave', hide);
    query.addEventListener('change', hide);
    tick();
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('blur', hide);
      window.removeEventListener('keydown', key);
      document.documentElement.removeEventListener('pointerleave', hide);
      query.removeEventListener('change', hide);
    };
  }, [host]);

  return host ? createPortal(<><div ref={ring} className="follow-cursor" aria-hidden="true" /><div ref={dot} className="follow-cursor-dot" aria-hidden="true" /></>, host) : null;
}
