# Claude Code — Boas Práticas Oficiais (Anthropic)

> Fonte: https://code.claude.com/docs/en/best-practices

---

## Princípio central

**Contexto é o recurso mais crítico.** Quanto mais cheio o context window, pior a performance. Gerencie agressivamente.

---

## CLAUDE.md — Regras

### Incluir
- Comandos Bash que Claude não adivinha
- Regras de estilo que diferem do padrão
- Instruções de teste e test runners preferidos
- Etiqueta do repositório (nomes de branch, convenções de PR)
- Decisões arquiteturais específicas do projeto
- Quirks de ambiente (env vars obrigatórias)
- Gotchas e comportamentos não-óbvios

### NÃO incluir
- O que Claude já descobre lendo o código
- Convenções padrão de linguagem
- Documentação detalhada de API (linkar ao invés)
- Informações que mudam frequentemente
- Explicações longas ou tutoriais
- Descrições arquivo por arquivo
- Práticas óbvias como "escreva código limpo"

### Regras de ouro CLAUDE.md
- Manter **curto e legível** — arquivo gordo = Claude ignora regras
- Para cada linha: *"Remover isso faria Claude errar?"* Se não → cortar
- Usar `IMPORTANT` ou `YOU MUST` para aderência crítica
- Fazer commit no git — o time pode contribuir
- Pode importar outros arquivos: `@docs/git-instructions.md`
- Localidades: `~/.claude/CLAUDE.md` (global) · `./CLAUDE.md` (projeto) · `./CLAUDE.local.md` (pessoal, no .gitignore)

---

## Workflow: Explorar → Planejar → Implementar → Commitar

```
1. EXPLORE   — Plan mode: Claude lê arquivos sem editar
2. PLAN      — Pedir plano detalhado; editar com Ctrl+G
3. IMPLEMENT — Sair do plan mode; Claude codifica + testa
4. COMMIT    — Claude commita com mensagem descritiva + abre PR
```

**Pular planejamento quando:** tarefa cabe em 1 frase, fix pequeno (typo, log, rename).
**Usar planejamento quando:** múltiplos arquivos, abordagem incerta, código desconhecido.

---

## Prompts Eficazes

| Ruim | Bom |
|---|---|
| "add tests for foo.py" | "write a test for foo.py covering the edge case where user is logged out. avoid mocks." |
| "fix the login bug" | "users report login fails after session timeout. check src/auth/, especially token refresh. write failing test, then fix it" |
| "make dashboard look better" | "[screenshot] implement this design. take screenshot of result, compare, list differences, fix them" |

### Fornecer contexto rico
- `@arquivo` — Claude lê antes de responder
- Colar screenshots/imagens direto no prompt
- URLs de docs e referências de API
- `cat error.log | claude` — pipe de dados
- Deixar Claude buscar o que precisa via Bash/MCP

---

## Gestão de Contexto

- `/clear` — resetar entre tarefas não relacionadas
- `/compact <instrução>` — compactar com foco: `/compact Focus on the API changes`
- `Esc` — parar Claude; contexto preservado, pode redirecionar
- `Esc + Esc` / `/rewind` — restaurar estado anterior do código + conversa
- `/btw` — pergunta rápida que **não entra no histórico** (não polui contexto)
- `--continue` / `--resume` — retomar sessões anteriores

**No CLAUDE.md:** `"When compacting, always preserve the full list of modified files and any test commands"`

---

## Verificação — A Regra Mais Importante

> Claude performa dramaticamente melhor quando pode verificar o próprio trabalho.

- Sempre fornecer: testes, screenshots, outputs esperados
- Sem critérios de sucesso → Claude produz código que parece certo mas não funciona
- Se não pode verificar → não fazer deploy

---

## Subagentes

Usar para investigações pesadas — rodam em contexto separado:
```
Use subagents to investigate how our authentication system handles token refresh
```
Resultado: subagente lê arquivos, reporta resumo → contexto principal limpo.

---

## Falhas Comuns (evitar)

| Falha | Fix |
|---|---|
| Sessão "cozinha sink" — tarefas misturadas | `/clear` entre tarefas |
| Corrigir o mesmo erro 3x | `/clear` + prompt melhor incorporando o aprendizado |
| CLAUDE.md muito gordo | Podar sem dó — regra perdida = Claude ignora |
| Verificação zero | Sempre ter testes/scripts/screenshots |
| "investigate" sem escopo | Usar subagentes ou escopar narrowly |

---

## Automação / Scale

```bash
# Non-interactive para CI/scripts
claude -p "prompt" --output-format json

# Fan-out por arquivo
for file in $(cat files.txt); do
  claude -p "Migrate $file from React to Vue" --allowedTools "Edit,Bash(git commit *)"
done

# Auto mode (sem prompts)
claude --permission-mode auto -p "fix all lint errors"
```

---

## Skills (criar em `.claude/skills/`)

```markdown
---
name: api-conventions
description: REST API design conventions
---
- Use kebab-case para URL paths
- Use camelCase para JSON properties
- Sempre incluir paginação em list endpoints
- Versionar APIs na URL (/v1/, /v2/)
```

---

## Subagentes customizados (`.claude/agents/`)

```markdown
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---
Senior security engineer. Review for:
- Injection (SQL, XSS, command injection)
- Auth/authz flaws
- Secrets no código
- Tratamento inseguro de dados
```

---

*Fonte oficial: https://code.claude.com/docs/en/best-practices*
*Voltar: [[CEREBRO]]*
