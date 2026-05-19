# Tarefas Ativas (Orquestração Cursor → Claude Code)

> Quadro append-only para coordenação entre agentes.
> Cursor escreve antes de delegar; Claude Code lê o contexto e atualiza status.
> Ao concluir, mover bloco inteiro para [[HISTORICO]].

---

## Template

Copiar este bloco e preencher quando delegar:

```markdown
## TASK-{YYYYMMDD-HHMM}

- **status:** pending | in_progress | completed | failed
- **delegado_em:** 2026-05-14T18:00:00-03:00
- **rota:** claude-code-headless | cursor-direct | claude-code-stream
- **pedido:** descrição em 1 linha
- **contexto_necessario:**
  - notas obsidian: [[NOTA1]], [[NOTA2]]
  - arquivos: caminho/arquivo.ext linhas X-Y
- **entregavel:** o que esperamos de volta
- **comando:** `claude --print "..." --output-format json --max-turns 30`
- **resultado:** (preencher ao concluir)
```

---

## Pendentes

*(vazio — usar o template acima ao delegar)*

---

## Em execução

*(vazio)*
