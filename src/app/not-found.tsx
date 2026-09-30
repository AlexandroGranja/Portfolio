"use client";
import { useLanguage } from '@/components/language-provider';
import Link from "next/link";

export default function NotFound() {
const { t, language } = useLanguage();

  return (
    <div className="page contact-page">
      <p className="eyebrow">{t("404 · Fora do caminho")}</p>
      <h1>{t("Por aqui,")} <br />{t("ainda não.")} </h1>
      <p className="body-copy">{t("Esta página não existe. Os projetos estão logo ali.")} </p>
      <Link href="/projetos" className="text-link">{t("Explorar projetos ↗")} </Link>
    </div>
  );
}
