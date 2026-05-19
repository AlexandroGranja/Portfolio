# Projetos — Portfolio

## 1. Fortão Prêmios
**Plataforma B2B de ações promocionais e sorteios**

| Item | Detalhe |
|---|---|
| Stack | Next.js 14 · React 18 · Supabase/PostgreSQL · Redis (Upstash) · JWT · bcrypt · Tailwind · Radix UI · Node 20 |
| Deploy | Railway — output: standalone |
| URL prod | https://xn--fortoprmios-c8a8g.com.br/ (fortãopremios.com.br) |
| Email | Resend (confirmações + notificação ganhadores) |
| Pagamentos | Mercado Pago (PIX + cartão + webhook) · eRede (webhook) |

**Banco:** 13+ tabelas PG · RPC `increment_sold_tickets` (atômico) · `dashboard_stats_aggregate()` (4→1 query)
**APIs:** ~64 rotas · autenticação · compras em lote · sorteios · imagens · relatórios · monitoramento · NF-e
**Segurança:** JWT httpOnly (7d) · bcrypt 12 rounds · rate limiting · sanitização · headers CSP/HSTS/XFO · HTTPS obrigatório
**Performance:** -71% latência · +114% RPS (81→174) · P95 1612ms→498ms · 200+ usuários simultâneos

> **Terminologia:** usar "ações promocionais" ou "campanhas" — NUNCA "rifas" em contextos B2B

---

## 2. Burger House — Cardápio Digital / SaaS
**Automação de vendas e atendimento (pedidos + painel admin)**

| Item | Detalhe |
|---|---|
| Stack | React · Python/Flask · PostgreSQL (Supabase) |
| URL | http://cardapio.up.railway.app/ |

---

## 3. Ecossistema de Mensageria e IA Generativa
**Automação de atendimento + integração de sistemas multicanal**

| Item | Detalhe |
|---|---|
| Stack | n8n · Python · Webhooks · LLMs (OpenAI / Claude / Gemini) · WhatsApp API |
| Resultado | -80% tempo atendimento e processamento |

---

## 4. Moraes Adesivos
**Vitrine institucional + SEO**

| Item | Detalhe |
|---|---|
| Stack | HTML/CSS/JS (estático) |
| URL | http://moraesadesivos.com.br/ |

---

## 5. Prosper Roteiros
- Link: *a confirmar*

## 6. Processador XML
- Link: *a confirmar*

---

## Seção no Portfolio (index.html)
- Carrossel com múltiplas imagens por projeto
- "Ver mais" expande descrição
- Links: site + código (GitHub)
- Projetos 1–5 acima = ordem do carrossel

---

*Voltar: [[CEREBRO]]*
