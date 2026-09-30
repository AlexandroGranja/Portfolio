# Publicação na Vercel

## Preparação concluída

A aplicação está na raiz, com instalação por `npm ci` e exportação estática para `out/`. Não precisa de chaves nem variáveis de ambiente. O arquivo local foi excluído do Git e do envio à Vercel.

## Publicar pelo GitHub

1. Revisar e enviar a reorganização para `AlexandroGranja/Portfolio`.
2. Na Vercel, escolher **Add New → Project** e importar o repositório.
3. Usar **Root Directory: `./`** e **Framework Preset: Next.js**. Os comandos estão em `vercel.json`.
4. Não definir `NEXT_PUBLIC_BASE_PATH`; ele só serve para hospedagem em subdiretório.
5. Publicar e conferir as páginas, os idiomas, os temas e os PDFs.

Esta preparação não envia commits, publica projetos ou altera DNS automaticamente.

## Domínio simples

Sugestão gratuita: nomear o projeto `alexandro-granja`, para tentar usar `alexandro-granja.vercel.app`. A Vercel determina a disponibilidade e o endereço final.

Para domínio próprio: `alexandrogranja.com.br`; alternativa: `alexandrogranja.dev`. A disponibilidade não foi confirmada. Compare também o preço de renovação antes de registrar.

Após registrar, abra **Project → Settings → Domains**, adicione o domínio e copie para o registrador os registros DNS indicados pela Vercel para esse projeto. Aguarde a validação e defina o domínio principal e o redirecionamento de `www`.

Depois de confirmar o endereço final, atualize o link nos dois currículos, no LinkedIn e no GitHub. Os PDFs atuais ainda citam o endereço anterior do GitHub Pages.

Referências oficiais:
- https://vercel.com/docs/domains/set-up-custom-domain
- https://registro.br/dominio/
