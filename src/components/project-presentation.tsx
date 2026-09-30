"use client";
import { useLanguage } from '@/components/language-provider';
﻿import Image from "next/image";
import type { Project } from "@/content/projects";
import { assetPath } from "@/lib/assets";

export function ProjectPresentation({ project }: { project: Project }) {
const { t, language } = useLanguage();

  const editorial = project.editorial === true;
  return (
    <div className="work-story">
      <div className="work-story-intro">
        <dl className="work-facts">
          <div><dt>{t("Categoria")}</dt><dd>{project.category}</dd></div>
          {project.role && <div><dt>{t("Meu papel")}</dt><dd>{project.role}</dd></div>}
          <div><dt>{t("Tecnologias")}</dt><dd>{project.stack.join(" / ")}</dd></div>
        </dl>
        <div className="work-description">
          <p className="work-summary">{project.summary}</p>
          {editorial ? <>
            <p>{project.problem}</p>
            <p>{project.contribution}</p>
            <p>{project.outcome}</p>
          </> : <>
            <section><h2>{t("O desafio")}</h2><p>{project.problem}</p></section>
            <section><h2>{t("Meu trabalho")}</h2><p>{project.contribution}</p></section>
            <section><h2>{t("Resultado")}</h2><p>{project.outcome}</p></section>
          </>}
          <div className="work-case-links">
            {project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer"><span aria-hidden="true">&#8599; </span>{link.label}</a>)}
          </div>
        </div>
      </div>
      {project.features && <div className="work-feature-list">
        {project.features.map((feature, index) => <section className="work-feature" key={feature.title}>
          <div className="work-feature-heading"><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h2>{feature.title}</h2></div>
          <div><p>{feature.description}</p>
            {feature.steps && <ol>{feature.steps.map(step => <li key={step}>{step}</li>)}</ol>}
          </div>
        </section>)}
      </div>}
      {project.gallery.map(image => (
        editorial ? <section className="work-visual-section" key={image.src}>
          <h2>{image.title || t("Detalhes do projeto")}</h2>
          {image.description && <p className="work-visual-description">{image.description}</p>}
          <figure className={`work-story-image${image.portrait ? " work-story-image--portrait" : ""}`}>
            <Image src={assetPath(image.src)} alt={image.alt} width={image.portrait ? 375 : 1400} height={image.portrait ? 667 : 900} sizes={image.portrait ? "(max-width: 420px) 85vw, 340px" : "90vw"} />
            <figcaption>{image.alt}</figcaption>
          </figure>
        </section> : <figure className="work-story-image" key={image.src}>
          <Image src={assetPath(image.src)} alt={image.alt} width={1400} height={900} sizes="90vw" />
          <figcaption>{image.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}
