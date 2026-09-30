# Alexandro Granja · Portfólio

Portfólio em Next.js, React e TypeScript, com português e inglês, temas claro e escuro, seis projetos e currículos em PDF. A aplicação atual está na raiz.

## Desenvolvimento

Requer Node.js 20.9 ou superior.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000.

## Estrutura

```text
src/app/          Páginas e estilos
src/components/   Componentes interativos
src/content/      Perfil, projetos e traduções
src/lib/          Utilitários
public/           Imagens e currículos
tests/            Testes
scripts/          Verificações
docs/             Publicação
archive/          Modelos antigos e materiais locais, fora do Git e do deploy
```

## Validar

```sh
npm test
npm run typecheck
npm run build
npm run verify:export
```

O build estático gera `out/`. Não usar `next start` neste modo.

## Vercel

Importe `AlexandroGranja/Portfolio`, com **Root Directory `./`** e framework **Next.js**. `vercel.json` configura instalação, build e saída `out`. Não configure `NEXT_PUBLIC_BASE_PATH` na Vercel.

Veja [publicação e domínio](docs/VERCEL.md).

## Arquivo local

O modelo HTML anterior está em `archive/portfolio-original/`; backups, em `archive/backups/`; materiais temporários, em `archive/local-work/`. `npm run verify:archive` confere os 132 arquivos antigos por SHA-256.

O arquivo local fica fora do Git e da Vercel. O histórico anterior continua no repositório. Mantenha uma cópia de `archive/` no seu backup pessoal.
