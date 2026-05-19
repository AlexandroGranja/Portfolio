# MCP & Skills Setup — Cursor + Claude Code

> Configuração da infraestrutura MCP compartilhada entre Cursor (orquestrador primário) e Claude Code (worker headless).
> Implementado em 2026-05-14.

---

## MCPs ativos

| Servidor | Cursor | Claude Code | Comando | Uso |
|---|---|---|---|---|
| `obsidian` | ✓ | ✓ | `uvx mcp-obsidian` | Ler/escrever notas do cerebro |
| `playwright` | ✓ | ✓ | `npx @playwright/mcp@latest` | Browser automation (LinkedIn) |
| `filesystem` | ✓ | ✓ | `npx @modelcontextprotocol/server-filesystem` | Acesso à pasta Portfolio |
| `github` | ✓ | ✓ | `npx @modelcontextprotocol/server-github` | Commits/PRs (requer token) |
| `paperclip` | ✓ | ✓ | `uvx paperclip-mcp@latest --transport stdio` | Orquestração de agentes (issues, aprovações, custos) via API Paperclip |

## Arquivos de config

- **Cursor:** `C:\Users\alexg\.cursor\mcp.json`
- **Claude Code:** `C:\Users\alexg\.claude.json` (bloco `mcpServers`; ou `claude mcp add -s user`)

## Paperclip MCP — agentes (CEO / operador)

Integração oficial do ecossistema **[Paperclip](https://github.com/paperclipai/paperclip)** via pacote PyPI **`paperclip-mcp`** ([repo elevateinformatics/paperclip-mcp](https://github.com/elevateinformatics/paperclip-mcp)). Expõe a API REST como ferramentas MCP: issues, agentes, metas, aprovações, custos, atividade.

**Não confundir** com o repositório [matsjfunke/paperclip](https://github.com/matsjfunke/paperclip) (busca de *papers* acadêmicos); o da orquestração de agentes é o **paperclipai/paperclip**.

### Pré-requisitos

1. Instância **Paperclip** acessível (ex.: `http://localhost:3100` ou deploy tipo Railway).
2. **`PAPERCLIP_COMPANY_ID`** — UUID da empresa (aparece na URL / painel).
3. Autenticação **uma das opções**:
   - **`PAPERCLIP_API_KEY`** — chave de API (Settings → API Keys), **recomendado**; ou
   - **`PAPERCLIP_SESSION_TOKEN`** — cookie `__Secure-better-auth.session_token` (menos ideal; expira).

4. Opcional: **`PAPERCLIP_BASE_URL`** — padrão do servidor é `http://localhost:3100/api`. Para SaaS hospedado, defina a URL base da API (ex.: `https://seu-paperclip.railway.app/api`).

### Windows (recomendado: variáveis de usuário)

```powershell
setx PAPERCLIP_COMPANY_ID "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
setx PAPERCLIP_API_KEY "sua_chave"
# só se não for local:
setx PAPERCLIP_BASE_URL "https://seu-dominio.com/api"
```

Feche e reabra Cursor e Claude Code. No **Cursor**, `mcp.json` já usa `"${PAPERCLIP_COMPANY_ID}"` e `"${PAPERCLIP_API_KEY}"`.

No **Claude Code**, preencha os mesmos valores em `mcpServers.paperclip.env` no `.claude.json` **ou** confie no `setx` (processo filho herda ambiente, conforme setup).

### Dependência local

O servidor roda com **`uvx`** (mesmo padrão do Obsidian). Ter [uv](https://docs.astral.sh/uv/) instalado; na primeira execução o `uvx` baixa o pacote.

### Smoke test

- Cursor → **Settings → MCP** → `paperclip` conectado.
- `claude mcp list` → entrada `paperclip`.

---

## Obsidian MCP — pré-requisitos

1. Plugin **Obsidian Local REST API** v3.6.2+ instalado e ativo
2. App Obsidian **aberto** com vault `docs/cerebro/` carregado (MCP fica offline se Obsidian fechado)
3. API key em `docs/cerebro/.obsidian/plugins/obsidian-local-rest-api/data.json` (já configurada)
4. Porta `27124` HTTPS

### Smoke test

```powershell
curl.exe -k -s -H "Authorization: Bearer <API_KEY>" https://127.0.0.1:27124/
```

Deve retornar `"authenticated": true`.

## Playwright MCP — profile persistente

- Profile dir: `C:\Users\alexg\AppData\Local\ms-playwright\portfolio-profile`
- Browser: `chrome` (canal real, melhor pra evadir detecção LinkedIn)
- **Primeira execução:** abrir o navegador manualmente uma vez e fazer login no LinkedIn — sessão fica salva nesse profile

## GitHub MCP — ativar token

Sem token configurado, o MCP carrega mas falha em qualquer chamada. Para ativar:

```powershell
# token classic com escopo: repo, read:org
setx GITHUB_PERSONAL_ACCESS_TOKEN "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Reiniciar Cursor e Claude Code após `setx` (env só carrega em novos processos).

> Nota: o pacote `@modelcontextprotocol/server-github` (npm) está em modo manutenção. Migrar para `ghcr.io/github/github-mcp-server` (Docker oficial GitHub) quando tiver tempo.

## Filesystem MCP — escopo restrito

Aponta **somente** para a pasta `C:\Users\alexg\OneDrive\Área de Trabalho\Portfolio`. Defesa em profundidade — qualquer prompt que tente acessar fora dessa pasta via MCP é bloqueado pelo próprio server.

---

## Skills locais

Localização: `C:\Users\alexg\.claude\skills\`

Disponíveis para Cursor **e** Claude Code (ambos leem do mesmo diretório).

| Skill | Função |
|---|---|
| `task-router/` | Decide se executa local (Cursor) ou delega ao Claude Code headless |
| `linkedin-easy-apply/` | Fluxo completo Easy Apply com anti-ban |
| `cv-tailor/` | Adapta CV por vaga sem inventar dados |
| `job-matcher/` | Score de fit vaga vs perfil |
| `obsidian-context-reader/` | Leitura cirúrgica do cerebro (economiza tokens) |

Skills pré-existentes mantidas:
- `frontend-design/` — design de UI profissional
- `security-check/` — auditoria de segurança projeto DietIA

---

## Memória híbrida

| Camada | Onde | Quando escrever |
|---|---|---|
| Busca semântica sessões passadas | claude-mem (plugin) | Auto ao fim de sessão |
| Tarefas em andamento | `docs/cerebro/TAREFAS-ATIVAS.md` | Antes de delegar (Cursor) |
| Decisões versionadas + log final | `docs/cerebro/HISTORICO.md` | Ao concluir tarefa |
| Candidaturas LinkedIn | `docs/cerebro/CANDIDATURAS.md` | Após cada apply (sucesso ou skip) |

---

## Troubleshooting

### Paperclip MCP não conecta / 401

- Instância Paperclip **no ar** e `PAPERCLIP_BASE_URL` correto se não for `http://localhost:3100/api`.
- Validar `PAPERCLIP_COMPANY_ID` e `PAPERCLIP_API_KEY` (ou sessão) no painel.
- `uv` / `uvx` instalados; teste: `uvx paperclip-mcp@latest --help`

### Obsidian MCP retorna 401

Verificar se a API key em `data.json` bate com a env var `OBSIDIAN_API_KEY` no `mcp.json` / `.claude.json`.

### Playwright MCP não abre janela

Profile dir pode estar corrompido. Deletar `portfolio-profile/` e refazer login.

### `uvx mcp-obsidian` lento na primeira vez

Normal — uv baixa dependências (~50MB). Após primeira execução fica em cache em `%LOCALAPPDATA%\uv\cache`.

### MCPs aparecem como "disconnected" no Cursor

Reiniciar Cursor completamente (não basta reload). Em caso de erro persistente, rodar `npx @modelcontextprotocol/inspector` para debug.

---

## Validação executada

| Teste | Resultado |
|---|---|
| Obsidian REST API responde com `authenticated: true` | ✓ |
| `uv tool install mcp-obsidian` | ✓ v0.2.2 |
| `claude mcp list` mostra obsidian/playwright/filesystem/github como Connected | ✓ |
| `claude mcp list` inclui **paperclip** após configurar Paperclip + env | ⏳ definir company/API + reiniciar |
| Cursor mcp.json sintaticamente válido | ✓ |
| Profile dir Playwright criado | ✓ |
