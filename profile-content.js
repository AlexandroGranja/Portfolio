/* Content for the original portfolio, shared by both language options. */
(function () {
    const copy = {
        pt: {
            skillsEyebrow: 'Competências na prática', skillsTitle: 'Como construo minhas soluções',
            skillsIntro: 'Tecnologias que utilizo para desenvolver interfaces, conectar sistemas e automatizar o trabalho.',
            frontendTitle: 'Interfaces web', backendTitle: 'Sistemas e dados', automationTitle: 'Automação e integrações',
            frontendEvidence: 'Interfaces de catálogo, pedidos e gestão no Cardápio Online e no Fortão Prêmios. No Moraes Adesivos, trabalhei responsividade e animações com React, CSS e SVG.',
            backendEvidence: 'Gestão de chamados com FastAPI e PostgreSQL, processamento geográfico com Flask no Roteiro Prosper e integração de dados e autenticação com Supabase.',
            automationEvidence: 'Cruzamento de planilhas e documentos fiscais no Processador XML. Na AIverse, desenvolvimento de fluxos de automação e integrações com modelos de IA.',
            seeProjects: 'Explorar os projetos →', seeAgency: 'Conhecer a AIverse →', toolingTitle: 'Ferramentas de desenvolvimento',
            supportNote: 'Minha experiência com suporte N1/N2, Active Directory, Microsoft 365 e Zabbix está detalhada na trajetória profissional.',
            aboutIntro: 'Sou desenvolvedor Full Stack com experiência em suporte de TI e desenvolvimento de ferramentas para operações empresariais.',
            aboutWork: 'Desenvolvo sistemas web com React, Next.js e Python. Entre minhas entregas estão um sistema de chamados, uma ferramenta de roteirização de visitas e uma automação para processamento de documentos fiscais.',
            aboutPerspective: 'Minha vivência em suporte me ajuda a compreender as necessidades dos usuários e considerar a manutenção e o funcionamento dos sistemas depois da implantação. Busco oportunidades em desenvolvimento Full Stack e automação de processos.'
        },
        en: {
            skillsEyebrow: 'Skills in practice', skillsTitle: 'How I build my solutions',
            skillsIntro: 'Technologies I use to build interfaces, connect systems and automate everyday work.',
            frontendTitle: 'Web interfaces', backendTitle: 'Systems and data', automationTitle: 'Automation and integrations',
            frontendEvidence: 'Catalog, ordering and management interfaces in Cardápio Online and Fortão Prêmios. For Moraes Adesivos, I worked on responsive layouts and animations with React, CSS and SVG.',
            backendEvidence: 'Ticket management with FastAPI and PostgreSQL, geographic processing with Flask in Roteiro Prosper, and data and authentication integrations with Supabase.',
            automationEvidence: 'Matching spreadsheets and tax documents in Processador XML. At AIverse, developing automation workflows and integrations with AI models.',
            seeProjects: 'Explore projects →', seeAgency: 'Meet AIverse →', toolingTitle: 'Development tools',
            supportNote: 'My experience with L1/L2 support, Active Directory, Microsoft 365 and Zabbix is covered in my professional background.',
            aboutIntro: 'I am a Full Stack developer with experience in IT support and building tools for business operations.',
            aboutWork: 'I develop web systems with React, Next.js and Python. My work includes a ticket management system, a visit routing tool and an automation for processing tax documents.',
            aboutPerspective: 'My support background helps me understand user needs and consider system maintenance and operation after deployment. I am looking for opportunities in Full Stack development and process automation.'
        }
    };
    Object.assign(translations.pt.hero, {
        subtitle: 'Desenvolvedor Full Stack', devLabel: 'Desenvolvimento web',
        devText: 'Desenvolvo aplicações web, integro sistemas e automatizo processos com React, Next.js e Python.',
        opsLabel: 'Experiência aplicada', opsText: 'Sistemas de chamados, roteirização de visitas e automação de documentos, com experiência em suporte de TI.'
    });
    Object.assign(translations.en.hero, {
        subtitle: 'Full Stack Developer', devLabel: 'Web development',
        devText: 'I build web applications, integrate systems and automate processes with React, Next.js and Python.',
        opsLabel: 'Applied experience', opsText: 'Ticket management, visit routing and document automation, backed by experience in IT support.'
    });
    Object.assign(translations.pt.about, { subtitle: 'Desenvolvimento Full Stack e automação de processos', stat1: 'Suporte e desenvolvimento', stat2: 'Aplicações para negócios', stat3: 'Automação de processos' });
    Object.assign(translations.en.about, { subtitle: 'Full Stack development and process automation', stat1: 'Support and development', stat2: 'Business applications', stat3: 'Process automation' });
    Object.assign(translations.pt.about, {
        seeking1: 'Desenvolvimento Full Stack', seeking2: 'Backend e integrações', seeking3: 'Automação de processos',
        seekingDetail1: 'React, Next.js e TypeScript', seekingDetail2: 'Python, APIs e PostgreSQL', seekingDetail3: 'n8n, Webhooks e IA aplicada'
    });
    Object.assign(translations.en.about, {
        seeking1: 'Full Stack development', seeking2: 'Backend and integrations', seeking3: 'Process automation',
        seekingDetail1: 'React, Next.js and TypeScript', seekingDetail2: 'Python, APIs and PostgreSQL', seekingDetail3: 'n8n, Webhooks and applied AI'
    });
    const cases = {
        pt: [
            ['Reunir campanhas, pagamentos e gestão em uma aplicação.', 'Desenvolvimento de interfaces e painel administrativo, autenticação, integrações e otimização de consultas e cache.', 'Plataforma em produção: Fortão Prêmios.'],
            ['Permitir ao restaurante apresentar produtos e gerenciar pedidos.', 'Catálogo, carrinho, checkout e painel administrativo integrados ao Supabase.', 'Aplicação com experiência de compra e gestão do cardápio.'],
            ['Apresentar os serviços da empresa e facilitar pedidos de orçamento.', 'Atualização em React e Vite, catálogo com busca e filtros, animações em CSS e SVG, adaptação mobile e otimização de imagens.', 'Nova versão desenvolvida, com apresentação interativa dos ambientes e contato via WhatsApp.'],
            ['Organizar visitas a partir de uma base de clientes e informações geográficas.', 'Interface de mapas com React e Leaflet, processamento em Python/Flask e ordenação de visitas com vizinho mais próximo e 2-opt.', 'Ferramenta utilizada na operação da Prosper para apoiar o planejamento das equipes.'],
            ['Organizar as solicitações e o acompanhamento do atendimento de TI.', 'Aplicação com React, FastAPI e PostgreSQL, filas N1/N2, SLA e integrações com inventário Snipe-IT e ramais.', 'Sistema interno implantado na Prosper.'],
            ['Localizar documentos fiscais a partir de uma lista em planilha.', 'Ferramenta em Python/Flask que cruza arquivos XML de um ZIP com números de notas em Excel e gera um pacote com os documentos selecionados.', 'Automação da busca e separação manual de documentos.']
        ],
        en: [
            ['Bring campaigns, payments and management into one application.', 'Interfaces and admin dashboard, authentication, integrations, query optimization and caching.', 'Production platform: Fortão Prêmios.'],
            ['Help a restaurant present products and manage orders.', 'Catalog, cart, checkout and admin dashboard integrated with Supabase.', 'Application combining ordering and menu management.'],
            ['Present the company’s services and make quote requests easier.', 'React and Vite update, searchable and filterable catalog, CSS and SVG animations, mobile layouts and image optimization.', 'New version developed with interactive room previews and WhatsApp contact.'],
            ['Organize visits using customer records and geographic data.', 'React and Leaflet maps, Python/Flask processing and visit ordering using nearest-neighbor and 2-opt algorithms.', 'Tool used in Prosper’s operations to support field-team planning.'],
            ['Organize requests and track IT support work.', 'React, FastAPI and PostgreSQL application, L1/L2 queues, SLA tracking, Snipe-IT inventory and extension integrations.', 'Internal system deployed at Prosper.'],
            ['Find tax documents based on a spreadsheet list.', 'Python/Flask tool matching XML files in a ZIP against invoice numbers in Excel and creating a package of selected documents.', 'Automation of document searching and sorting.']
        ]
    };
    function update() {
        const content = copy[document.documentElement.lang === 'en' ? 'en' : 'pt'];
        document.querySelectorAll('[data-copy]').forEach(el => { el.textContent = content[el.dataset.copy] || el.textContent; });
        const english = document.documentElement.lang === 'en';
        const labels = english ? ['Problem', 'My contribution', 'Result / status'] : ['Problema', 'Minha contribuição', 'Resultado / situação'];
        cases[english ? 'en' : 'pt'].forEach((record, index) => {
            const container = document.querySelector('#project-panel-' + index + ' > .project-content');
            if (!container) return;
            container.querySelector('.project-summary')?.remove();
            container.querySelector('.project-description-wrapper')?.remove();
            let details = container.querySelector('.project-proof');
            if (!details) {
                details = document.createElement('dl');
                details.className = 'project-proof';
                container.prepend(details);
            }
            details.replaceChildren();
            record.forEach((value, i) => {
                const term = document.createElement('dt');
                const description = document.createElement('dd');
                term.textContent = labels[i];
                description.textContent = value;
                details.append(term, description);
            });
        });
        const moraesStack = document.querySelector('#project-panel-2 .project-tech');
        if (moraesStack) {
            moraesStack.replaceChildren();
            ['React', 'Vite', 'JavaScript', 'CSS', 'SVG'].forEach(name => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = name;
                moraesStack.append(tag);
            });
        }
        document.title = english ? 'Alexandro Granja | Full Stack Developer' : 'Alexandro Granja | Desenvolvedor Full Stack';
        document.querySelector('meta[name="description"]').content = english
            ? 'Full Stack development and process automation. Projects with React, Next.js, Python and PostgreSQL.'
            : 'Desenvolvimento Full Stack e automação de processos. Projetos com React, Next.js, Python e PostgreSQL.';
    }
    new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    document.addEventListener('DOMContentLoaded', () => {
        // Prioritize the systems that best demonstrate full-stack work.
        [4, 0, 3, 1, 2, 5].forEach(index => {
            const tab = document.getElementById('project-tab-' + index);
            const panel = document.getElementById('project-panel-' + index);
            if (tab) tab.parentElement.appendChild(tab);
            if (panel) panel.parentElement.appendChild(panel);
        });
        update();
    });
})();
