"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { english } from '@/content/translations';
import { projects } from '@/content/projects';
import { englishProjects } from '@/content/en-projects';
import { profile } from '@/content/profile';

type Language = 'pt' | 'en';
const Context = createContext({ language: 'pt' as Language, setLanguage: (_: Language) => {}, t: (text: string) => text });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');
  const pathname = usePathname();
  useEffect(() => {
    try { if (localStorage.getItem('portfolio-language') === 'en') setLanguageState('en'); } catch { /* Storage is optional. */ }
  }, []);
  const t = (text: string) => language === 'en' ? english[text] ?? text : text;
  const setLanguage = (next: Language) => {
    setLanguageState(next);
    try { localStorage.setItem('portfolio-language', next); } catch { /* Switching still works without storage. */ }
  };
  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    const collection = language === 'en' ? englishProjects : projects;
    const project = collection.find(item => pathname.replace(/\/$/, '').endsWith(`/projetos/${item.slug}`));
    const label = project?.title ?? (pathname.startsWith('/projetos') ? t('Projetos') : pathname.startsWith('/sobre') ? t('Sobre') : pathname.startsWith('/contato') ? t('Contato') : t('Desenvolvimento fullstack & automação'));
    document.title = `${label} | Alexandro Granja`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', project?.summary ?? t(profile.introduction));
  }, [language, pathname]);
  return <Context.Provider value={{ language, setLanguage, t }}>{children}</Context.Provider>;
}
export const useLanguage = () => useContext(Context);
export function LocalizedText({ children }: { children: string }) { return useLanguage().t(children); }
export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return <button className="language-toggle" type="button" onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
    aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para português'} title={language === 'pt' ? 'Switch to English' : 'Mudar para português'} lang={language === 'pt' ? 'en' : 'pt-BR'}>
    {language === 'pt' ? 'EN' : 'PT'}
  </button>;
}
