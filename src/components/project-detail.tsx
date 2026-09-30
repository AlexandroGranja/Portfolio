"use client";
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import { projects } from '@/content/projects';
import { englishProjects } from '@/content/en-projects';
import { ProjectPresentation } from './project-presentation';
export default function ProjectDetailView({index}: {index: number}) {
const { t, language } = useLanguage();

  const collection = language === "en" ? englishProjects : projects;
  const project = collection[index];
  const next = collection[(index + 1) % collection.length];
  const editorial = project.editorial === true;
  return (
    <article className={`work-case${editorial ? " work-case--editorial" : ""}`}>
      {!editorial && <Link className="work-back" href="/projetos">{t("← Todos os projetos")}</Link>}
      <figure className="work-case-hero" style={editorial ? undefined : { backgroundColor: project.color }}>
        <Image src={assetPath(project.image)} alt={project.imageAlt} width={1600} height={1000} priority sizes="100vw" />
        {project.imageCaption && <figcaption className="work-case-caption">{project.imageCaption}</figcaption>}
      </figure>
      <header className="work-case-heading">
        <h1>{project.title}</h1>
        {editorial && <Link className="work-back" href="/projetos">{t("← Todos os projetos")}</Link>}
      </header>
      <ProjectPresentation project={project} />
      <Link className="work-next" href={`/projetos/${next.slug}`}>
        <span>
          {editorial ? <strong><span aria-hidden="true">→ </span>{t("Próximo projeto")}</strong> : <><span className="eyebrow">{t("Próximo projeto")}</span><strong>{next.title}</strong></>}
        </span>
        {editorial ? <span className="work-next-name">{next.title}</span> : <span aria-hidden="true">↗</span>}
      </Link>
    </article>
  );
}
