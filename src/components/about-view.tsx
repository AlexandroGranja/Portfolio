"use client";
import { useLanguage } from '@/components/language-provider';
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { assetPath } from "@/lib/assets";
import { Tabs } from "@/components/tabs";

export default function About() {
const { t, language } = useLanguage();

  return <div className="about-editorial">
    <div className="about-editorial-grid">
      <figure className="about-editorial-portrait">
        <Image src={assetPath("/media/alexandro-retrato.jpeg")} alt={t("Alexandro Granja sorrindo, com camisa preta")} width={1254} height={1254} sizes="(max-width: 800px) 90vw, 42vw" priority />
        <figcaption>Alexandro Granja <span>{t("Rio de Janeiro, Brasil")}</span></figcaption>
      </figure>
      <section className="about-editorial-copy" aria-labelledby="about-title">
        <p className="about-editorial-label">{t("Desenvolvimento fullstack & automação")}</p>
        <h1 id="about-title">{t("Sobre mim.")}</h1>
        <Tabs label={t("Sobre Alexandro")} items={[
          { label: t("Apresentação"), content: <div className="about-editorial-bio">
          <p>{t("Olá, sou Alexandro Granja. Minha trajetória conecta suporte de TI e desenvolvimento de software. Trabalhar perto de quem usa os sistemas me ensinou a observar os problemas da rotina antes de pensar na solução.")}</p>
          <p>{t("Desenvolvo aplicações web e automações com React, Python e integrações entre plataformas. Gosto de participar do projeto completo, da organização dos dados e das regras de negócio à interface que as pessoas vão usar.")}</p>
          <p>{t("Nos meus projetos, procuro tornar tarefas mais simples e dar clareza a quem precisa acompanhar uma operação. É esse olhar, construído entre o atendimento e o código, que levo para cada solução.")}</p>
        </div> },
          { label: t("Experiência"), content: <div className="about-editorial-jobs">
            {profile.experience.map(job => <article key={job.company}><p className="about-editorial-label">{t(job.period)}</p><h2>{job.company}</h2><p>{t(job.role)}</p><p>{t(job.description)}</p></article>)}
          </div> },
        ]} />
        <div className="about-editorial-links">
          <a href={assetPath(language === "en" ? "/curriculos/Alexandro_Granja_Resume.pdf" : "/curriculos/Alexandro_Granja_Curriculo.pdf")} target="_blank" rel="noopener noreferrer">{t("Ver currículo ↗")}</a>
          <Link href="/contato">{t("Vamos conversar ↗")}</Link>
        </div>
      </section>
    </div>
  </div>;
}
