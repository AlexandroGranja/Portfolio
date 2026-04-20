# Portfólio — Otimização para Recrutadores

**Data:** 2026-04-20
**Objetivo:** Posicionar o portfólio para atrair recrutadores de vagas dev (CLT Fullstack), corrigir erros de português e reescrever o texto de apresentação removendo o cargo atual.

---

## Contexto

O portfólio atual (`index.html`) abre com "Analista de Suporte de TI na Prosper" — posicionando o dono como profissional de suporte, não como desenvolvedor. O usuário quer vagas CLT como Desenvolvedor Fullstack e também manter a AIverse Technologies visível para clientes.

Erros de texto e chaves i18n duplicadas também foram identificados durante a análise.

---

## Escopo

### Alta prioridade

**1. Reescrever texto hero (Opção B — Impact-Driven)**

Texto atual:
> "Analista de Suporte de TI na Prosper e fundador da AIverse Technologies, uma agência especializada em desenvolvimento web e automações inteligentes. Transformo ideias em soluções digitais eficientes, criando sites modernos e agentes de WhatsApp personalizados com IA."

Texto novo:
> "Desenvolvedor Fullstack com 5+ projetos em produção. Uso React, Next.js, Python/Flask e n8n para transformar ideias em soluções digitais reais — com foco em performance, automação e IA."

Arquivo: `index.html` — atributo `data-i18n="hero.description"` e texto correspondente em `script.js`.

**2. Adicionar badge "Disponível para oportunidades" e badge de localização**

Abaixo do texto hero, antes dos botões de ação. Badge verde com ✦ e badge laranja com localização "Rio de Janeiro, BR · Remoto".

**3. Adicionar botão "Baixar CV"**

Terceiro botão na linha de ações do hero, ao lado de "Ver Projetos" e "Entre em Contato". Aponta para `/assets/cv.pdf`. Estilo: secundário (borda, sem preenchimento).

**4. Padronizar título profissional**

- `hero.subtitle` (linha 312): `"Desenvolvedor Web & Especialista em Automações 🚀"` → `"Desenvolvedor Fullstack & Especialista em Automações 🚀"`
- `about.subtitle` (linha 339): já está correto (`"Desenvolvedor Fullstack & Especialista em Automações"`).
- Atualizar também a tradução em inglês no `script.js`.

---

### Média prioridade

**5. Correções de português**

| Arquivo | Linha | Erro | Correção |
|---------|-------|------|----------|
| `code.html` | ~44 | "Alverse Technologies" | "AIverse Technologies" |
| `index.html` | 363 | `AIverse Technologies — 06/2025` (sem fim) | `AIverse Technologies — 06/2025 - Atual` |
| `index.html` | 513 | "Automatização completa" | "Automação completa" |

**6. Corrigir chaves i18n duplicadas**

Três títulos bicolores usam a mesma chave `data-i18n` nos dois `<span>`, o que faz a versão em inglês receber o texto completo em ambos os spans.

| Seção | Span branco (atual) | Span laranja (atual) | Correção |
|-------|---------------------|----------------------|----------|
| Skills (linha 575) | `skills.mySkills` | `skills.mySkills` | `skills.mySkillsLabel` / `skills.mySkillsHighlight` |
| Projects (linha 1079) | `projects.title` | `projects.title` | `projects.titleLabel` / `projects.titleHighlight` |
| Contact (linha 1371) | `contact.title` | `contact.title` | `contact.titleLabel` / `contact.titleHighlight` |

Também atualizar as traduções em `script.js` com as novas chaves separadas.

**7. Seção "Sobre" — ajustar card "Buscando Oportunidades"**

O card laranja já está bom. Apenas garantir que a lista de oportunidades lista "Desenvolvedor Fullstack" primeiro (já está) e não menciona o cargo de suporte.

---

### Bônus

**8. Gerar PDF do currículo**

Converter `Curriculo_Alexandro_Granja.md` para `assets/cv.pdf` para que o botão "Baixar CV" funcione. Pode ser feito manualmente via browser (imprimir como PDF) ou via ferramenta CLI (pandoc, wkhtmltopdf).

---

## Arquivos afetados

| Arquivo | Mudanças |
|---------|----------|
| `index.html` | Hero text, badges, botão CV, título subtítulo, data AIverse, "Automatização", chaves i18n |
| `script.js` | Traduções PT/EN para hero.description, hero.subtitle, novas chaves i18n bicolores |
| `code.html` | "Alverse" → "AIverse" |
| `assets/cv.pdf` | Novo arquivo (gerado externamente) |

---

## Critérios de sucesso

- Hero não menciona Prosper nem cargo de suporte
- Stack técnico (React, Next.js, Python/Flask, n8n) aparece no texto inicial
- Badge verde "Disponível para oportunidades" visível sem scroll
- Botão "Baixar CV" funciona e abre o PDF
- Título profissional consistente em todas as seções
- Versão em inglês renderiza corretamente (sem texto duplicado nos títulos bicolores)
- Nenhum dos erros de português listados permanece
