# Regras de Edição — Portfolio

> Ler ANTES de qualquer edição. Claude: estas regras previnem bugs e inconsistências.

---

## Regras CRÍTICAS

### Nomenclatura
- `AIverse Technologies` — forma correta. NUNCA "Alverse" (typo existe no code.html)
- `Fortão Prêmios` — usar "ações" ou "campanhas" em contextos B2B, nunca "rifas"

### i18n (PT/EN)
- Textos traduzíveis vivem no `script.js` — objeto de traduções
- NÃO escrever texto fixo no HTML para conteúdo que precisa de tradução
- Sempre adicionar em PT e EN ao mesmo tempo

### Arquivo oficial
- `index.html` = versão principal/oficial
- `code.html` = rascunho — não é mantido sincronizado com index.html

### Links
- Verificar se todos os links estão ativos antes de commitar
- Fortão prod: https://xn--fortoprmios-c8a8g.com.br/
- Burger House: http://cardapio.up.railway.app/
- Moraes: http://moraesadesivos.com.br/
- LinkedIn: linkedin.com/in/alexandro-granja-1b1393157
- GitHub: github.com/AlexandroGranja

---

## Estrutura de Arquivos

```
Portfolio/
├── index.html          ← site oficial
├── styles.css          ← ~2500 linhas (cuidado: regras cascateiam)
├── script.js           ← ~1350 linhas (i18n aqui)
├── code.html           ← rascunho
├── CLAUDE.md           ← contexto para Claude Code
├── ANALISE-PORTFOLIO.md
├── Curriculo_Alexandro_Granja.md
├── FORTAO-DADOS-PARA-VAGAS.md
├── LINKEDIN-FORTAO-PERFIL.md
├── assets/             ← imagens
├── search_images/
└── docs/
    ├── superpowers/
    │   ├── plans/
    │   └── specs/
    └── cerebro/        ← este cerebro (Obsidian)
```

---

## CSS — Cuidados
- `styles.css` grande (~2500 linhas): editar scope específico, não global
- Variáveis CSS definidas no `:root` — preferir mudar variável, não valor direto
- Tema escuro base — acento `#F59E0B` (laranja/âmbar)
- Animações: respeitar `prefers-reduced-motion` (já implementado)
- Media queries: mobile-first já implementado

---

## JavaScript — Cuidados
- `script.js` é monolítico (~1350 linhas): navegação + i18n + carrossel + swipe
- Carrossel com imagens múltiplas por projeto — editar array de projetos com cuidado
- `localStorage` persiste idioma escolhido — testar troca PT↔EN após edições
- Swipe/drag funciona em mobile — testar se tocar em navegação de projetos

---

## HTML — Cuidados
- `index.html` >100k chars — buscar por ID/classe antes de editar
- Seções trocam sem reload (SPA-like via JS) — não criar âncoras que dependam de scroll tradicional
- Safe area iOS já implementada no CSS

---

## Quando Terminar Edição
1. Confirmar que "AIverse" está correto em todos os textos editados
2. Verificar i18n: tradução EN adicionada se PT foi adicionado?
3. Testar links novos/modificados
4. Checar responsividade mobile se mudou layout

---

*Voltar: [[CEREBRO]]*
