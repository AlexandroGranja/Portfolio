# Backend — Regras e Boas Práticas

> Stack do Alexandro: Python (Flask/FastAPI) · Node.js · PostgreSQL · Supabase · Redis · n8n · REST APIs

---

## API REST — Convenções

### URLs e Rotas
```
GET    /api/v1/users          ← listar
GET    /api/v1/users/:id      ← buscar um
POST   /api/v1/users          ← criar
PUT    /api/v1/users/:id      ← atualizar (completo)
PATCH  /api/v1/users/:id      ← atualizar (parcial)
DELETE /api/v1/users/:id      ← deletar
```

- **kebab-case** para paths: `/api/v1/user-roles` (não `userRoles`)
- **Versionar na URL**: `/v1/`, `/v2/`
- **Paginação obrigatória** em list endpoints: `?page=1&limit=20`
- **camelCase** para JSON properties

### Resposta Padrão
```json
{
  "data": {},
  "meta": { "page": 1, "total": 100 },
  "error": null
}
```

### Erros
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Campo 'email' inválido",
    "details": [{ "field": "email", "message": "formato inválido" }]
  }
}
```

---

## Validação e Sanitização (Fronteira do Sistema)

- **Validar TODO input** na borda do sistema (endpoints, webhooks)
- Nunca confiar em dados do cliente
- Zod (Node.js) / Pydantic (Python) para schemas
- Sanitizar strings: remover HTML, caracteres perigosos
- Validar tipo, tamanho, formato antes de processar

```python
# Python/Flask com Pydantic
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    age: int = Field(gt=0, lt=150)
```

---

## Banco de Dados (PostgreSQL / Supabase)

### Queries
- **Sempre** usar queries parametrizadas (nunca string concatenation)
- Índices em colunas de busca frequente e foreign keys
- Transactions para operações que precisam de atomicidade
- RPCs/functions no banco para operações críticas concorrentes

```python
# BOM — parametrizado
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

# RUIM — SQL injection
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
```

### Performance
- `EXPLAIN ANALYZE` antes de adicionar índice
- Evitar N+1 queries — usar JOINs ou batch loading
- Cache Redis para dados frequentemente lidos
- Agregações pesadas → function/view no banco

### Migrations
- Migrations versionadas e reversíveis
- Nunca editar migration já aplicada em produção
- Testar migration em staging antes de prod

---

## Cache (Redis)

| Dado | TTL sugerido |
|---|---|
| Dados disponibilidade (estoque) | 5s |
| Listagens de campanhas | 1 min |
| Configs do sistema | 5–10 min |
| Dashboard/stats | 45s |
| Sessão de usuário | 7 dias |

- **Invalidar cache** quando dado é atualizado
- **Cache-aside pattern**: ler cache → miss → ler DB → salvar cache
- Upstash para Redis serverless (Vercel/Railway)

---

## Autenticação e Sessão

```python
# JWT em cookie httpOnly — CORRETO
response.set_cookie(
    'token', 
    jwt_token, 
    httponly=True,      # JavaScript não acessa
    secure=True,        # HTTPS only
    samesite='Strict',  # CSRF protection
    max_age=604800      # 7 dias
)

# NUNCA guardar JWT em localStorage (XSS vulnerability)
```

- bcrypt mínimo 10 rounds (12 recomendado)
- Token de refresh com rotação
- Rate limiting em endpoints de auth

---

## Rate Limiting

```python
# Flask-Limiter
@app.route('/api/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    ...

# Regras por tipo de endpoint
# Login: 5/min
# Compra: 10/min  
# API geral: 100/min
# Admin: 30/min
```

---

## Logging e Observabilidade

```python
import logging

# Logar
logging.info("User %s logged in from %s", user_id, ip)
logging.error("Payment failed: %s", error_code)
logging.warning("Rate limit hit: %s requests from %s", count, ip)

# NUNCA logar
logging.info("Password: %s", password)       # ❌
logging.info("Token: %s", jwt_token)          # ❌
logging.info("CPF: %s", user_cpf)             # ❌
```

- Logs estruturados (JSON) para parsing automatizado
- Rastreabilidade: `request_id` em todos os logs da request
- Alertas para: muitos 401/403, erros críticos, latência alta

---

## n8n — Automações

### Boas Práticas
- **Idempotência**: workflow deve ser re-executável sem efeitos duplicados
- **Retry**: configurar retry em nodes HTTP (3x, backoff exponencial)
- **Error handling**: node de error workflow para capturar falhas
- **Logging**: logar início, fim e erros de cada execução crítica
- Webhook com `X-Webhook-Secret` para autenticação

### Estrutura Recomendada de Workflow
```
Trigger → Validar Input → Processar → Notificar → Log
         ↓ (erro)
    Error Handler → Alertar → Log
```

---

## Deploy (Vercel / Railway)

- Variáveis de ambiente para secrets (nunca no código)
- Health check endpoint: `GET /health` → `{ "status": "ok" }`
- Graceful shutdown: fechar conexões DB antes de encerrar
- Zero-downtime deploy: blue/green ou rolling

---

## Recursos de Referência

| Vídeo | Canal | Views | URL |
|---|---|---|---|
| Claude Code best practices (Anthropic oficial) | Anthropic (585K) | 454K | https://youtube.com/watch?v=gv0WHhKelSE |
| How I use Claude Code for real engineering | Matt Pocock (203K) | 257K | https://youtube.com/watch?v=kZ-zzHVUrO4 |
| My top 6 tips using Claude Code efficiently | Academind | 158K | https://youtube.com/watch?v=WwdIYp5fuxY |
| Mastering Claude Code in 30 minutes | Anthropic (585K) | 1.2M | https://youtube.com/watch?v=6eBSHbLKuN0 |

---

*Voltar: [[CEREBRO]]*
