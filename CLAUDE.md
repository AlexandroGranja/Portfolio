# Portfolio — Alexandro Granja | CLAUDE CONTEXT

> Leia este arquivo antes de editar qualquer coisa no portfólio.
> Docs completos: [[docs/cerebro/CEREBRO]] (Obsidian) ou `docs/cerebro/`

## MCPs e orquestração (ativos desde 2026-05-14)

- **MCPs:** `obsidian`, `playwright`, `filesystem`, `github`, `paperclip` — use Obsidian MCP **antes** de reler notas do cerebro (economiza token); Paperclip para orquestrar agentes/issues no painel Paperclip (`PAPERCLIP_COMPANY_ID`, `PAPERCLIP_API_KEY`; ver MCP-SETUP)
- **Cursor = orquestrador primário; Claude Code = worker headless** via `claude --print "..." --output-format json`
- **Antes de qualquer tarefa nova:** consultar a skill `task-router` para decidir rota
- **Tarefas delegadas:** registrar em [[docs/cerebro/TAREFAS-ATIVAS]] antes; mover pra [[docs/cerebro/HISTORICO]] ao concluir
- Setup completo: [[docs/cerebro/MCP-SETUP]]

---

## Identidade
- **Nome:** Alexandro Granja
- **Role:** Fullstack Dev + Especialista em Automações
- **Local:** Rio de Janeiro/RJ
- **Email:** alexxx.granja@gmail.com | alex.granjaaa@hotmail.com
- **LinkedIn:** linkedin.com/in/alexandro-granja-1b1393157
- **GitHub:** github.com/AlexandroGranja
- **Portfolio URL:** alexandrogranja.github.io/Portfolio/
- **Agência:** AIverse Technologies — aiversetechnologies.com.br

## Stack Principal
Python · JavaScript · React · Next.js · Flask/FastAPI · PostgreSQL · Supabase · n8n · Redis · Tailwind · Vercel · Railway

---

## Arquivos do Portfólio
| Arquivo | Papel |
|---|---|
| `index.html` | Site OFICIAL (~100k chars) — Hero, Sobre, Agência, Skills, Projetos, Contato |
| `code.html` | Rascunho/variante (não é o principal) |
| `styles.css` | ~2500 linhas — variáveis CSS + Tailwind CDN + animações |
| `script.js` | ~1350 linhas — navegação, i18n PT/EN, carrossel, swipe |
| `Curriculo_Alexandro_Granja.md` | CV completo em Markdown |
| `ANALISE-PORTFOLIO.md` | Análise técnica + pontos a melhorar |
| `FORTAO-DADOS-PARA-VAGAS.md` | Dados técnicos Fortão para vagas/entrevistas |
| `LINKEDIN-FORTAO-PERFIL.md` | Textos prontos para LinkedIn |

---

## Projetos no Portfólio (carrossel index.html)
1. **Fortão Prêmios** — Next.js 14, React 18, Supabase/PG, Redis, JWT, bcrypt, Railway | https://xn--fortoprmios-c8a8g.com.br/
2. **Burger House (Cardápio)** — React, Python/Flask, PostgreSQL/Supabase | http://cardapio.up.railway.app/
3. **Moraes Adesivos** — Vitrine + SEO | http://moraesadesivos.com.br/
4. **Prosper Roteiros** — (verificar link)
5. **Processador XML** — (verificar link)

---

## Regras CRÍTICAS de Edição
- `AIverse` — sempre assim, NUNCA "Alverse" (typo que existe no code.html)
- Fortão = **"ações promocionais"** em contextos B2B (nunca "rifas")
- **i18n:** textos PT e EN vivem no `script.js` — NÃO no HTML direto
- **index.html** é o oficial; `code.html` é rascunho
- Verificar links ativos antes de commitar qualquer mudança
- Não mexer em `styles.css` sem entender escopo — arquivo grande, regras cascateiam

## Identidade Visual
- Tema escuro · Acento **#F59E0B** (laranja/âmbar)
- Fontes: Plus Jakarta Sans (títulos), Inter (corpo/UI)
- Ícones: Material Icons + Font Awesome

---

## Experiência (para manter consistência nos textos)
| Empresa | Role | Período |
|---|---|---|
| Prosper | Analista Suporte TI | 11/2024 – Atual |
| AIverse Technologies | Fullstack + Automações | 06/2025 – atual |

### Conquistas-chave para mencionar
- Automações n8n + Python + WhatsApp API → **-80% tempo atendimento**
- Fortão Prêmios: cache Redis → **-71% latência**, **+114% RPS**, **200+ usuários simultâneos**

---

## Números Fortão (para entrevistas/vagas)
- ~64 rotas API · 13+ tabelas PG · 7+ módulos admin
- 174 RPS pós-otimização (antes: 81) · P95 498ms (antes: 1612ms)

---

## Pontos Pendentes (da ANALISE-PORTFOLIO.md)
- [ ] Corrigir "Alverse" → "AIverse" no code.html
- [ ] Confirmar todos os links de projetos (GitHub + sites)
- [ ] Definir se code.html é variante ou descartar
- [ ] Adicionar link Fortão em produção se não estiver no card

---

---

## Sistema de Memória — Regras de Auto-Atualização

> Claude DEVE atualizar o cerebro sempre que novo conhecimento surgir.

### Quando atualizar (obrigatório)
- Novo projeto criado → adicionar em [[docs/cerebro/PROJETOS]] e [[docs/cerebro/GITHUB-REPOSITORIOS]]
- Nova tecnologia aprendida/usada → atualizar [[docs/cerebro/STACK-COMPLETO]]
- Mudança de padrão arquitetural → atualizar [[docs/cerebro/PADROES-ARQUITETURA]]
- Decisão técnica relevante → append em [[docs/cerebro/HISTORICO]]
- Mudança de posicionamento profissional → atualizar [[docs/cerebro/IDENTIDADE]]
- Novo dado sobre Prosper (sistemas, infra, responsabilidades) → [[docs/cerebro/PROSPER-CONTEXTO]]
- Novo cliente ou produto AIverse → [[docs/cerebro/AIVERSE-CONTEXTO]]
- Qualquer mudança significativa → append em [[docs/cerebro/HISTORICO]] com data

### Onde escrever cada coisa
| Mudança | Nota |
|---|---|
| Novo projeto | PROJETOS + GITHUB-REPOSITORIOS |
| Nova tech | STACK-COMPLETO |
| Novo padrão arquitetural | PADROES-ARQUITETURA |
| Como Alexandro trabalha | MODO-TRABALHO |
| Trabalho na Prosper | PROSPER-CONTEXTO |
| AIverse / clientes | AIVERSE-CONTEXTO |
| Decisão importante | HISTORICO (append-only) |
| Mudança identidade/posição | IDENTIDADE |

### Regra de ouro
**NUNCA sobrescrever HISTORICO.md** — sempre `obsidian_append_content` ou append no final.
Demais notas: editar seção específica, não substituir arquivo inteiro.

---

*Docs detalhados em `docs/cerebro/` — compatível com Obsidian.*
