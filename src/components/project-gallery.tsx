"use client";
import { useLanguage } from '@/components/language-provider';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { projects as portugueseProjects } from "@/content/projects";
import { englishProjects } from "@/content/en-projects";
import { assetPath } from "@/lib/assets";

export function ProjectGallery() {
const { t, language } = useLanguage();

  const projects = language === "en" ? englishProjects : portugueseProjects;
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useReducedMotion();
  return (
    <section className="work-gallery" aria-labelledby="work-title">
      <div className="work-preview" aria-hidden="true">
        {projects.map((project, index) => (
          <motion.div key={project.slug} className="work-cover"
            initial={false} animate={{ opacity: selected === index ? 1 : 0, scale: selected === index ? 1.06 : 1 }}
            transition={{ duration: reduced ? 0 : .65, ease: [.22, 1, .36, 1] }}
            style={{ backgroundColor: project.color }}>
            <Image src={assetPath(project.image)} alt="" fill sizes="50vw" priority={index === 0} />
          </motion.div>
        ))}
      </div>
      <div className="work-index">
        <div className="work-heading"><h1 id="work-title">{t("Projetos")}</h1><span>{projects.length}</span></div>
        <ul className="work-list" aria-label={t("Projetos desenvolvidos")}>
          {projects.map((project, index) => (
            <li key={project.slug} style={{ "--work-index": index } as React.CSSProperties}>
              <Link href={`/projetos/${project.slug}`} className={`work-link${selected === index ? " is-selected" : ""}`}
                onPointerEnter={() => setSelected(index)} onPointerLeave={() => setSelected(null)}
                onFocus={() => setSelected(index)} onBlur={() => setSelected(null)} onPointerDown={() => setSelected(index)}>
                <Image className="work-mobile-cover" src={assetPath(project.image)} alt={project.imageAlt} width={640} height={420} sizes="100vw" />
                <span className="work-name"><span className="work-arrow" aria-hidden="true">&#8594;</span><span className="work-name-text">{project.title}</span></span>
                <span className="work-category">{project.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
