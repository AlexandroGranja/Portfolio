# Seção Projetos — Plano de melhoria e redesign

> **Para execução com agente:** usar checklist (`- [ ]`) por fase; preferir PRs pequenos (conteúdo → JS → CSS → HTML estrutura).

**Goal:** Finalizar a aba **Projetos** com visual alinhado ao restante do portfólio (Skills/Sobre), conteúdo consistente com identidade (Fortão = ações promocionais, AIverse), i18n PT/EN sem mistura, links verificados, boa leitura mobile/desktop e base preparada para evoluir (opcional: dados em JS em vez de HTML repetido).

**Architecture:** Manter stack **estático** (`index.html` + `styles.css` + `script.js`). Redesenho em camadas: (1) conteúdo e traduções, (2) semântica/a11y e performance de imagens, (3) novo layout visual e interação (grid + painel de detalhe **ou** carrossel refinado — decidir na Fase 0), (4) refator opcional `PROJECTS_DATA` em `script.js` gerando cards para não duplicar 5 blocos gigantes no HTML.

**Tech Stack:** HTML5, CSS (variáveis existentes, âmbar `#F59E0B`), Tailwind via CDN onde já usado, JS vanilla (carrossel/swipe existente).

**Baseline visual atual (2026-05):** Uma única coluna com card largo; screenshot do projeto; título com parte em âmbar; descrição longa + “Ver mais”; tags; links; indicadores circulares abaixo; setas laterais do **projeto** estão **escondidas** no CSS — navegação principal por **dots** + **swipe/arrastar** no carrossel de imagens.

---

## Arquivos principais

| Arquivo | Responsabilidade hoje |
|---------|------------------------|
| `index.html` ~1694–1985 | Markup da seção `#projects`, 5× `.project-card`, carrossel interno de imagens, `onclick` globais |
| `styles.css` ~614–970+ (e buscas por `.project-`, `#projects`) | Layout carrossel, card glass, imagem, tags, indicadores, nav oculta |
| `script.js` ~1746–2050+ (carrossel), ~2600 `toggleDescription` | `changeProject`, `goToProject`, `changeImage`, `goToImage`, swipe, `totalProjects = 5` fixo |
| `script.js` `translations.*.projects` | Títulos, descrições, readMore, labels de links |

---

## Fase 0 — Decisão de UX (**FECHADA**)

Spec: `docs/superpowers/specs/2026-05-16-portfolio-projetos-design.md`

- **Layout:** **Híbrido** — rail de índice (5 projetos) + painel de detalhe no **desktop**; lista empilhada + detalhe abaixo no **mobile**.
- **Conteúdo:** **C** — resumo/tagline + “Ver mais” com texto técnico completo (i18n em `script.js`).
- **Fortão:** **B** — primeiro no índice + badge **Em produção** (EN: Live / In production) + destaque visual **leve** (âmbar, sem glow exagerado).

**Critério de aceite:** Em ≤10 s um recrutador vê **os 5 projetos**, identifica **Fortão** como âncora e abre o detalhe com **o quê** + **como**.

---

## Fase 1 — Conteúdo, i18n e políticas (CLAUDE.md)

- [ ] **Fortão:** Garantir texto PT/EN com **“ações promocionais”** / “promotional campaigns” (não “rifas”). Alinhar bullets ao hero (pagamentos, NF, cache) se desejado — texto só em `script.js` (`project1Description`) + fallback mínimo no HTML se existir.
- [ ] **Consistência de idioma:** No print, descrição apareceu em **EN** na UI; revisar `updatePageLanguage`, `document.documentElement.lang` ao abrir `#projects`, e se algum nó não recebe `data-i18n` atualizado.
- [ ] **Links:** Verificar HTTP 200 para: site Fortão, Cardápio Railway, Moraes, repos GitHub (Roteiro, XML, Moraes). `rel="noopener noreferrer"` em `target="_blank"` (regra já existe em `script.js` — conferir todos os `<a>` da seção).
- [ ] **Fortão / Cardápio:** Onde faltar, adicionar segundo link “Código” se houver repo público (opcional; não inventar URL).

**Teste manual:** Alternar PT/EN com site em `#projects`; todos os títulos e descrições devem mudar; nenhum parágrafo “preso” em um idioma só.

---

## Fase 2 — Acessibilidade e semântica

- [ ] **Landmarks:** `<section id="projects" aria-labelledby="...">`; heading único coerente (`h2` para título de seção).
- [ ] **Carrossel:** Botões/anterior/próximo com `aria-label` (PT/EN via `data-i18n` ou `aria-label` setado no JS). Indicadores como `role="tablist"` / `role="tab"` **ou** botões com `aria-selected` — escolher um padrão e documentar.
- [ ] **Foco visível:** Estados `:focus-visible` em `.project-link`, botões de imagem, indicadores.
- [ ] **Motion:** Respeitar `prefers-reduced-motion` para transições do card (já há padrões no site para hero/skills).

---

## Fase 3 — Performance (imagem e JS)

- [ ] **`loading="lazy"`** em imagens que não são LCP (primeiro slide do primeiro projeto pode ser `eager` + `fetchpriority="high"` se for LCP da seção).
- [ ] **Dimensões:** `width`/`height` ou aspect-ratio no container para reduzir CLS.
- [ ] **`totalProjects`:** Trocar constante `5` por `document.querySelectorAll('.project-card').length` (ou por `PROJECTS_DATA.length` após refator) para não divergir ao adicionar projeto.

---

## Fase 4 — Redesign visual (após Fase 0)

Implementação depende da opção A/B/C. Escopo típico:

- [ ] **Header da seção:** Alinhar ao padrão “Agency/Skills” (eyebrow, título, subtítulo) sem `!important` inline excessivo em `#projects` se possível migrar para classes utilitárias ou CSS scoped `#projects .section-title`.
- [ ] **Card:** Borda/sombra/glass coerentes com `.about-glass-card` / skills (evitar brilho exagerado no hover se o usuário preferir minimal — espelhar ajuste do card Oportunidades).
- [ ] **Tags:** Grid/flex com wrap; tamanho mínimo tocável (44px) no mobile.
- [ ] **Navegação entre projetos:** Se mantiver carrossel, **reativar ou substituir** setas laterais (hoje `display: none`) **ou** strip de thumbnails; garantir que teclado e leitor não dependam só de swipe.
- [ ] **Microcopy:** “Ver mais” pode virar `<button type="button">` explícito com estado expandido `aria-expanded`.

**Teste manual:** Chrome + Firefox; larguras 360px, 768px, 1280px; teclado Tab através dos controles.

---

## Fase 5 — Refator opcional (manutenibilidade)

- [ ] Definir em `script.js` algo como `const PROJECTS = [{ id, slug, images: [...], tech: [...], links: [...] }, ...]` **apenas** se reduzir duplicação; na primeira iteração pode **não** valer o risco — avaliar após Fase 4 estável.
- [ ] Se injetar HTML via template string, sanitizar URLs e textos; manter i18n como hoje (chaves em `translations`) ou gerar textos a partir das mesmas chaves.

---

## Fase 6 — Verificação final

- [ ] Nenhum `console.error` ao trocar projeto e ao trocar imagem interna.
- [ ] Swipe em touch não conflita com scroll da página (já há `touch-action`; retestar após mudar layout).
- [ ] Atualizar `ANALISE-PORTFOLIO.md` / `docs/cerebro/PROJETOS.md` com uma linha sobre o novo padrão da seção (opcional).
- [ ] Bump `?v=` em `<script src="script.js?v=...">` se usar cache agressivo no GitHub Pages.

---

## Riscos e mitigação

| Risco | Mitigação |
|-------|-----------|
| `styles.css` grande e cascata imprevisível | Mudanças scoped em `#projects ...`; evitar regras globais `.btn` |
| Regressão no swipe | Manter funções `initSwipeForCarousels` / isolates; testar após cada alteração estrutural |
| i18n quebrada ao clonar HTML | Sempre duplicar `data-i18n` + nós espelhados; rodar `updatePageLanguage` após injeção se fizer Fase 5 |

---

## Próximo passo imediato

1. Responder **Fase 0** (A, B ou C) no chat.  
2. Executar **Fase 1** em um único PR/commit lógico (“conteúdo + links + i18n”).  
3. Em seguida **Fase 4** conforme wireframe escolhido.

**Plano salvo em:** `docs/superpowers/plans/2026-05-16-secao-projetos-redesign.md`
