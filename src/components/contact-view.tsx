"use client";
import { useLanguage } from '@/components/language-provider';
import { profile } from "@/content/profile";


export default function Contact() {
const { t, language } = useLanguage();

  return (
    <section className="contact-editorial" aria-labelledby="contact-title">
      <div className="contact-editorial-content">
        <h1 id="contact-title">{t("Contato")}</h1>
        <div className="contact-editorial-grid">
          <div className="contact-editorial-group">
            <h2>{t("E-mail")}</h2>
            <a href={`mailto:${profile.email}`}><span aria-hidden="true">↗</span><span className="contact-link-label">{profile.email}</span></a>
          </div>
          <div className="contact-editorial-group">
            <h2>{t("Redes sociais")}</h2>
            <div className="contact-editorial-socials">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span><span className="contact-link-label">LinkedIn</span></a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span><span className="contact-link-label">GitHub</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
