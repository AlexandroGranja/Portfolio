# Segurança Web — OWASP Top 10 + Regras para Dev

> Referência: https://owasp.org/Top10/2021/ | Aikido Security (86K subs, 21K views): https://youtube.com/watch?v=Jzr0Jdnq_EI

---

## OWASP Top 10 (2021/2025)

### A01 — Broken Access Control
**O que é:** Usuário acessa recursos/ações além do permitido.
**Prevenir:**
- Negar por padrão; só liberar explicitamente
- Validar permissões no servidor (não só no frontend)
- JWT: verificar claims de role/scope em cada endpoint
- Nunca confiar em dados do cliente para autorização

### A02 — Cryptographic Failures
**O que é:** Dados sensíveis expostos por criptografia fraca ou ausente.
**Prevenir:**
- HTTPS obrigatório (HSTS header)
- bcrypt/argon2 para senhas (nunca MD5/SHA1 direto)
- Não logar dados sensíveis (senhas, tokens, CPF)
- Cookies com `httpOnly`, `Secure`, `SameSite`

### A03 — Injection (SQL, XSS, Command)
**O que é:** Input do usuário executado como código.
**Prevenir:**
- Queries parametrizadas / prepared statements (nunca concatenar SQL)
- Sanitizar e escapar todo output HTML (XSS)
- Nunca passar input do usuário direto para `eval()`, `exec()`, `subprocess`
- Whitelist de caracteres permitidos onde possível

### A04 — Insecure Design
**O que é:** Ausência de controles de segurança no design.
**Prevenir:**
- Threat modeling antes de implementar
- Princípio do menor privilégio em toda arquitetura
- Rate limiting em endpoints críticos (login, compra, reset senha)

### A05 — Security Misconfiguration
**O que é:** Configurações padrão inseguras, features desnecessárias habilitadas.
**Prevenir:**
- Headers de segurança: `X-Frame-Options: DENY`, `Content-Security-Policy`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`
- Desabilitar debug/stack traces em produção
- Remover endpoints de admin expostos desnecessariamente
- Variáveis de ambiente para secrets (nunca hardcodado)

### A06 — Vulnerable and Outdated Components
**O que é:** Dependências com vulnerabilidades conhecidas.
**Prevenir:**
- `npm audit` / `pip-audit` regularmente
- Manter dependências atualizadas
- Monitorar CVEs das libs usadas

### A07 — Identification and Authentication Failures
**O que é:** Falhas em login, sessão, gerenciamento de identidade.
**Prevenir:**
- JWT em `httpOnly` cookies (não `localStorage`)
- Expiração curta de tokens + refresh token
- Rate limiting em login (brute force)
- MFA para contas privilegiadas
- Migração automática de hashes fracos → bcrypt

### A08 — Software and Data Integrity Failures
**O que é:** Atualizações, pipelines CI/CD sem verificação de integridade.
**Prevenir:**
- Verificar assinaturas de pacotes
- Evitar CDNs externos sem SRI (Subresource Integrity)
- Revisar dependências de terceiros antes de adicionar

### A09 — Security Logging and Monitoring Failures
**O que é:** Logs insuficientes, sem alertas para eventos suspeitos.
**Prevenir:**
- Logar: tentativas de login (sucesso e falha), acessos negados, erros críticos
- Não logar dados sensíveis
- Alertas para padrões suspeitos (muitos 401, 403)
- Logs em sistema separado (não no mesmo server)

### A10 — Server Side Request Forgery (SSRF)
**O que é:** Servidor faz requests para URLs controladas pelo atacante.
**Prevenir:**
- Whitelist de domínios permitidos para fetch externo
- Bloquear acesso a IPs internos (169.254.x.x, 192.168.x.x, 127.x.x.x)
- Validar e sanitizar URLs recebidas do usuário

---

## Checklist de Segurança para Pull Requests

```
[ ] Nenhum secret/credencial no código
[ ] Input validado e sanitizado antes de usar
[ ] Queries parametrizadas (sem concatenação SQL)
[ ] Auth verificada no servidor (não só no cliente)
[ ] Headers de segurança configurados
[ ] HTTPS + HSTS em produção
[ ] Rate limiting em endpoints públicos críticos
[ ] Logs não contêm dados sensíveis
[ ] Dependências sem vulnerabilidades conhecidas (npm/pip audit)
[ ] Erros não expõem stack trace ao usuário final
```

---

## Headers de Segurança Essenciais

```http
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## Para o Portfolio Alexandro (Fortão Prêmios — já implementado)

- [x] JWT httpOnly (7 dias) + bcrypt 12 rounds
- [x] Rate limiting (login + compra) via `lib/rateLimiter.js`
- [x] Sanitização via `lib/sanitize.js`
- [x] Headers: X-Frame-Options, CSP, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy
- [x] HTTPS obrigatório + HSTS
- [x] Validação de uploads (tipo, tamanho, dimensões)
- [x] Migração automática MD5 → bcrypt

---

## Recursos de Aprendizado

| Canal | Vídeo | Views |
|---|---|---|
| Aikido Security (86K) | OWASP Top 10 2025 complete guide | 21K |
| StackHawk (3K) | OWASP Top 10: Essential Web App Security 2025 | 1.8K |
| Cyber World YT (34K) | OWASP Top 10 Vulnerabilities Hacker Must Know 2025 | 7.5K |

---

*Voltar: [[CEREBRO]]*
