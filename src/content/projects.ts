export type Project = {
  slug: string;
  title: string;
  category: string;
  role?: string;
  editorial?: boolean;
  imageCaption?: string;
  summary: string;
  image: string;
  imageAlt: string;
  color: string;
  stack: string[];
  problem: string;
  contribution: string;
  outcome: string;
  features?: { title: string; description: string; steps?: string[] }[];
  gallery: { src: string; alt: string; title?: string; description?: string; portrait?: boolean }[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "fortao-premios",
    editorial: true,
    title: "Fortão Prêmios",
    category: "Plataforma web",
    role: "Desenvolvimento completo · Frontend, backend e painel administrativo",
    imageCaption: "Composição ilustrativa das interfaces pública e administrativa. Dados operacionais substituídos; nenhuma informação de usuários exibida. A campanha retratada já foi encerrada.",
    summary:
      "Da experiência de quem participa às ferramentas de quem administra: desenvolvi o Fortão Prêmios de ponta a ponta.",
    image: "/media/fortao-apresentacao.png",
    imageAlt: "Apresentação ilustrativa do Fortão Prêmios em notebook e celular, sem dados de usuários",
    color: "#e4e6dc",
    stack: ["Next.js", "TypeScript", "Supabase", "Redis"],
    problem:
      "A plataforma conecta a escolha de títulos e a participação nas campanhas à gestão da operação.",
    contribution:
      "Desenvolvi a interface, o backend e o painel administrativo, incluindo autenticação, pagamentos, emissão de notas fiscais e apuração de sorteios.",
    outcome:
      "As telas a seguir apresentam as principais funções, com dados pessoais e operacionais substituídos.",
    gallery: [
      {
        src: "/media/fortao-home-publica.png",
        title: "Experiência pública",
        description: "Organizei a experiência pública em torno da campanha: primeiro o prêmio e as informações principais, depois a escolha dos títulos e o valor da participação. Implementei a vitrine, os detalhes e a seleção de pacotes com cálculo do total, conectando essas etapas ao fluxo de compra. Essa estrutura apresenta as informações conforme o visitante avança e adapta a navegação para computador e celular.",
        alt: "Interface pública: apresentação da campanha e vitrine de prêmios extras. Registro de campanha já encerrada.",
      },
      {
        src: "/media/fortao-acoes-admin-demo.png",
        title: "Um ponto de acesso para toda a operação",
        description: "Além da experiência do participante, desenvolvi as ferramentas necessárias para administrar a plataforma. Organizei o painel por rotinas de campanhas, clientes, relatórios, notas fiscais e sorteios, reunindo os acessos em uma tela central. Separei também os controles de imagens e configurações, permitindo atualizar o conteúdo do site pelo próprio sistema, sem depender de alterações no código a cada mudança.",
        alt: "Ações rápidas do painel Fortão, com oito atalhos para os módulos administrativos, sem dados de usuários.",
      },
      {
        src: "/media/fortao-admin-demo.png",
        title: "Gestão de campanhas",
        description: "Estruturei cada campanha como um cadastro que reúne preço por título, quantidade de cotas, data do sorteio, status e destaque. Implementei a criação, a edição e a busca para que a administração consiga manter esses dados ao longo da campanha. Ao conectar o cadastro à vitrine pública, concentrei a manutenção das informações no painel, incluindo o controle do que aparece em destaque no site.",
        alt: "Painel administrativo demonstrativo, com valores e indicadores operacionais substituídos.",
      },
      {
        src: "/media/fortao-notas-fiscais-demo.png",
        title: "Controle fiscal em uma mesma tela",
        description: "Conectei o fluxo fiscal à confirmação do pagamento: o sistema localiza ou cria o registro da compra e verifica se a nota já foi emitida antes de seguir. Com a emissão automática habilitada e configurada, a integração assina o documento com certificado A1 e o envia ao serviço nacional de NFS-e. Também desenvolvi a consulta de status, os filtros e a exportação, porque a automação precisa permitir que a equipe acompanhe falhas e confira os documentos.",
        alt: "Interface demonstrativa de NFS-e com indicadores, geração por período, filtros e exportação; CPF mascarado e registros fictícios.",
      },
      {
        src: "/media/fortao-sorteios-demo.png",
        title: "Da campanha à apuração",
        description: "Separei a apuração em três etapas: consultar o resultado de referência, calcular o número da campanha e procurar um título pago correspondente. Implementei o cálculo pelo resto da divisão do primeiro prêmio pelo total de números, com tratamento específico para zero e padronização da numeração antes da comparação. A rotina considera apenas pagamentos confirmados e registra o ganhador quando encontra uma correspondência exata; sem ela, retorna sem vencedor. O painel concentra a seleção da campanha e o acionamento desse processo.",
        alt: "Tela demonstrativa de apuração com seleção de campanha fictícia e explicação da comparação entre o número calculado e os títulos pagos.",
      },
    ],
    links: [
      {
        label: "Visitar projeto",
        href: "https://xn--fortoprmios-c8a8g.com.br/",
      },
    ],
  },
  {
    slug: "roteiro-prosper",
    editorial: true,
    title: "Roteiro Prosper",
    category: "Ferramenta interna",
    role: "Desenvolvimento completo · Interface, backend e lógica de roteirização",
    imageCaption: "Composição ilustrativa da plataforma. O mapa no celular apresenta um percurso fictício, sem dados ou localizações de clientes.",
    summary:
      "Da base de clientes ao roteiro de visitas: desenvolvi uma ferramenta para apoiar o planejamento das equipes de campo da Prosper.",
    image: "/media/roteiro-apresentacao.png",
    imageAlt: "Apresentação ilustrativa do Roteiro Prosper em notebook e celular, com mapa de percurso fictício",
    color: "#dce5e8",
    stack: ["React", "Python", "Flask", "Leaflet"],
    problem:
      "Organizar visitas a partir de uma base extensa de clientes exigia cruzar informações geográficas e definir uma sequência de atendimento. O desafio foi transformar esses dados em roteiros que a equipe pudesse consultar e planejar com menos trabalho manual.",
    contribution:
      "Fui responsável pelo desenvolvimento completo: interface, backend e lógica de roteirização. Construí a visualização de mapas, o processamento das informações geográficas e o agrupamento de clientes por proximidade. Na ordenação das visitas, trabalhei com os algoritmos de vizinho mais próximo e 2-opt, conectando o processamento dos dados à apresentação dos roteiros na interface.",
    outcome:
      "A ferramenta passou a apoiar o planejamento das equipes de campo na operação da Prosper, reunindo a organização das visitas e sua visualização geográfica. O projeto aproximou uma necessidade da rotina comercial de uma solução desenvolvida para esse fluxo de trabalho.",
    gallery: [
      {
        src: "/media/roteiro.webp",
        title: "Planejamento de visitas",
        description: "A tela inicial concentra os acessos ao gerenciamento de arquivos e roteiros. A proposta é organizar o trabalho a partir da base de clientes e das informações geográficas, reunindo as etapas de preparação e consulta das visitas.",
        alt: "Tela inicial do Prosper Roteiros, com acesso ao gerenciamento de arquivos e roteiros, sem dados de clientes",
      },
      {
        src: "/media/roteiro-mapa-demo.png",
        title: "Do agrupamento à sequência de visitas",
        description: "O processamento agrupa clientes por proximidade e ordena as visitas com vizinho mais próximo e ajustes por 2-opt. O mapa apresenta os pontos numerados e a sequência do percurso, permitindo conferir visualmente o roteiro. A exportação em CSV disponibiliza o resultado para uso fora da interface.",
        alt: "Mapa ilustrativo com seis pontos fictícios e sequência de visitas; nenhuma localização de cliente é exibida.",
      },
    ],
    links: [
      {
        label: "Abrir demonstração",
        href: "https://roteiro-prosper-olfq.vercel.app/",
      },
    ],
  },
  {
    slug: "sistema-de-chamados",
    editorial: true,
    title: "Chamados de TI",
    category: "Sistema corporativo",
    role: "Desenvolvimento completo · Interface, backend e banco de dados",
    summary: "Da solicitação ao acompanhamento do atendimento: um sistema de suporte de TI desenvolvido para a rotina de uma clínica médica.",
    image: "/media/chamados-apresentacao.png",
    imageAlt: "Apresentação do sistema de chamados em notebook e celular, com dados fictícios",
    imageCaption: "Composição ilustrativa baseada no sistema. As telas abaixo foram adaptadas com dados fictícios para preservar informações de usuários e da operação.",
    color: "#e6dfd5",
    stack: ["React", "Material UI", "FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic"],
    problem:
      "Centralizar as solicitações de suporte dos diferentes setores da clínica e manter o contexto de cada atendimento: o problema relatado, o local, as respostas e os anexos. Além de organizar os chamados, o sistema precisava oferecer à equipe de TI uma visão dos equipamentos e separar as permissões de administradores, técnicos e solicitantes.",
    contribution:
      "Desenvolvi a aplicação completa, da interface em React e Material UI à API em FastAPI e ao banco PostgreSQL. Implementei autenticação com JWT e renovação de sessão, perfis de acesso, abertura e acompanhamento de chamados, filtros, atualização de status, respostas, histórico e anexos. Também construí o dashboard de atendimento e o inventário de equipamentos, com cadastro, edição, arquivamento e vínculo com os chamados. A estrutura de dados utiliza SQLAlchemy e migrações com Alembic.",
    outcome:
      "O sistema é executado localmente, sem link público de acesso. A versão atual reúne atendimento e inventário em uma mesma aplicação. Os solicitantes têm um canal para registrar e acompanhar suas demandas, enquanto a equipe de TI consulta o histórico, responde aos chamados e mantém os equipamentos organizados por setor, localização e situação. O projeto traduz minha experiência em suporte em funcionalidades voltadas à rotina de atendimento.",
    gallery: [
      {
        src: "/media/chamados-dashboard-demo.png",
        title: "Visão geral do atendimento",
        description: "O dashboard reúne os chamados abertos, em andamento, resolvidos e aguardando retorno. Os cartões de solicitações recentes permitem consultar o contexto de cada demanda e ajudam a equipe de TI a organizar o acompanhamento diário.",
        alt: "Dashboard demonstrativo com indicadores e cartões de chamados; dados fictícios.",
      },
      {
        src: "/media/chamados-abertura-demo.png",
        title: "Uma solicitação com contexto",
        description: "O formulário reúne título, descrição, categoria e local do atendimento. O setor vem do cadastro do solicitante, e imagens ou vídeos podem complementar o relato. Essas informações ajudam a equipe a entender o problema antes de iniciar o suporte.",
        alt: "Formulário demonstrativo de abertura de chamado, com campos de descrição e anexos.",
      },
      {
        src: "/media/chamados-historico-demo.png",
        title: "Histórico e acompanhamento",
        description: "Cada chamado mantém seus dados, status e histórico de respostas no mesmo lugar. Solicitante e equipe de TI podem acompanhar a conversa e registrar atualizações, preservando o contexto durante o atendimento.",
        alt: "Detalhe demonstrativo de um chamado com status, informações e histórico de respostas.",
      },
      {
        src: "/media/chamados-equipamentos-demo.png",
        title: "Inventário de equipamentos",
        description: "O inventário organiza computadores, impressoras, painéis e outros equipamentos por tipo, setor, localização e situação. A equipe pode cadastrar, editar e arquivar itens, além de relacioná-los aos chamados para consultar o equipamento envolvido no atendimento.",
        alt: "Inventário demonstrativo com equipamentos fictícios, sem identificadores ou endereços de rede reais.",
      },
    ],
    links: [
    ],
  },
  {
    slug: "cardapio-online",
    editorial: true,
    title: "Cardápio Online",
    category: "Produto digital",
    role: "Desenvolvimento completo · Interface, backend e painel administrativo",
    imageCaption: "Composição ilustrativa do cardápio e do painel administrativo, com dados fictícios e sem informações de usuários.",
    summary:
      "Do primeiro clique ao pedido, uma experiência para clientes e restaurantes.",
    image: "/media/cardapio-apresentacao-v2.png",
    imageAlt: "Cardápio Online em notebook e celular, com interfaces demonstrativas do restaurante e da administração",
    color: "#ead8c8",
    stack: ["React", "Tailwind CSS", "Python / Flask", "Supabase", "PostgreSQL"],
    problem:
      "Apresentar produtos, receber pedidos e dar ao restaurante autonomia para atualizar seu cardápio.",
    contribution:
      "Desenvolvi a interface em React, o painel administrativo e a integração com Supabase para autenticação, dados e imagens. A estrutura também inclui um backend em Flask com rotas para pedidos, configurações e integrações por webhook.",
    outcome:
      "Uma aplicação que reúne a experiência de compra e o gerenciamento do restaurante em um mesmo produto.",
    gallery: [
      {
        src: "/media/cardapio.webp",
        title: "A apresentação do produto como ponto de partida",
        description: "Organizei a vitrine com foto, descrição, preço e acesso ao pedido no mesmo cartão. Para dar continuidade à escolha, desenvolvi um carrinho que mantém os itens ao recarregar a página e considera tamanhos, quantidades e observações. Produtos com instruções específicas ficam separados, preservando o contexto de cada item. No checkout, reuni os dados de contato, entrega e forma de pagamento antes de registrar o pedido no Supabase.",
        alt: "Página de exemplo Burger House, com apresentação de produto, preço e acesso ao pedido.",
      },
      {
        src: "/media/cardapio-admin-demo.png",
        title: "Uma visão da operação para o restaurante",
        description: "Separei a administração em tarefas: atualizar produtos e categorias, acompanhar pedidos e configurar a apresentação do restaurante. No dashboard, calculei os indicadores a partir dos pedidos registrados e reuni receita, ticket médio e estados de atendimento. Implementei filtros e atualização de status na gestão de pedidos, além da exportação em Excel para consultas fora do sistema. Essa organização conecta a visão geral do negócio às ações da rotina de atendimento.",
        alt: "Dashboard demonstrativo com resumo de pedidos, receita e atendimento, sem dados pessoais ou indicadores reais.",
      },
      {
        src: "/media/cardapio-menu-demo.png",
        title: "Um cardápio que o restaurante pode manter",
        description: "Separei o cadastro de categorias do cadastro de produtos para organizar o menu sem prender sua estrutura ao código da página. Implementei controles de ordem e ativação das categorias, além da edição dos itens e de suas variações de tamanho e preço. Assim, o restaurante pode ajustar a oferta pelo painel, enquanto a interface pública consulta os dados cadastrados no Supabase.",
        alt: "Gestão demonstrativa de categorias e itens do cardápio, com conta administrativa fictícia.",
      },
      {
        src: "/media/cardapio-pedidos-demo.png",
        title: "Do pedido recebido à entrega",
        description: "Organizei os pedidos por etapas do atendimento, com filtros para pendentes, em preparo, prontos e entregues. Na listagem, reuni identificação, valor, status e data; os detalhes ficam disponíveis em uma ação própria. Implementei a atualização do status no registro do pedido para que a equipe possa acompanhar sua evolução. Essa separação permite consultar a fila e abrir o contexto de cada atendimento quando necessário.",
        alt: "Lista de pedidos demonstrativos, com clientes fictícios, telefones mascarados e diferentes estados de atendimento.",
      },
      {
        src: "/media/cardapio-temas-demo.png",
        title: "Personalização sem refazer a interface",
        description: "Desenvolvi temas predefinidos e uma opção de cores personalizadas para adaptar o cardápio à identidade do restaurante. Centralizei essas escolhas nas configurações e apliquei as cores por variáveis CSS, compartilhadas pelos componentes. Com essa estrutura, a mudança de aparência parte do painel e alcança a interface sem exigir a edição individual de cada botão, cartão ou formulário.",
        alt: "Painel de temas com opções Clássico, Escuro, Elegante, Vibrante e Personalizado, sem dados de usuários.",
      },
      {
        src: "/media/cardapio-config-demo.png",
        title: "Autonomia para atualizar o restaurante",
        description: "Tratei nome, contato e logo como dados configuráveis, em vez de deixar essas informações fixas nos componentes. Construí um formulário para editar e salvar as informações da loja, com upload da imagem pelo painel. Ao separar o conteúdo da estrutura visual, permiti que o responsável pelo restaurante mantenha sua apresentação atualizada sem precisar alterar o código da aplicação.",
        alt: "Configurações demonstrativas da loja com dados de contato fictícios e controle de upload do logo.",
      },
    ],
    links: [
      {
        label: "Ver cardápio",
        href: "https://cardapio-online-wine-delta.vercel.app/",
      },
    ],
  },
  {
    slug: "processador-xml",
    editorial: true,
    title: "Processador XML",
    category: "Automação",
    role: "Desenvolvimento completo · Interface e processamento em Python",
    imageCaption: "Composição ilustrativa da ferramenta. Os exemplos de arquivos e documentos são fictícios.",
    summary: "Menos seleção manual. Mais tempo para a operação fiscal.",
    image: "/media/xml-apresentacao-v2.png",
    imageAlt: "Apresentação demonstrativa do Processador XML em notebook e celular",
    color: "#dfe4d6",
    stack: ["Python", "Flask", "openpyxl"],
    problem:
      "Localizar e separar arquivos XML de notas fiscais com base em uma relação de números em planilha.",
    contribution:
      "Desenvolvi a interface de envio de arquivos e o processamento em Python com Flask. Usei openpyxl para ler a planilha e implementei a seleção dos XMLs, a compactação do resultado e seu download pelo navegador.",
    outcome:
      "Automação de uma etapa repetitiva da operação, substituindo a busca e a separação manual de documentos.",
    gallery: [
      {
        src: "/media/xml.webp",
        title: "Uma rotina manual transformada em dois arquivos",
        description: "Organizei a entrada em dois campos: uma planilha com a relação de notas e um ZIP com os documentos disponíveis. A interface permite selecionar ou arrastar os arquivos e iniciar o processamento na mesma tela. No backend, leio a coluna B a partir da segunda linha, preservando o cabeçalho. Esse formato aproveita a relação já preparada na planilha para orientar a busca, sem exigir a seleção individual dos XMLs.",
        alt: "Interface de envio da planilha Excel e do ZIP com XMLs, sem documentos reais carregados.",
      },
      {
        src: "/media/xml-detalhe.webp",
        title: "A lógica por trás da seleção",
        description: "Implementei a busca em etapas: primeiro verifico a numeração no nome do arquivo; quando não encontro correspondência, tento ler os campos de número da NF ou do CT-e no XML. A comparação considera o final da numeração, conforme a regra da ferramenta. O processamento percorre também as subpastas do ZIP e copia os arquivos selecionados para uma área temporária, que é removida ao concluir ou tratar um erro.",
        alt: "Orientações da ferramenta para envio dos arquivos, comparação da numeração e download do resultado.",
      },
      {
        src: "/media/xml-resultado-demo.png",
        title: "Um resultado pronto para conferência e download",
        description: "Além de gerar o ZIP, devolvo a quantidade de XMLs selecionados e as correspondências encontradas para apoiar a conferência. Para o ambiente serverless, incluí o arquivo em Base64 na própria resposta e reconstruí o download no navegador, evitando depender de uma segunda requisição ao armazenamento temporário. Também tratei situações como planilha sem números e ausência de correspondências, apresentando uma mensagem na interface.",
        alt: "Resultado demonstrativo com três documentos fictícios selecionados e botão para baixar entrada.zip.",
      },
    ],
    links: [
      {
        label: "Abrir ferramenta",
        href: "https://site-converter-xml-e3gi.vercel.app/",
      },
    ],
  },
  {
    slug: "moraes-adesivos",
    editorial: true,
    title: "Moraes Adesivos",
    category: "Site institucional",
    role: "Desenvolvimento completo · Interface, animações e catálogo",
    imageCaption: "Composição demonstrativa baseada na versão atual do projeto, com interfaces para computador e celular.",
    summary:
      "Uma presença digital que apresenta o trabalho e abre a conversa com o cliente.",
    image: "/media/moraes-apresentacao.png",
    imageAlt: "Capa editorial do projeto Moraes Adesivos",
    color: "#e7dcee",
    stack: ["React", "Vite", "JavaScript", "CSS", "SVG"],
    problem:
      "Apresentar os revestimentos em ambientes e ajudar o visitante a encontrar uma coleção antes de entrar em contato com a empresa.",
    contribution:
      "Desenvolvi a versão atual em React, incluindo a apresentação animada dos revestimentos, o catálogo com busca e filtros e os acessos ao WhatsApp. Trabalhei também nos enquadramentos para celular e no carregamento das imagens usadas nas transições.",
    outcome:
      "Uma vitrine digital com foco na apresentação dos trabalhos e no contato direto com a empresa.",
    gallery: [
      {
        src: "/media/moraes-home.png",
        title: "Mostrar o revestimento dentro do ambiente",
        description: "Organizei a apresentação inicial em torno de ambientes decorados para mostrar as texturas em contexto. Implementei a troca dos revestimentos conforme a rolagem, com recortes e máscaras em SVG que simulam a passagem de uma folha adesiva. Separei as superfícies da cena e sincronizei os títulos com as variações, conectando a animação ao produto que a empresa oferece.",
        alt: "Tela inicial do Moraes Adesivos com revestimentos apresentados em sala, cozinha e banheiro.",
      },
      {
        src: "/media/moraes-catalogo.png",
        title: "Da inspiração à busca por uma coleção",
        description: "Estruturei o catálogo como uma coleção de dados, separando títulos, imagens, categorias e links dos componentes visuais. Na busca, normalizei os termos para desconsiderar acentos e diferenças entre maiúsculas e minúsculas, combinando o texto digitado com o filtro de categoria. Cada cartão leva ao material da coleção, enquanto a interface informa os resultados e permite limpar os filtros.",
        alt: "Catálogo de revestimentos com busca por texto, filtros de categoria e cartões das coleções.",
      },
      {
        src: "/media/moraes-mobile.png",
        portrait: true,
        title: "Uma composição própria para o celular",
        description: "Preparei imagens e enquadramentos específicos para telas menores, preservando a leitura dos textos e o destaque dos materiais. No código, separei as variações de textura por tamanho de tela e controlei seu carregamento antes das trocas. Também tratei a altura da apresentação durante a navegação móvel, para reduzir mudanças de posição quando a área visível do navegador varia.",
        alt: "Versão móvel do Moraes Adesivos, com enquadramento vertical do ambiente e navegação compacta.",
      },
    ],
    links: [
      { label: "Visitar site", href: "https://moraesadesivos.com.br/" },
    ],
  },
];
