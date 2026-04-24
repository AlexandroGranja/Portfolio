# Fortão Prêmios — Dados exatos para vagas e entrevistas

Documento baseado na análise do repositório `Fortao-premios-versao2`. Use para preencher perfis (Workana, LinkedIn) e responder em processos seletivos.

---

## 1. DADOS TÉCNICOS EXATOS

### Stack (versões do package.json)
| Tecnologia | Versão |
|------------|--------|
| Next.js | 14.2.35 |
| React | 18.x |
| Supabase (JS client) | 2.76.1 |
| Redis | @upstash/redis 1.35.6, ioredis 5.8.2 |
| bcryptjs | 3.0.2 |
| Tailwind CSS | 3.4.1 |
| Radix UI | múltiplos pacotes (dialog, dropdown, tabs, etc.) |
| React Hook Form | 7.58.1 |
| Zod | 3.25.67 |
| Recharts | 2.15.3 |
| Resend | 3.2.0 |
| ExcelJS | 4.3.0 |
| Jest | 30.x |
| Node (runtime) | 20 (Dockerfile) |

### Banco de dados (Supabase / PostgreSQL)
- **13 tabelas principais:** raffles, customers, tickets, user_roles, premium_tickets, lottery_draws, winners, system_settings, carrossel_images, image_configs, promotional_texts, purchase_sessions, raffle_series.
- **Tabelas de prêmios extras:** raffle_extra_prizes, raffle_extra_prize_tickets.
- **Função RPC:** `increment_sold_tickets` (incremento atômico de vendas para evitar race condition).
- **Função agregada:** `dashboard_stats_aggregate()` (reduz 4 queries em 1 no dashboard).
- **Sistema de séries (SECAP):** suporte a campanhas com mais de 100.000 números (raffle_series).

### APIs
- **~64 rotas** no total (app/api/**/route.js).
- **Autenticação:** login, logout, me, change-password.
- **Compras:** create-batch, get-by-token, reserve, generate-tickets, recalculate-sold-tickets.
- **Disponibilidade:** raffles/available-numbers (com cache Redis, TTL 5s).
- **Sorteios:** premium-tickets (CRUD + regenerate-numbers), extra-prizes, lottery-draw, process-draw, auto-process-draw, register-winner, winners, check-winner, check-premium-winner, check-extra-prize-winner.
- **Imagens:** images, carrossel-images, image-config, list-local-images, delete-local-image.
- **Sistema:** health, backup, send-email, upload-pdf, promotional-texts, verificar-tabelas.
- **Monitoramento:** monitoring/metrics, monitoring/errors, test-cache.
- **Relatórios:** relatorios/metrics, relatorios/export.
- **Dashboard:** dashboard/metrics.
- **Pagamento:** Mercado Pago (create, create-pix, process, status, transaction, webhook), eRede (create, status, webhook).
- **Notas fiscais (admin):** admin/invoices (list, download, generate-from-sales, export-zip, export-csv, emit-manual, seed-test), admin/sales/list, admin/clientes/set-password, admin/system-settings.

### Server Actions
- app/actions/rifas.js, dashboard.js, clientes.js, sorteios.js, recalculate.js.

### Segurança
- JWT em cookies httpOnly (expiração 7 dias).
- bcrypt (12 rounds); migração automática de senhas antigas (MD5 → bcrypt).
- Rate limiting: login e compra (lib/rateLimiter.js).
- Sanitização: lib/sanitize.js (strings, UUID, CPF, números, objetos).
- Headers: X-Frame-Options DENY, Content-Security-Policy, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy.
- HTTPS obrigatório em produção (middleware redireciona HTTP → HTTPS, HSTS).
- Validação de uploads: tipo, tamanho, dimensões (lib/uploadValidation.js).

### Performance (métricas dos testes de carga)
- **Antes das otimizações:** Média 916 ms, P95 1612 ms, 81 RPS.
- **Depois:** Média 268 ms (**-71%**), P95 498 ms (**-69%**), 174 RPS (**+114%**).
- **Carga testada:** 200+ usuários simultâneos com 100% de sucesso.
- **Cache Redis:** números disponíveis (TTL 5s), campanhas ativas (1 min), configurações (5–10 min), dashboard (45s). Upstash REST API configurada.
- **Banco:** índices compostos, RPC agregada, queries paralelas onde possível.

### Deploy
- **Plataforma:** Railway.
- **Build:** output: 'standalone' (Next.js).
- **Domínio em produção:** fortãoprêmios.com.br (xn--fortoprmios-c8a8g.com.br).

### Integrações
- **E-mail:** Resend (confirmação de compra, notificação de ganhadores).
- **Pagamento:** Mercado Pago (PIX, cartão, webhook), eRede (webhook, create, status).
- **NF-e:** APIs e fluxos de emissão (test-nfse, admin/invoices).

---

## 2. DESCRIÇÃO PARA “EXPERIÊNCIA” (WORKANA / LINKEDIN)

**Cargo:** Desenvolvedor Full Stack  
**Empresa/Projeto:** Fortão Prêmios  
**Período:** Janeiro 2025 – presente (ou conforme sua realidade)

**Texto para “Descreva as funções do cargo” (versão exata):**

```
Desenvolvimento full-stack da plataforma B2B de ações promocionais e sorteios em produção (Next.js 14, React 18, Supabase/PostgreSQL, Redis).

• Back-end: mais de 60 rotas API REST (autenticação JWT + bcrypt, compras em lote com RPC atômica, sorteios, imagens, relatórios, monitoramento, pagamento Mercado Pago/eRede). Server Actions para o painel admin. Banco com 13+ tabelas, função RPC increment_sold_tickets e dashboard_stats_aggregate.
• Front-end: painel administrativo com 7+ módulos (dashboard, campanhas, clientes, relatórios CSV/PDF, sorteios, imagens, configurações, monitoramento em tempo real com Recharts). Área pública responsiva (carrossel, listagem, compra em lote, “Meus números”). Tailwind CSS e Radix UI.
• Segurança: rate limiting, sanitização de entradas, headers (CSP, HSTS), HTTPS obrigatório, validação de uploads.
• Performance: cache Redis (Upstash) com TTLs por tipo de dado; testes de carga com redução de ~71% na latência média e suporte a 200+ usuários simultâneos.
• E-mail transacional (Resend), documentação técnica e deploy em produção (Railway).
```

---

## 3. RESPOSTAS SUGERIDAS PARA ENTREVISTAS

### “O que é o projeto?”
Plataforma web B2B para gestão de ações promocionais e sorteios: criação de campanhas, venda de cotas em lote, premiações rápidas, sorteio via Loteria Federal, registro de ganhadores e notificações por e-mail. Inclui painel administrativo completo e está em produção no Railway.

### “Qual stack você usou?”
Next.js 14 com App Router, React 18, Supabase (PostgreSQL) como backend único, Redis (Upstash) para cache, autenticação com JWT e bcrypt. No front usei Tailwind CSS e Radix UI. E-mail com Resend e pagamento com Mercado Pago e eRede.

### “Como você garantiu performance em alta concorrência?”
Cache Redis para números disponíveis (TTL 5s), listagem de campanhas e dashboard; função RPC no banco para agregar estatísticas em uma única query; incremento atômico de vendas via RPC para evitar race condition. Com isso, em testes de carga a latência média caiu cerca de 71% e o throughput subiu mais de 100%; o sistema suportou 200+ usuários simultâneos com 100% de sucesso.

### “Como está a segurança?”
Autenticação com JWT em cookie httpOnly e bcrypt para senhas; rate limiting em login e compra; sanitização de todas as entradas; headers de segurança (CSP, X-Frame-Options, HSTS em produção); HTTPS obrigatório; validação de tipo, tamanho e dimensão em uploads.

### “Quantas APIs você criou?”
Cerca de 64 rotas de API: autenticação, compras, sorteios, imagens, relatórios, monitoramento, pagamento (Mercado Pago e eRede), notas fiscais no admin, além de Server Actions para o painel.

### “Qual o tamanho do banco?”
13 tabelas principais no PostgreSQL (Supabase), mais tabelas para prêmios extras. Uso de RPC para incremento atômico de vendas e para agregação do dashboard. Suporte a campanhas grandes com sistema de séries (SECAP, mais de 100 mil números).

### “Você trabalhou sozinho ou em equipe?”
[Ajuste conforme sua realidade: ex. “Desenvolvimento full-stack solo, da arquitetura ao deploy e documentação.”]

### “Qual o maior desafio técnico?”
Garantir consistência na venda de cotas com muitos usuários simultâneos. Resposta: uso de função RPC no banco para incremento atômico, cache Redis para disponibilidade e criação em lote com retry em caso de conflito.

---

## 4. NÚMEROS PARA MENCIONAR (QUANDO PERGUNTAREM)

- **~64** rotas de API.
- **13+** tabelas no banco.
- **7+** módulos no painel admin.
- **~71%** de redução na latência média (testes de carga).
- **200+** usuários simultâneos testados com 100% de sucesso.
- **174** RPS de throughput após otimizações (antes 81).
- **5s a 10 min** TTLs de cache Redis conforme o tipo de dado.

---

*Atualize datas e “trabalhou sozinho/em equipe” conforme sua situação. Use “ações” / “campanhas” em vez de “rifas” em contextos B2B.*
