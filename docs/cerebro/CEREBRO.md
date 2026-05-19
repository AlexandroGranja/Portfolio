# 🧠 Cérebro — Portfolio Alexandro Granja

> Índice principal. Abrir `docs/cerebro/` como vault no Obsidian para navegação visual.
> Claude Code lê [[../../CLAUDE.md]] automaticamente ao entrar na pasta Portfolio.

---

## Mapa de Notas

### Identidade e Projeto
| Nota | Conteúdo |
|---|---|
| [[IDENTIDADE]] | Quem é Alexandro — perfil, stack, contatos, formação |
| [[PROJETOS]] | Detalhes técnicos de cada projeto do portfólio |
| [[REGRAS-EDICAO]] | Regras e convenções para não quebrar o site |
| [[VISUAL]] | Sistema de design: cores, fontes, layout, animações |
| [[HISTORICO]] | Decisões tomadas, motivos, template para novas entradas |
| [[AIVERSE-MONETIZACAO]] | Plano de monetização AIverse — produtos SaaS, serviços, templates, priorização |

### Conhecimento Técnico
| Nota | Conteúdo |
|---|---|
| [[FRONTEND-DESIGN]] | Regras de UI profissional: cores, tipografia, CUBE CSS, acessibilidade |
| [[BACKEND-REGRAS]] | APIs REST, PostgreSQL, Redis, n8n, autenticação, logging |
| [[SEGURANCA-OWASP]] | OWASP Top 10 + checklist de segurança + headers |
| [[CLAUDE-CODE-BOAS-PRATICAS]] | Boas práticas oficiais Anthropic para Claude Code |

---

## Quick Nav

- **Site em prod:** alexandrogranja.github.io/Portfolio/
- **Agência:** aiversetechnologies.com.br
- **Arquivo principal:** `index.html`
- **i18n:** `script.js` (PT/EN)
- **Análise completa:** `ANALISE-PORTFOLIO.md`
- **Currículo:** `Curriculo_Alexandro_Granja.md`

---

## Ferramentas Instaladas

### MCPs ativos (Cursor + Claude Code)
| MCP | Uso |
|---|---|
| `obsidian` | Ler/escrever notas deste cerebro via REST API (porta 27124) |
| `playwright` | Browser automation para LinkedIn Easy Apply |
| `filesystem` | Acesso restrito à pasta Portfolio |
| `github` | Commits/PRs (requer `GITHUB_PERSONAL_ACCESS_TOKEN` em env) |
| `paperclip` | Orquestração de agentes (Paperclip): issues, aprovações, metas, custos — requer instância + `PAPERCLIP_COMPANY_ID` e API key ([paperclip-mcp](https://github.com/elevateinformatics/paperclip-mcp)) |

Detalhes: [[MCP-SETUP]]

### Skills locais (`~/.claude/skills/`)
| Skill | Função |
|---|---|
| `task-router` | Decide rota Cursor vs Claude Code headless |
| `linkedin-easy-apply` | Fluxo Easy Apply com anti-ban |
| `cv-tailor` | Adapta CV por vaga (sem inventar) |
| `job-matcher` | Score de fit vaga vs perfil |
| `obsidian-context-reader` | Leitura cirúrgica deste cerebro |
| `frontend-design` | Pré-existente — UI profissional |
| `security-check` | Pré-existente — auditoria DietIA |

### Outras
| Ferramenta | Uso |
|---|---|
| `/yt-search <query>` | Buscar vídeos no YouTube (yt-dlp) |
| `notebooklm` CLI | Criar notebooks e subir fontes no NotebookLM |
| `caveman` skill | Economizar tokens na comunicação |
| `claude-mem` plugin | Memória semântica cross-session |

---

## Arquitetura de Orquestração

- **Cursor = primário** (chat visual, multi-edit, hot reload)
- **Claude Code = worker headless** chamado via `claude --print` para batch/CLI longo
- **Memória compartilhada:** claude-mem + [[HISTORICO]] + [[TAREFAS-ATIVAS]]

Ver [[TAREFAS-ATIVAS]] para tarefas em andamento.

---

## Status Atual (2026-05)

- [x] CLAUDE.md na raiz — contexto automático para Claude Code
- [x] Cerebro criado com 9 notas Obsidian interligadas
- [x] Skill yt-search instalada
- [x] notebooklm-py instalado + login feito
- [x] **MCPs configurados (obsidian, playwright, filesystem, github, paperclip) em Cursor e Claude Code** — Paperclip requer instância + `PAPERCLIP_COMPANY_ID` / `PAPERCLIP_API_KEY` (ver [[MCP-SETUP]])
- [x] **5 skills novas criadas (task-router, linkedin-easy-apply, cv-tailor, job-matcher, obsidian-context-reader)**
- [x] **TAREFAS-ATIVAS.md criado para orquestração**
- [ ] Setar `GITHUB_PERSONAL_ACCESS_TOKEN` via `setx` para ativar GitHub MCP
- [ ] Fazer login LinkedIn no profile Playwright `portfolio-profile`
- [ ] Implementar o agente LinkedIn (próxima sessão — usa as skills criadas)
- [x] **Aba de habilidades redesenhada (2026-05-14)** — padrão Agency, glass-card laranja, level bars animadas, responsivo 2/3/4/5/6 cols
- [ ] Corrigir "Alverse" → "AIverse" no code.html
- [ ] Verificar links Prosper Roteiros e Processador XML
- [ ] Definir destino de code.html (manter ou descartar)

---

## Como Usar Este Cerebro

**Para editar portfolio:** abrir `Portfolio/` no Claude Code — CLAUDE.md é lido automaticamente.

**Para pesquisar:** `/yt-search <tema> --count 10`

**Para novas decisões:** registrar em [[HISTORICO]] com data e motivo.

**Para novos projetos:** adicionar entrada em [[PROJETOS]] com stack e links.

---

*Wiki links funcionam no Obsidian. No VS Code usar extensão "Foam" ou "Obsidian.md".*
