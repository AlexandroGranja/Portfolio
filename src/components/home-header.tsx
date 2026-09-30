"use client";
import { useLanguage, LanguageToggle } from '@/components/language-provider';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useHomeInteraction } from "./home-interaction";
import { profile } from "@/content/profile";
import { BrandMark } from "./brand-mark";

const routes = [
  ["/", "Início"],
  ["/projetos", "Projetos"],
  ["/sobre", "Sobre"],
  ["/contato", "Contato"],
];
function Mark() {
  return <BrandMark />;
}
function MenuIcon({ close = false }: { close?: boolean }) {
  return (
    <svg className={`menu-morph${close ? " active" : ""}`} viewBox="0 0 48 48" aria-hidden="true">
      {[[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={24 + x * 12} cy={24 + y * 12} r="3"
          className={x === 0 || y === 0 ? "axis-dot" : "corner-dot"}
          style={{ "--dot-x": `${x * 24}px`, "--dot-y": `${y * 24}px` } as React.CSSProperties} />
      ))}
      <rect className="morph-horizontal" x="21" y="21" width="6" height="6" rx="3" />
      <rect className="morph-vertical" x="21" y="21" width="6" height="6" rx="3" />
    </svg>
  );
}

export function HomeHeader() {
const { t, language } = useLanguage();

  const pathname = usePathname();
  const { menuOpen, setMenuOpen, setMenuItem, setActiveName } =
    useHomeInteraction();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      dialog.current?.showModal();
      if (dialog.current) dialog.current.scrollTop = 0;
      let secondFrame = 0;
      const firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => setEntered(true));
      });
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(firstFrame);
        cancelAnimationFrame(secondFrame);
        document.body.style.overflow = previous;
      };
    }
    setEntered(false);
    const timeout = setTimeout(() => {
      if (dialog.current?.open) {
        dialog.current.close();
        trigger.current?.focus();
      }
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650);
    return () => clearTimeout(timeout);
  }, [menuOpen]);
  const close = () => {
    setMenuOpen(false);
    setMenuItem(-1);
    setActiveName(null);
  };
  return (
    <>
      <header className="site-header home-header">
        <Link
          href="/"
          className="identity"
          aria-label={t("Alexandro Granja, início")}
        >
          <Mark />
        </Link>
        <div className="header-controls">
          <LanguageToggle /><ThemeToggle />
          <button
            ref={trigger}
            type="button"
            className="menu-button"
            aria-label={t("Abrir menu")}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="home-menu"
            onClick={() => {
              setActiveName(null);
              setMenuOpen(true);
            }}
          >
            <MenuIcon />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="home-menu"
        aria-label={t("Menu principal")}
        className={`home-menu${menuOpen && entered ? " is-open" : ""}`}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <div className="site-header home-menu-header home-header">
          <Link
            href="/"
            onClick={close}
            className="identity"
            aria-label={t("Alexandro Granja, início")}
          >
            <Mark />
            <span className="menu-identity"><span className="menu-identity-text">alexandro / granja</span></span>
          </Link>
          <div className="header-controls">
            <LanguageToggle /><ThemeToggle />
            <button
              type="button"
              className="menu-button"
              aria-label={t("Fechar menu")}
              onClick={close}
              autoFocus
            >
              <MenuIcon close={menuOpen && entered} />
            </button>
          </div>
        </div>
        <div className="home-menu-content">
          <nav aria-label={t("Navegação principal")}>
            <ol>
              {routes.map(([href, label], index) => (
                <li
                  key={href}
                  style={{ "--item-index": index } as React.CSSProperties}
                >
                  <Link
                    href={href}
                    aria-current={(href === "/" ? pathname === "/" : pathname.startsWith(href)) ? "page" : undefined}
                    onClick={close}
                    onPointerEnter={() => setMenuItem(index)}
                    onPointerLeave={() => setMenuItem(-1)}
                    onFocus={() => setMenuItem(index)}
                    onBlur={() => setMenuItem(-1)}
                  >
                    <span className="menu-number">0{index + 1}</span>
                    <span>{t(label)}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="home-menu-socials">
            <a href={profile.github} target="_blank" rel="noreferrer">
              ↗ GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              ↗ LinkedIn
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
