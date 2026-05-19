# Design — Aba Projetos (Portfolio)

> Decisões validadas com Alexandro Granja (brainstorm 2026-05).  
> Escopo: **somente** `#projects` em `index.html` + CSS/JS associados.

---

## 1. Objetivo

- **Visitante-alvo:** recrutador técnico (e secundário: cliente/lead).
- **Mensagem:** entender **o que** foi entregue, **valor**, e **como** foi feito (stack + implementação), sem parecer catálogo genérico.
- **Decisões de produto:**
  - **C:** resumo curto visível + detalhe expandível (“o quê” → “como”).
  - **B:** **Fortão Prêmios** como **âncora** no índice (primeiro + destaque leve + badge “Em produção” PT / equivalente EN).
  - **Layout:** **híbrido** — índice de projetos sempre visível no desktop; lista empilhada no mobile com detalhe abaixo do item ativo.

---

## 2. Desktop (≥ 1024px)

```
┌─────────────────────────────────────────────────────────────┐
│  PROJETOS / Meus Projetos / subtítulo                        │
├────────────────┬────────────────────────────────────────────┤
│ Índice (rail)  │  Painel do projeto ativo                    │
│ (~32–36% lar.) │  (~64–68%)                                  │
│                │                                             │
│ [★ Fortão]     │  Galeria screenshots (swipe interno)        │
│   badge prod.  │  Título + subtítulo valor (1–2 linhas)    │
│ [ Cardápio ]   │  Tags tech                                  │
│ [ Moraes   ]   │  Links (site, GitHub conforme existir)     │
│ [ Roteiros ]   │  “Ver mais” → texto longo i18n             │
│ [ XML      ]   │                                             │
│                │                                             │
│ (scroll se     │                                             │
│  necessário)   │                                             │
└────────────────┴────────────────────────────────────────────┘
```

- **Item ativo** no rail: borda âmbar suave ou fundo `primary/10`; **Fortão** adicionalmente com badge pequeno (não ocupa altura de banner).
- **Setas laterais** do carrossel **global** de projetos: **não obrigatórias** se o rail substituir; teclado opcional: setas focadas no rail (acessibilidade).

---

## 3. Mobile (< 768px)

- **Menu mobile:** faixa de **chips horizontais** (thumb + título, ~100px), scroll lateral + snap suave; destaque do ativo com **anel** âmbar. O **card** (imagem + faixa inferior) fica **logo abaixo** do menu.
- **Painel:** imagem **sem corte** (`object-fit: contain`, `max-height` ao viewport); carrossel no mobile usa slide ativo em **fluxo** para a altura acompanhar a arte — footer encosta logo abaixo.
- **Faixa inferior:** título e botão **“Ver detalhes”** empilhados (botão largura total).
- **Fortão:** mesmo destaque B (badge + primeiro).
- Área tocável mínima confortável nos itens do rail (~48px altura).
- Ao trocar de projeto, o item ativo no rail faz **`scrollIntoView`** suave no mobile.

---

## 4. Conteúdo e i18n

- **Textos longos** só em `script.js` (`translations.pt/en.projects.*`) — não duplicar parágrafos só no HTML.
- **Novo (se necessário):** chaves `projectNTagline` ou reutilizar primeiras frases da description no painel; manter **Fortão** alinhado a **ações promocionais** (nunca “rifas”), coerente com `CLAUDE.md`.
- **PT/EN:** ao trocar idioma, rail + painel + badges + `aria-label` dos botões devem atualizar (`updatePageLanguage`).
- **Links:** `rel="noopener noreferrer"` em `target="_blank"`; verificar URLs vivas antes de publicar.

---

## 5. Fortão (política B)

- Sempre **primeiro** no índice.
- **Badge:** texto PT `Em produção` / EN `Live` ou `In production` (confirmar tom na implementação).
- Destaque visual **leve:** borda `--primary` ligeiramente mais forte ou etiqueta pill; **sem** glow agressivo (alinhado ao ajuste “Oportunidades” na aba Sobre).

---

## 6. Acessibilidade

- `aria-current="true"` ou equivalente no item de rail ativo.
- Galeria: botões anterior/próxima com `aria-label` i18n; indicadores com papel semântico coerente (`tab` ou `button`).
- `prefers-reduced-motion`: reduzir transições de troca de projeto.

---

## 7. Performance

- `loading="lazy"` nas imagens que não são LCP do primeiro projeto; primeira imagem do primeiro slide pode ser `eager` se necessário.
- Dimensões ou `aspect-ratio` no container da galeria para limitar CLS.
- `totalProjects` derivado do DOM ou de uma única fonte de verdade (evitar `5` mágico divergente).

---

## 8. Fora de escopo (esta fase)

- Refator grande para JSON `PROJECTS_DATA` **opcional** só depois do layout estável.
- Paperclip, outros MCPs, novos projetos além dos 5 atuais (adicionar projeto = tarefa futura com mesma estrutura).

---

## 9. Arquivos impactados

| Arquivo | Mudança esperada |
|---------|------------------|
| `index.html` | Nova estrutura `#projects`: rail + painel; reduzir 5× cards monolíticos duplicados se possível na mesma PR incremental |
| `styles.css` | Novos blocos scoped `#projects` para grid rail+painel, mobile stack, badge Fortão |
| `script.js` | Seleção de projeto ativo, sync rail↔painel, i18n novas chaves, `totalProjects` dinâmico, regressão zero nos swipes internos |
| `docs/superpowers/plans/2026-05-16-secao-projetos-redesign.md` | Atualizar Fase 0 com decisões finais (opcional) |

---

## 10. Critérios de aceite

- [ ] Os **5 projetos** são discerníveis **sem** avançar carrossel “cego”.
- [ ] Fortão é **reconhecível** como âncora (B) sem poluir.
- [ ] **C:** tagline/resumo visível; detalhe completo em “Ver mais” ou seção expansível.
- [ ] **PT e EN** consistentes na seção inteira.
- [ ] Lighthouse: sem regressão grave de CLS na seção; touch usável em 360px.

---

## 11. Próximo passo (implementação)

Atualizar o **implementation plan** em `docs/superpowers/plans/2026-05-16-secao-projetos-redesign.md` com tarefas ordenadas (HTML → JS → CSS → conteúdo → QA).

**Aprovação:** alterações de código só após você confirmar que este spec está OK (“pode implementar”).
