# Portfolio Recruiter Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever o hero para posicionar Alexandro como dev (removendo referência à Prosper), adicionar badge de disponibilidade + botão de CV, padronizar título e corrigir erros de português.

**Architecture:** Mudanças diretas em `index.html` (HTML + texto hardcoded inicial), `script.js` (traduções PT/EN) e `code.html` (typo). Nenhuma dependência entre tarefas — podem ser feitas em qualquer ordem.

**Tech Stack:** HTML, CSS (Tailwind inline), JavaScript vanilla (i18n já existente)

---

## Mapa de arquivos

| Arquivo | O que muda |
|---------|-----------|
| `script.js` | `translations.pt.hero.subtitle`, `translations.pt.hero.description`, `translations.en.hero.subtitle`, `translations.en.hero.description`, `translations.pt.agency.whatsapp.description` |
| `index.html` | Texto hardcoded hero (linhas 312–319), badges + botão CV (após linha 319), data AIverse (linha 363), "Automatização" → "Automação" (linha 513) |
| `code.html` | "Alverse" → "AIverse" |
| `assets/cv.pdf` | Copiar PDF existente |

---

## Task 1: Atualizar traduções do hero no script.js

**Files:**
- Modify: `script.js` (linhas 93–94 para PT, linhas 257–258 para EN)

- [ ] **Step 1: Abrir script.js e localizar a tradução PT do hero**

Procurar pelo bloco `pt: {` → `hero: {`. Está por volta da linha 91.

- [ ] **Step 2: Substituir subtitle e description em PT**

Localizar e substituir:

```js
// ANTES (linha ~93-94)
subtitle: "Desenvolvedor Web & Especialista em Automações 🚀",
description: "Analista de Suporte de TI na Prosper e fundador da AIverse Technologies, uma agência especializada em desenvolvimento web e automações inteligentes. Transformo ideias em soluções digitais eficientes, criando sites modernos e agentes de WhatsApp personalizados com IA.",
```

```js
// DEPOIS
subtitle: "Desenvolvedor Fullstack & Especialista em Automações 🚀",
description: "Desenvolvedor Fullstack com 5+ projetos em produção. Uso React, Next.js, Python/Flask e n8n para transformar ideias em soluções digitais reais — com foco em performance, automação e IA.",
```

- [ ] **Step 3: Substituir subtitle e description em EN**

Localizar o bloco `en: {` → `hero: {`. Está por volta da linha 254.

```js
// ANTES (linha ~257-258)
subtitle: "Web Developer & Automation Specialist 🚀",
description: "IT Support Analyst at Prosper and founder of AIverse Technologies, an agency specialized in web development and intelligent automations. I transform ideas into efficient digital solutions, creating modern websites and customized WhatsApp agents with AI.",
```

```js
// DEPOIS
subtitle: "Fullstack Developer & Automation Specialist 🚀",
description: "Fullstack Developer with 5+ projects in production. I use React, Next.js, Python/Flask and n8n to turn ideas into real digital solutions — focused on performance, automation and AI.",
```

- [ ] **Step 4: Corrigir "Automatização" na tradução PT da agência**

Ainda no `script.js`, localizar `agency.whatsapp.description` em PT (linha ~165):

```js
// ANTES
description: "Revolucione seu atendimento ao cliente com agentes inteligentes personalizados. Automatização completa integrada com IA, capaz de responder perguntas, processar solicitações e fornecer suporte 24/7 de forma natural e eficiente.",
```

```js
// DEPOIS
description: "Revolucione seu atendimento ao cliente com agentes inteligentes personalizados. Automação completa integrada com IA, capaz de responder perguntas, processar solicitações e fornecer suporte 24/7 de forma natural e eficiente.",
```

- [ ] **Step 5: Commitar**

```bash
git add script.js
git commit -m "fix: update hero text to dev-first positioning and fix automatização typo"
```

---

## Task 2: Atualizar texto hardcoded no index.html (hero)

**Files:**
- Modify: `index.html` (linhas 312–319)

> O HTML tem texto hardcoded que é o que o usuário vê antes do JS carregar — precisa estar em sincronia com as traduções.

- [ ] **Step 1: Localizar a seção de texto do hero**

Procurar por `data-i18n="hero.subtitle"` no `index.html`. Está na linha ~312.

- [ ] **Step 2: Substituir subtitle hardcoded**

```html
<!-- ANTES -->
<h2 class="text-base sm:text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400 leading-relaxed" data-i18n="hero.subtitle">
    Desenvolvedor Web & Especialista em Automações 🚀
</h2>
```

```html
<!-- DEPOIS -->
<h2 class="text-base sm:text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400 leading-relaxed" data-i18n="hero.subtitle">
    Desenvolvedor Fullstack & Especialista em Automações 🚀
</h2>
```

- [ ] **Step 3: Substituir description hardcoded**

```html
<!-- ANTES -->
<p class="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base px-2 sm:px-0" data-i18n="hero.description">
    Analista de Suporte de TI na <span class="font-bold text-primary">Prosper</span> e fundador da 
    <a href="https://www.aiversetechnologies.com.br/" target="_blank" class="text-primary font-semibold hover:underline">AIverse Technologies</a>, uma agência especializada em desenvolvimento web e automações inteligentes. Transformo ideias em soluções digitais eficientes, criando sites modernos e agentes de WhatsApp personalizados com IA.
</p>
```

```html
<!-- DEPOIS -->
<p class="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base px-2 sm:px-0 border-l-2 border-primary pl-3" data-i18n="hero.description">
    Desenvolvedor Fullstack com <strong class="text-white">5+ projetos em produção</strong>. Uso <strong class="text-primary">React</strong>, <strong class="text-primary">Next.js</strong>, <strong class="text-primary">Python/Flask</strong> e <strong class="text-primary">n8n</strong> para transformar ideias em soluções digitais reais — com foco em <strong class="text-white">performance</strong>, <strong class="text-white">automação</strong> e <strong class="text-white">IA</strong>.
</p>
```

> **Nota:** O JS sobrescreve o `textContent` ao trocar idioma, então as tags `<strong>` e `<a>` dentro do parágrafo só aparecem no carregamento inicial (PT). Na versão EN (via JS) o texto plano já é suficiente. Se quiser manter o HTML rico em EN também, é necessário mudar a lógica do i18n — isso está fora do escopo atual.

- [ ] **Step 4: Corrigir "Automatização" no HTML da agência**

Procurar por `Automatização completa` no `index.html` (linha ~513):

```html
<!-- ANTES -->
Revolucione seu atendimento ao cliente com agentes inteligentes personalizados. Automatização completa integrada com IA, capaz de responder perguntas, processar solicitações e fornecer suporte 24/7 de forma natural e eficiente.
```

```html
<!-- DEPOIS -->
Revolucione seu atendimento ao cliente com agentes inteligentes personalizados. Automação completa integrada com IA, capaz de responder perguntas, processar solicitações e fornecer suporte 24/7 de forma natural e eficiente.
```

- [ ] **Step 5: Commitar**

```bash
git add index.html
git commit -m "fix: update hero hardcoded text and fix automatização in agency section"
```

---

## Task 3: Adicionar badges e botão "Baixar CV" no hero

**Files:**
- Modify: `index.html` (após a tag `</p>` do hero.description, antes dos botões de ação)

- [ ] **Step 1: Localizar o ponto de inserção dos badges**

Procurar por `flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4` no `index.html` (linha ~320). Os badges vão **antes** dessa `<div>` de botões.

- [ ] **Step 2: Inserir badges de disponibilidade e localização**

Adicionar imediatamente antes da `<div class="flex flex-col sm:flex-row gap-3...">`:

```html
<div class="flex flex-wrap gap-2 pt-2">
    <span class="inline-flex items-center gap-1.5 bg-green-500/15 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-semibold">
        <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
        Disponível para oportunidades
    </span>
    <span class="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-medium">
        📍 Rio de Janeiro, BR · Remoto
    </span>
</div>
```

- [ ] **Step 3: Adicionar botão "Baixar CV" na linha de ações**

Localizar a linha de botões (linha ~321). Adicionar o terceiro botão após o "Entre em Contato":

```html
<!-- ANTES (apenas 2 botões) -->
<button onclick="showSection('#projects')" class="bg-primary ...">...</button>
<button onclick="showSection('#contact')" class="bg-white dark:bg-navy-card ...">...</button>
```

```html
<!-- DEPOIS (3 botões) -->
<button onclick="showSection('#projects')" class="bg-primary hover:bg-opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto">
    <span data-i18n="hero.viewProjects">Ver Projetos</span>
    <span class="material-icons-round text-lg sm:text-xl">arrow_forward</span>
</button>
<button onclick="showSection('#contact')" class="bg-white dark:bg-navy-card border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto">
    <span data-i18n="hero.contactMe">Entre em Contato</span>
</button>
<a href="./assets/cv.pdf" download class="bg-white dark:bg-navy-card border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto">
    <span class="material-icons-round text-lg sm:text-xl">download</span>
    <span>Baixar CV</span>
</a>
```

- [ ] **Step 4: Adicionar tradução do botão CV no script.js**

No bloco `hero` de PT (linha ~96) e EN (linha ~261), adicionar:

```js
// PT
downloadCV: "Baixar CV",

// EN
downloadCV: "Download CV",
```

E atualizar o span do botão para usar i18n:

```html
<span data-i18n="hero.downloadCV">Baixar CV</span>
```

Adicionar no `applyTranslations` do `script.js` (próximo da linha 450):

```js
document.querySelectorAll('[data-i18n="hero.downloadCV"]').forEach(el => el.textContent = t.hero.downloadCV);
```

- [ ] **Step 5: Verificar no browser**

Abrir `index.html` no browser e checar:
- Badge verde pulsando aparece abaixo do texto
- Badge laranja com localização ao lado
- Botão "Baixar CV" aparece na linha de ações
- Em mobile (DevTools < 640px): botões empilham verticalmente

- [ ] **Step 6: Commitar**

```bash
git add index.html script.js
git commit -m "feat: add availability badges and download CV button to hero"
```

---

## Task 4: Corrigir data da AIverse e typo em code.html

**Files:**
- Modify: `index.html` (linha ~363)
- Modify: `code.html`

- [ ] **Step 1: Corrigir data da AIverse no index.html**

Procurar por `06/2025` no `index.html` (linha ~363):

```html
<!-- ANTES -->
<p class="text-sm font-semibold mb-2"><a href="https://www.aiversetechnologies.com.br/" target="_blank" class="text-primary hover:underline">AIverse Technologies</a> <span class="text-slate-400 mx-2">—</span> 06/2025</p>
```

```html
<!-- DEPOIS -->
<p class="text-sm font-semibold mb-2"><a href="https://www.aiversetechnologies.com.br/" target="_blank" class="text-primary hover:underline">AIverse Technologies</a> <span class="text-slate-400 mx-2">—</span> 06/2025 - <span data-i18n="about.current">Atual</span></p>
```

- [ ] **Step 2: Corrigir "Alverse" no code.html**

Procurar por `Alverse` no `code.html` e substituir por `AIverse`:

```bash
grep -n "Alverse" code.html
```

Substituir cada ocorrência.

- [ ] **Step 3: Commitar**

```bash
git add index.html code.html
git commit -m "fix: add AIverse current date and fix Alverse typo in code.html"
```

---

## Task 5: Colocar PDF do currículo em assets/

**Files:**
- Create: `assets/cv.pdf`

- [ ] **Step 1: Copiar o PDF**

Copiar seu arquivo de currículo PDF para:

```
Portfolio/assets/cv.pdf
```

- [ ] **Step 2: Testar o botão**

Abrir `index.html` no browser → clicar em "Baixar CV" → confirmar que o download inicia.

- [ ] **Step 3: Commitar**

```bash
git add assets/cv.pdf
git commit -m "feat: add CV PDF for download button"
```

---

## Checklist de verificação final

- [ ] Hero não menciona "Prosper" nem "Analista de Suporte"
- [ ] "Desenvolvedor Fullstack" aparece no subtitle (não "Web")
- [ ] "5+ projetos em produção" + stack visível no parágrafo
- [ ] Badge verde "Disponível para oportunidades" aparece sem scroll
- [ ] Botão "Baixar CV" funciona e baixa o PDF
- [ ] Trocar idioma para EN e confirmar que os textos do hero mudam corretamente
- [ ] AIverse Technologies mostra "06/2025 - Atual" na seção Sobre
- [ ] "Automação" (sem "tiz") na seção Agência
- [ ] `code.html` não tem mais "Alverse"
