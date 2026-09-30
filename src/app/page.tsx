"use client";
import { useLanguage } from '@/components/language-provider';
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { HomeName } from "@/components/home-name";
export default function Home() {
const { t, language } = useLanguage();

  return (
    <Reveal className="home-reference">
      <div className="home-intro">
        <h1>
          <span className="intro-line">
            <span className="intro-line-content">
            <span className="intro-outline">{t("Olá, eu sou")} </span>
            <HomeName kind="name">Alexandro Granja</HomeName>
            </span>
          </span>
          <span className="intro-line">
            <span className="intro-line-content">
            {language === "en" ? <><HomeName kind="signature">Full-stack</HomeName><span className="intro-outline"> Developer</span></> : <><span className="intro-outline">Desenvolvedor </span><HomeName kind="signature">Fullstack</HomeName></>}
            </span>
          </span>
        </h1>
        <p>{t("Crio aplicações, integro sistemas e automatizo tarefas")} <br />{t("para simplificar processos do dia a dia.")} </p>
        <div className="home-actions">
          <Link href="/projetos"><span className="home-link-arrow" aria-hidden="true">→</span><span>{t("veja meus projetos")}</span></Link>
          <Link href="/sobre"><span className="home-link-arrow" aria-hidden="true">→</span><span>{t("saiba mais")}</span></Link>
        </div>
      </div>
    </Reveal>
  );
}
