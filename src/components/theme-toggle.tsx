"use client";
import { useLanguage } from '@/components/language-provider';
import { useEffect, useState } from "react";

export function ThemeToggle() {
const { t, language } = useLanguage();

  const [dark, setDark] = useState(false);
  useEffect(() => {
    const sync = () =>
      setDark(document.documentElement.dataset.theme === "dark");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const storage = (event: StorageEvent) => {
      if (event.key === "portfolio-theme" || event.key === null) {
        document.documentElement.dataset.theme =
          event.newValue === "dark" ? "dark" : "light";
      }
    };
    window.addEventListener("storage", storage);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", storage);
    };
  }, []);

  function toggle() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setDark(next === "dark");
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* O tema continua funcional sem persistência. */
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={t("Modo escuro")}
      aria-pressed={dark}
      title={dark ? t("Ativar modo claro") : t("Ativar modo escuro")}
    >
      <svg
        className="theme-sun"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg
        className="theme-moon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20.5 14A8.6 8.6 0 0 1 10 3.5 8.7 8.7 0 1 0 20.5 14Z" />
      </svg>
      <span className="theme-label-light">{t("Escuro")}</span>
      <span className="theme-label-dark">{t("Claro")}</span>
    </button>
  );
}
