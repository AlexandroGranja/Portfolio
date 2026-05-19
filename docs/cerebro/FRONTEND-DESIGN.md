# Frontend Design — Regras Profissionais

> Fontes: Refactoring UI · CUBE CSS · Build Great Products (158K views) · AI LABS (85K views)

---

## Sistema de Cores (Refactoring UI)

### Estrutura de Paleta em 3 Camadas
1. **Cinzas** — fundação: textos, backgrounds, painéis, controles (8–10 tons)
2. **Cor primária** — identidade visual; 5–10 tons para backgrounds + textos
3. **Cores de acento** — estados (sucesso, alerta, erro); múltiplos tons

### Regras de Cor
- **Não usar** `lighten()`/`darken()` do CSS preprocessor — cria inconsistência
- Definir escala de 9 tons (100, 200...900) **upfront**
- Escolher base → extremos (mais escuro para texto, mais claro para background) → preencher meio
- Evitar preto puro — usar cinza muito escuro
- Decisões baseadas em contexto visual, não matemática
- Não adicionar tons novos constantemente — resistir à tentação

### Para o Portfolio
- Primária: `#F59E0B` (âmbar/laranja)
- Escala de cinzas: definir 9 tons consistentes
- Acento: cor para estados de hover, focus, erro

---

## CUBE CSS — Metodologia de CSS Profissional

### C — Composition (Layout)
Controla ritmo e estrutura geral. Funciona como esqueleto independente dos componentes.
```css
.flow > * + * { margin-top: var(--flow-space, 1em); }
.cluster { display: flex; flex-wrap: wrap; gap: var(--cluster-space, 1rem); }
```

### U — Utilities (Uma responsabilidade)
Classes de propósito único. Geradas de design tokens.
```css
.text-primary { color: var(--color-primary); }
.font-bold { font-weight: 700; }
```

### B — Block (Componente)
CSS de bloco é mínimo — composition + utilities fazem o trabalho pesado.
```css
.card { padding: var(--card-padding, 1.5rem); }
```

### E — Exception (Estado via data-attribute)
Variações com `data-*` — hook para CSS E JavaScript sem poluir classes.
```css
.button[data-variant="ghost"] { background: transparent; }
[data-state="loading"] .spinner { display: block; }
```

### Princípio CUBE
Usar a cascade como aliada, não inimiga. Estilos globais e de alto nível fazem a maior parte do trabalho.

---

## Regras de Tipografia

- **Hierarquia:** máximo 2–3 tamanhos de fonte por componente
- **Line height:** 1.5 para body, 1.2–1.3 para títulos
- **Measure (largura):** 45–75 caracteres por linha para leitura confortável
- **Nunca** usar fonte system default sem definir fallback
- **Scale:** usar escala modular (ex: Major Third 1.25)

---

## Regras de Espaçamento

- Usar escala de espaçamento consistente: 4px, 8px, 16px, 24px, 32px, 48px, 64px...
- Espaçamento entre elementos relacionados: menor
- Espaçamento entre grupos distintos: maior
- Sempre mais padding do que acha necessário

---

## Regras de Layout

- Mobile-first: escrever CSS mobile, sobrescrever para desktop
- Max-width no container: 1200–1440px máximo
- Grid de 12 colunas para layouts complexos
- CSS Grid para layout 2D, Flexbox para 1D

---

## Responsividade

```css
/* Mobile first */
.container { padding: 1rem; }

@media (min-width: 768px) { .container { padding: 2rem; } }
@media (min-width: 1024px) { .container { padding: 3rem; max-width: 1200px; margin: 0 auto; } }
```

---

## Acessibilidade (obrigatório)

- `prefers-reduced-motion`: reduzir/eliminar animações
- Foco visível em todos elementos interativos (`:focus-visible`)
- Contraste mínimo: 4.5:1 para texto normal, 3:1 para texto grande
- Alt text em todas imagens
- Semântica HTML correta (não usar `div` para botão)
- Safe area iOS: `env(safe-area-inset-*)`

---

## Performance Frontend

- Lazy load imagens (`loading="lazy"`)
- CSS crítico inline; resto em arquivo externo
- Minimizar animações em mobile (CPU/bateria)
- Evitar fonts do Google sem `font-display: swap`
- Limitar requests externos em first load

---

## Claude Code + Frontend (videos de referência)

| Vídeo | Canal | Views | URL |
|---|---|---|---|
| Build ACTUALLY Beautiful UI With Claude Code Skill | Build Great Products (51K) | 158K | https://youtube.com/watch?v=95_NJ-a-CMQ |
| 5 Ways To Build Beautiful Websites Using Claude Code | AI LABS (132K) | 85K | https://youtube.com/watch?v=VGYsHicpp34 |
| Claude Just Introduced a New Way To Fix Your UI | AI LABS (132K) | 72K | https://youtube.com/watch?v=eLDq5TfIHys |
| Claude Code + Playwright MCP Subagents para UI | Patrick Ellis (23K) | 292K | https://youtube.com/watch?v=xOO8Wt_i72s |

---

## Checklist UI — Antes de Entregar

```
[ ] Cores consistentes com design tokens / variáveis CSS
[ ] Responsivo testado: mobile (375px), tablet (768px), desktop (1280px)
[ ] prefers-reduced-motion respeitado
[ ] Foco visível em todos interativos
[ ] Contraste verificado
[ ] Imagens com alt text
[ ] Fontes com fallback
[ ] Loading states implementados
[ ] Empty states implementados
[ ] Erro states implementados
```

---

*Voltar: [[CEREBRO]]*
