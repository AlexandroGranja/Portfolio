// Portfolio JavaScript - Alexandro Granja

// DOM Elements
const ENABLE_CURSOR = false;
const ENABLE_PARTICLES = false;
const ENABLE_CARD_TILT = false;
const navLinks = document.querySelectorAll('.nav-link-sidebar');
const sections = document.querySelectorAll('section');

// Sidebar navigation active state

// Section Navigation - Show/Hide with Animation (No Scroll)
window.showSection = function(sectionId) {
    // Hide all sections first
    const allSections = document.querySelectorAll('.section-content');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section with animation
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
        // Small delay to allow fade out first
        setTimeout(() => {
            targetSection.classList.add('active');
            const cleanId = sectionId.replace('#', '');
            if (cleanId === 'about') {
                const aboutInner = targetSection.querySelector('.about-inner');
                if (aboutInner) aboutInner.scrollTop = 0;
            }
            if (cleanId === 'projects') {
                setTimeout(() => {
                    if (typeof window.refreshProjectsPanel === 'function') {
                        window.refreshProjectsPanel();
                    }
                    if (typeof window.scheduleProjectsSwipeHint === 'function') {
                        window.scheduleProjectsSwipeHint();
                    }
                }, 280);
            }
        }, 100);
    }
    
    // Save current section to localStorage
    localStorage.setItem('currentSection', sectionId);
    
    // Update active nav link
    navLinks.forEach(link => {
        const icon = link.querySelector('.material-icons-round');
        const text = link.querySelector('span:last-child');
        
        // Remove active state
        link.classList.remove('text-primary');
        link.classList.add('text-slate-400');
        if (icon) {
            icon.classList.remove('text-primary');
            icon.classList.add('text-slate-400');
        }
        if (text) {
            text.classList.remove('text-primary');
            text.classList.add('text-slate-400');
        }
        
        // Add active state to current link
        const linkHref = link.getAttribute('href');
        const linkDataSection = link.getAttribute('data-section');
        const sectionIdClean = sectionId.replace('#', '');
        
        if (linkHref === sectionId || linkDataSection === sectionIdClean) {
            link.classList.remove('text-slate-400');
            link.classList.add('text-primary');
            if (icon) {
                icon.classList.remove('text-slate-400');
                icon.classList.add('text-primary');
            }
            if (text) {
                text.classList.remove('text-slate-400');
                text.classList.add('text-primary');
            }
        }
    });
};

/** Recalcula layout do painel ao abrir Projetos (seção antes invisível podia zerar a coluna do card). */
window.refreshProjectsPanel = function() {
    const section = document.querySelector('#projects');
    if (!section || !section.classList.contains('active')) {
        return;
    }
    isChangingProject = false;
    const visible = getVisibleProjectIndices();
    let idx = currentProjectIndex;
    if (!visible.includes(idx)) {
        idx = visible[0] ?? 0;
    }
    currentProjectIndex = -1;
    window._suppressSwipeHintDismiss = true;
    goToProject(idx);
    setTimeout(() => {
        window._suppressSwipeHintDismiss = false;
        if (typeof window.scheduleProjectsSwipeHint === 'function') {
            window.scheduleProjectsSwipeHint();
        }
    }, 400);
};

// Navigation Links Click Handler
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        showSection(targetId);
    });
});

// ========== SISTEMA DE TRADUÇÃO ==========
const translations = {
    pt: {
        // Navegação
        nav: {
            home: "Início",
            about: "Sobre",
            agency: "Agência",
            skills: "Habilidades",
            projects: "Projetos",
            contact: "Contato"
        },
        // Hero Section
        hero: {
            greeting: "Olá, eu sou",
            subtitle: "Desenvolvedor Fullstack · Suporte Técnico N1/N2",
            devLabel: "Desenvolvimento:",
            devText: "Aplicações fullstack em produção — React/Next.js no frontend, Python/Flask no backend, PostgreSQL e integrações via API. No Fortão Prêmios trabalhei performance (cache Redis), rotas de pagamento e fluxo operacional completo.",
            opsLabel: "Operação:",
            opsText: "Background em suporte TI: gestão de acessos (AD/M365), monitoramento com Zabbix e resolução de incidentes N1/N2. Automatizo rotinas operacionais — reduzi até 80% do tempo em fluxos de atendimento interno.",
            badgeDev: "Fullstack em produção",
            badgeSupport: "Suporte N1/N2",
            downloadCV: "Baixar CV",
            downloadCVDev: "Dev",
            downloadCVSupport: "Suporte",
            loading: "Carregando experiência..."
        },
        // About Section
        about: {
            title: "Alexandro Granja",
            subtitle: "Desenvolvedor Fullstack · Especialista em Automações com IA",
            experience: "Experiência Profissional",
            education: "Formação",
            current: "Atual",
            aiverseDates: "Jun/2025 – Atual",
            prosperDates: "Nov/2024 – Atual",
            techSupport: "Analista de Suporte de TI",
            techSupportDesc: "Atuação em suporte técnico e operações de TI, com administração de acessos (Active Directory e Microsoft 365), monitoramento via Zabbix e integração com sistemas de logística (Target/Target Mob). Também desenvolvi automações para rotinas recorrentes, reduzindo esforço manual e aumentando a padronização dos processos.",
            founder: "Desenvolvedor Fullstack (Freelance)",
            founderDesc: "Criação de soluções web e automações inteligentes para acelerar operações de negócio: sites e sistemas responsivos, integrações entre plataformas e agentes para atendimento automatizado. Do desenho da arquitetura ao deploy (Vercel/Railway), com foco em eficiência e escalabilidade.",
            techEducation: "Técnico em Informática",
            techEducationLevel: "Ensino Médio Técnico",
            devclub: "DevClub Fullstack Pro",
            devclubLevel: "Formação Intensiva",
            automation: "Gestão de Automação",
            automationLevel: "Especialização IA & Ferramentas NoCode",
            pixelCommunity: "Comunidade Pixel",
            pixelCommunityLevel: "Criação de Agentes de IA e fluxos automatizados",
            freeCourse1: "Lógica de Programação",
            freeCourse1Level: "Fundação Bradesco · Certificado",
            freeCourse2: "Git & Versionamento",
            freeCourse2Level: "DIO · Certificado",
            freeCourse3: "Algoritmos e Estruturas de Dados",
            freeCourse3Level: "Curso em Vídeo · Certificado",
            freeCourse4: "Introdução a Modelos de Linguagem (LLM)",
            freeCourse4Level: "Google Cloud Skills Boost · Concluído",
            freeCourse5: "n8n Level 1 — Automação",
            freeCourse5Level: "n8n Academy · Certificado",
            onlineCerts: "Certificados Online",
            achievements: "Principais Conquistas",
            achievement1: "−80% no atendimento",
            achievement2: "apps full stack",
            achievement3: "integrações de APIs",
            location: "Localização",
            locationPlace: "Brasil, Rio de Janeiro",
            availability: "Disponível",
            cvTitle: "Currículo",
            seeking: "Buscando Oportunidades",
            seekingDesc: "Aberto a vagas nas áreas de:",
            seeking1: "Desenvolvimento Fullstack",
            seeking2: "Suporte Técnico",
            seeking3: "Automações (diferencial)",
            seekingDetail1: "React, Python, PostgreSQL · projetos em produção",
            seekingDetail2: "AD, M365, Zabbix · N1/N2",
            seekingDetail3: "n8n, APIs, WhatsApp · -80% tempo atendimento",
            contactButton: "Entre em contato",
            stat1: "2+ Anos Exp.",
            stat2: "6+ Projetos",
            stat3: "10+ Tecnologias",
            techStackLabel: "Stack Principal",
            readMore: "Ver mais",
            readLess: "Ver menos"
        },
        // Contact Section
        contact: {
            title: "Entre em Contato",
            subtitle: "Estou sempre aberto a novas conexões, aprendizado e colaborações"
        },
        // Agency Section
        agency: {
            roleLabel: "Freelancer & Dev",
            tagline: "Pelo AIverse entrego sites, sistemas e automações com IA — projetos reais, em produção.",
            service1: "Desenvolvimento Fullstack",
            service2: "Automações",
            service3: "Agentes de IA",
            projectsLabel: "Projetos Entregues",
            titleMain: "Soluções ",
            titleHighlight: "Digitais",
            card1Desc: "Plataforma de campanhas promocionais com autenticação JWT/bcrypt, cache em 5 camadas (↓40% no carregamento), integração com link de pagamento e emissão automática de notas fiscais via Nota Nacional. Dashboard admin com estatísticas em tempo real e deploy na Railway.",
            card1Highlight: "Cache 5 camadas · Pagamento · Nota Fiscal",
            card2Desc: "Sistema SaaS de cardápio digital com painel administrativo completo: gestão de produtos por categoria, controle de pedidos em tempo real e banco de dados em tempo real via Supabase. Interface responsiva para clientes e operadores.",
            card2Highlight: "Gestão completa de pedidos em tempo real",
            card3Desc: "Landing page de alta conversão para empresa de adesivos decorativos: galeria interativa de trabalhos, seção de serviços, integração direta com WhatsApp para orçamentos e SEO on-page otimizado para captação de leads orgânicos.",
            card3Highlight: "SEO otimizado para leads orgânicos",
            card4Type: "Ferramenta Web",
            card4Desc: "Ferramenta web que automatiza 100% da seleção de XMLs de notas fiscais: cruza os números de NF de uma planilha Excel com os arquivos XML de um ZIP e exporta um novo ZIP contendo apenas os correspondentes, com drag-and-drop e download automático.",
            card4Highlight: "Elimina 100% do processo manual de seleção",
            readMore: "Ler mais →",
            chatContactBtn: "Ir para Contato",
            chatAiverseBtn: "Visitar AIverse Technologies",
            cta: {
                question: "Pronto para transformar seu negócio com tecnologia?",
                button: "Visitar AIverse"
            }
        },
        // Skills Section
        skills: {
            techStack: "Tech Stack",
            mySkills: "Minhas Habilidades",
            mySkillsLabel: "Minhas ",
            mySkillsHighlight: "Habilidades",
            technologies: "25+ Tecnologias",
            frontend: "Frontend",
            backend: "Backend & Automação",
            tools: "Ferramentas",
            courses: "Certificados",
            sectionFrontend: "Frontend",
            sectionBackend: "Backend & Automação",
            sectionAi: "IA & LLMs",
            sectionSupport: "Ferramentas & Suporte",
            tabToolsShort: "Ferra.",
            // Níveis de proficiência
            expert: "Expert",
            advanced: "Avançado",
            intermediate: "Intermediário",
            specialist: "Especialista",
            // Categorias de habilidades
            versioning: "Versionamento",
            automation: "Automação",
            backendSkill: "Backend",
            database: "Banco de dados",
            nosql: "NoSQL",
            containerization: "Containerização",
            integration: "Integração",
            systems: "Sistemas",
            wms: "WMS",
            aiFlows: "Fluxos IA",
            framework: "Framework",
            api: "API",
            monitoring: "Monitoramento",
            office: "Office",
            management: "Gerenciamento",
            server: "Servidor",
            system: "Sistema",
            scripting: "Scripting",
            projectManagement: "Gestão",
            itsm: "ITSM",
            logistics: "Logística",
            dailyUse: "Uso diário",
            operational: "Operacional",
            remoteAccess: "Acesso Remoto",
            communication: "Comunicação",
            meetings: "Reuniões",
            state: "Estado",
            detailsBtn: "Detalhes",
            viewDetailsAria: "Ver detalhes",
            detailsSoon: "Detalhes em breve."
        },
        // Projects Section
        projects: {
            title: "Meus Projetos",
            subtitle: "Alguns dos meus trabalhos em desenvolvimento fullstack e automações",
            railLabel: "Lista de projetos",
            swipeHint: "Arraste para o lado para ver o próximo projeto",
            swipeBannerClose: "Fechar dica",
            readMore: "Ver mais",
            readLess: "Ver menos",
            viewDetails: "Ver detalhes",
            modalClose: "Fechar",
            visitSite: "Visitar Site",
            viewMenu: "Ver Cardápio",
            viewCode: "Ver Código",
            // Projeto 1: Fortão Prêmios
            project1Title: "Fortão Prêmios",
            project1Summary: "Plataforma em produção para campanhas promocionais: link de pagamento, automação de NF e cache em camadas para performance.",
            project1Description: "Sistema completo de campanhas promocionais online com Next.js 14, React e TypeScript. Implementei autenticação com JWT/bcrypt, cache em 5 camadas que reduziu o tempo de carregamento em 40%, dashboard administrativo com estatísticas em tempo real e design responsivo. Deploy na Railway com otimizações de performance e segurança.",
            // Projeto 2: Cardápio Online
            project2Title: "Cardápio Online",
            project2Summary: "SaaS de cardápio digital e pedidos com React, Supabase e painel administrativo completo.",
            project2Description: "Sistema completo de cardápio online com painel administrativo avançado. Desenvolvido com React 18 e integração total com Supabase. Inclui cardápio dinâmico, carrinho de compras, checkout completo, gerenciamento de pedidos, upload de imagens, configurações personalizáveis (cores, logo, endereço, redes sociais) e sistema de autenticação. Backend opcional em Flask/Python. Deploy realizado na Railway.",
            // Projeto 3: Moraes Adesivos
            project3Title: "Moraes Adesivos",
            project3Summary: "Site institucional focado em conversão para adesivos decorativos: galeria, SEO e WhatsApp.",
            project3Description: "Site completo desenvolvido pela AIverse Technologies para empresa especializada em adesivos decorativos. Landing page moderna com galeria de trabalhos, seção de serviços e integração com WhatsApp para orçamentos. Design responsivo e otimizado para conversão de leads.",
            // Projeto 4: Prosper Roteiros
            project4Title: "Prosper Roteiros",
            project4Summary: "Ferramenta interna para montar rotas de visitas com mapas, métricas e exportação CSV.",
            project4Description: "Sistema inteligente de geração de roteiros otimizados para vendedores. Desenvolvido com React e Flask/Python, utiliza algoritmo do vizinho mais próximo para otimização geográfica. Inclui agrupamento de clientes por proximidade usando coordenadas GPS e CEPs, geração automática de rotas com 6-8 visitas por rota, visualização interativa de rotas em mapas (Leaflet), dashboard com métricas detalhadas (total de visitas, dias de trabalho, distância média), gerenciamento de arquivos Excel/CSV, filtros por vendedor e data, e exportação de roteiros em CSV. Interface moderna e responsiva com design intuitivo.",
            // Projeto 5: Sistema de Chamados TI
            project5Title: "Sistema de Chamados",
            project5Summary: "Plataforma interna de tickets de TI com dashboard, SLA, portal do colaborador e integração com telefonia.",
            project5Description: "Sistema de gestão de chamados desenvolvido do zero para operação interna (~250 usuários), substituindo controle manual em planilhas. Backend em FastAPI com SQLAlchemy e Alembic; frontend React + Material UI com dashboard, fila N1/N2 e portal público para abertura de tickets. Integrações com Snipe-IT (inventário) e módulo de Gerenciamento de Telefones (ramais no contexto do atendimento), PostgreSQL unificado, deploy com Nginx + systemd.",
            // Projeto 6: Processador de XML
            project6Title: "Processador de XML",
            project6Summary: "Web app que cruza planilha Excel com XMLs de NF em ZIP e gera pacote filtrado automaticamente.",
            project6Description: "Sistema web para processamento e seleção de arquivos XML baseado em planilhas Excel. Desenvolvido com Flask e Python, permite fazer upload de uma planilha Excel (.xlsx) com números de NF na coluna B e um arquivo ZIP contendo XMLs de notas fiscais. O sistema verifica automaticamente se os números da planilha estão contidos nos XMLs, seleciona os arquivos correspondentes e gera um novo arquivo ZIP compactado com apenas os XMLs selecionados. Interface moderna e intuitiva com drag-and-drop, feedback visual durante o processamento e download automático do resultado.",
            // Projeto 7: Assistente Financeiro com IA
            project7Title: "Assistente Financeiro",
            project7Summary: "Automação financeira pessoal com LLMs — categorização de despesas, relatórios e insights gerados por IA.",
            project7Description: "Projeto pessoal em Python integrado a LLMs (OpenAI/Claude/Gemini) para automatizar a gestão financeira do dia a dia. O assistente processa lançamentos, categoriza despesas automaticamente, gera relatórios estruturados e responde perguntas em linguagem natural sobre o histórico — reduzindo o esforço manual de planilha e dando visibilidade clara sobre hábitos de gasto.",
            // Projeto 8: Carteira de Dividendos com IA
            project8Title: "Carteira Dividendos",
            project8Summary: "Análise de carteira focada em dividendos potencializada por LLMs — recomendações e insights automatizados.",
            project8Description: "Aplicação em Python para acompanhamento e análise de carteira de investimentos focada em dividendos. Combina dados de proventos e posições com LLMs (OpenAI/Claude/Gemini) para gerar recomendações personalizadas, identificar padrões na carteira e reduzir o esforço manual de revisão — pensada como ferramenta de apoio à decisão (não conselho financeiro)."
        }
    },
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            agency: "Agency",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact"
        },
        // Hero Section
        hero: {
            greeting: "Hello, I'm",
            subtitle: "Fullstack Developer · IT Support N1/N2",
            devLabel: "Development:",
            devText: "Production fullstack applications — React/Next.js on the frontend, Python/Flask on the backend, PostgreSQL and API integrations. On Fortão Prêmios I worked on performance (Redis cache), payment routes and the full operational flow.",
            opsLabel: "Operations:",
            opsText: "IT support background: access management (AD/M365), Zabbix monitoring and N1/N2 incident resolution. I automate operational routines — cut up to 80% of processing time on internal support flows.",
            badgeDev: "Production fullstack",
            badgeSupport: "N1/N2 Support",
            downloadCV: "Download CV",
            downloadCVDev: "Dev",
            downloadCVSupport: "Support",
            loading: "Loading experience..."
        },
        // About Section
        about: {
            title: "Alexandro Granja",
            subtitle: "Fullstack Developer · AI Automation Specialist",
            experience: "Professional Experience",
            education: "Education",
            current: "Current",
            aiverseDates: "Jun/2025 – Present",
            prosperDates: "Nov/2024 – Present",
            techSupport: "IT Support Analyst",
            techSupportDesc: "Technical support and IT operations with access management (Active Directory and Microsoft 365), Zabbix monitoring, and logistics systems integration (Target/Target Mob). I also built automations for recurring routines, reducing manual effort and increasing process standardization.",
            founder: "Fullstack Developer (Freelance)",
            founderDesc: "Built web solutions and smart automations to accelerate business operations: responsive websites and systems, cross-platform integrations, and automated support agents. End-to-end ownership from architecture to deployment (Vercel/Railway), focused on efficiency and scalability.",
            techEducation: "IT Technician",
            techEducationLevel: "Technical High School",
            devclub: "DevClub Fullstack Pro",
            devclubLevel: "Intensive Training",
            automation: "Automation Management",
            automationLevel: "AI & n8n Specialization",
            pixelCommunity: "Pixel Community",
            pixelCommunityLevel: "AI agents & automated workflows",
            freeCourse1: "Programming Logic",
            freeCourse1Level: "Fundação Bradesco · Certificate",
            freeCourse2: "Git & Version Control",
            freeCourse2Level: "DIO · Certificate",
            freeCourse3: "Algorithms & Data Structures",
            freeCourse3Level: "Curso em Vídeo · Certificate",
            freeCourse4: "Introduction to Large Language Models",
            freeCourse4Level: "Google Cloud Skills Boost · Completed",
            freeCourse5: "n8n Level 1 — Workflow Automation",
            freeCourse5Level: "n8n Academy · Certificate",
            onlineCerts: "Online Certificates",
            achievements: "Main Achievements",
            achievement1: "−80% support time",
            achievement2: "full stack apps",
            achievement3: "API integrations",
            location: "Location",
            locationPlace: "Brazil, Rio de Janeiro",
            availability: "Available",
            cvTitle: "Resume",
            seeking: "Seeking Opportunities",
            seekingDesc: "Open to roles in:",
            seeking1: "Fullstack Development",
            seeking2: "IT Support",
            seeking3: "Automations (edge)",
            seekingDetail1: "React, Python, PostgreSQL · production projects",
            seekingDetail2: "AD, M365, Zabbix · L1/L2",
            seekingDetail3: "n8n, APIs, WhatsApp · -80% support time",
            contactButton: "Get in Touch",
            stat1: "2+ Years Exp.",
            stat2: "6+ Projects",
            stat3: "10+ Technologies",
            techStackLabel: "Main Stack",
            readMore: "Read more",
            readLess: "Read less"
        },
        // Contact Section
        contact: {
            title: "Get in Touch",
            subtitle: "I'm always open to new connections, learning, and collaborations"
        },
        // Agency Section
        agency: {
            roleLabel: "Freelancer & Dev",
            tagline: "Through AIverse I deliver websites, systems and AI automations — real projects, in production.",
            service1: "Fullstack Development",
            service2: "Automations",
            service3: "AI Agents",
            projectsLabel: "Delivered Projects",
            titleMain: "Digital ",
            titleHighlight: "Solutions",
            card1Desc: "Promotional campaign platform with JWT/bcrypt auth, 5-layer cache (↓40% load time), payment link integration and automatic invoice issuance via Nota Nacional. Admin dashboard with real-time statistics, deployed on Railway.",
            card1Highlight: "5-layer Cache · Payment · Tax Invoice",
            card2Desc: "Digital menu SaaS with full admin panel: product management by category, real-time order tracking, and real-time database via Supabase. Responsive interface for customers and operators.",
            card2Highlight: "Full real-time order management",
            card3Desc: "High-conversion landing page for a decorative sticker company: interactive work gallery, services section, direct WhatsApp integration for quotes, and on-page SEO optimized for organic lead generation.",
            card3Highlight: "SEO optimized for organic leads",
            card4Type: "Web Tool",
            card4Desc: "Web tool that automates 100% of XML invoice selection: cross-references NF numbers from an Excel spreadsheet with XML files in a ZIP, and exports a new ZIP with only the matching files — with drag-and-drop and automatic download.",
            card4Highlight: "Eliminates 100% of manual selection process",
            readMore: "Read more →",
            chatContactBtn: "Go to Contact",
            chatAiverseBtn: "Visit AIverse Technologies",
            cta: {
                question: "Ready to transform your business with technology?",
                button: "Visit AIverse"
            }
        },
        // Skills Section
        skills: {
            techStack: "Tech Stack",
            mySkills: "My Skills",
            mySkillsLabel: "My ",
            mySkillsHighlight: "Skills",
            technologies: "25+ Technologies",
            frontend: "Frontend",
            backend: "Backend & Automation",
            tools: "Tools",
            courses: "Certificates",
            sectionFrontend: "Frontend",
            sectionBackend: "Backend & Automation",
            sectionAi: "AI & LLMs",
            sectionSupport: "Tools & Support",
            tabToolsShort: "Tools",
            // Níveis de proficiência
            expert: "Expert",
            advanced: "Advanced",
            intermediate: "Intermediate",
            specialist: "Specialist",
            // Categorias de habilidades
            versioning: "Version Control",
            automation: "Automation",
            backendSkill: "Backend",
            database: "Database",
            nosql: "NoSQL",
            containerization: "Containerization",
            integration: "Integration",
            systems: "Systems",
            wms: "WMS",
            aiFlows: "AI Flows",
            framework: "Framework",
            api: "API",
            monitoring: "Monitoring",
            office: "Office",
            management: "Management",
            server: "Server",
            system: "System",
            scripting: "Scripting",
            projectManagement: "Project Management",
            itsm: "ITSM",
            logistics: "Logistics",
            dailyUse: "Daily Use",
            operational: "Operational",
            remoteAccess: "Remote Access",
            communication: "Communication",
            meetings: "Meetings",
            state: "State",
            detailsBtn: "Details",
            viewDetailsAria: "View details",
            detailsSoon: "Details coming soon."
        },
        // Projects Section
        projects: {
            title: "My Projects",
            subtitle: "Some of my work in fullstack development and automation projects",
            railLabel: "Project list",
            swipeHint: "Swipe sideways to see the next project",
            swipeBannerClose: "Dismiss hint",
            readMore: "Read more",
            readLess: "Read less",
            viewDetails: "View details",
            modalClose: "Close",
            visitSite: "Visit Site",
            viewMenu: "View Menu",
            viewCode: "View Code",
            // Projeto 1: Fortão Prêmios
            project1Title: "Fortão Prêmios",
            project1Summary: "Production platform for promotional campaigns: payment links, invoicing automation and layered caching for performance.",
            project1Description: "Complete online promotional campaign system built with Next.js 14, React and TypeScript. Implemented JWT/bcrypt authentication, a 5-layer cache that cut loading time by 40%, an admin dashboard with real-time statistics, and responsive design. Deployed on Railway with performance and security optimizations.",
            // Projeto 2: Cardápio Online
            project2Title: "Online Menu",
            project2Summary: "Digital menu and ordering SaaS with React, Supabase and a full admin panel.",
            project2Description: "Complete online menu system with advanced admin panel. Developed with React 18 and full Supabase integration. Includes dynamic menu, shopping cart, complete checkout, order management, image upload, customizable settings (colors, logo, address, social media) and authentication system. Optional Flask/Python backend. Deployed on Railway.",
            // Projeto 3: Moraes Adesivos
            project3Title: "Moraes Adesivos",
            project3Summary: "Conversion-focused site for decorative stickers: gallery, SEO and WhatsApp quotes.",
            project3Description: "Complete website developed by AIverse Technologies for a company specialized in decorative stickers. Modern landing page with work gallery, services section and WhatsApp integration for quotes. Responsive design optimized for lead conversion.",
            // Projeto 4: Prosper Roteiros
            project4Title: "Prosper Roteiros",
            project4Summary: "Internal tool to build sales visit routes with maps, metrics and CSV export.",
            project4Description: "Intelligent system for generating optimized routes for salespeople. Developed with React and Flask/Python, uses nearest neighbor algorithm for geographic optimization. Includes customer grouping by proximity using GPS coordinates and ZIP codes, automatic route generation with 6-8 visits per route, interactive route visualization on maps (Leaflet), dashboard with detailed metrics (total visits, work days, average distance), Excel/CSV file management, filters by seller and date, and CSV route export. Modern and responsive interface with intuitive design.",
            // Project 5: IT Ticketing System
            project5Title: "IT Ticketing System",
            project5Summary: "Internal IT ticket platform with dashboard, SLA tracking, employee portal and telephony integration.",
            project5Description: "Ticket management system built from scratch for internal operations (~250 users), replacing manual spreadsheet tracking. FastAPI backend with SQLAlchemy and Alembic; React + Material UI frontend with dashboard, N1/N2 queue and public portal for ticket submission. Integrations with Snipe-IT (inventory) and Corporate Phone Management module (extensions in support context), unified PostgreSQL, deploy with Nginx + systemd.",
            // Project 6: XML Processor
            project6Title: "XML Processor",
            project6Summary: "Web app that matches an Excel sheet against invoice XMLs in a ZIP and outputs a filtered package.",
            project6Description: "Web system for processing and selecting XML files based on Excel spreadsheets. Developed with Flask and Python, allows uploading an Excel spreadsheet (.xlsx) with NF numbers in column B and a ZIP file containing invoice XMLs. The system automatically checks if the spreadsheet numbers are contained in the XMLs, selects the corresponding files and generates a new compressed ZIP file with only the selected XMLs. Modern and intuitive interface with drag-and-drop, visual feedback during processing and automatic result download.",
            // Project 7: AI Financial Assistant
            project7Title: "Financial Assistant",
            project7Summary: "Personal financial automation powered by LLMs — expense categorization, reports and AI-generated insights.",
            project7Description: "Personal Python project integrated with LLMs (OpenAI/Claude/Gemini) to automate day-to-day financial management. The assistant processes transactions, automatically categorizes expenses, generates structured reports and answers natural-language questions about history — cutting manual spreadsheet work and giving clear visibility into spending habits.",
            // Project 8: AI Dividend Portfolio
            project8Title: "Dividend Portfolio",
            project8Summary: "Dividend-focused portfolio analysis powered by LLMs — automated recommendations and insights.",
            project8Description: "Python application for tracking and analyzing dividend-focused investment portfolios. Combines income and position data with LLMs (OpenAI/Claude/Gemini) to generate personalized recommendations, surface patterns and reduce the manual effort of portfolio review — designed as a decision-support tool (not financial advice)."
        }
    }
};

// Função para obter o idioma atual
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'pt';
}

// Função para definir o idioma
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    updatePageLanguage(lang);
    // Atualizar título da página
    if (lang === 'pt') {
        document.title = 'Alexandro Granja | Desenvolvedor Fullstack & Especialista em Automações com IA';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Portfólio de Alexandro Granja — Desenvolvedor Fullstack & Especialista em Automações com IA. React, Python/Flask, PostgreSQL e n8n.');
        }
    } else {
        document.title = 'Alexandro Granja | Fullstack Developer & AI Automation Specialist';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Alexandro Granja Portfolio — Fullstack Developer & AI Automation Specialist. React, Python/Flask, PostgreSQL and n8n.');
        }
    }
}

// Função para atualizar todos os textos da página
function updatePageLanguage(lang) {
    const t = translations[lang];
    
    // Atualizar navegação
    document.querySelectorAll('[data-i18n="nav.home"]').forEach(el => el.textContent = t.nav.home);
    document.querySelectorAll('[data-i18n="nav.about"]').forEach(el => el.textContent = t.nav.about);
    document.querySelectorAll('[data-i18n="nav.agency"]').forEach(el => el.textContent = t.nav.agency);
    document.querySelectorAll('[data-i18n="nav.skills"]').forEach(el => el.textContent = t.nav.skills);
    document.querySelectorAll('[data-i18n="nav.projects"]').forEach(el => el.textContent = t.nav.projects);
    document.querySelectorAll('[data-i18n="nav.contact"]').forEach(el => el.textContent = t.nav.contact);
    
    // Atualizar Hero
    document.querySelectorAll('[data-i18n="hero.greeting"]').forEach(el => el.textContent = t.hero.greeting);
    document.querySelectorAll('[data-i18n="hero.subtitle"]').forEach(el => el.textContent = t.hero.subtitle);
    document.querySelectorAll('[data-i18n="hero.devLabel"]').forEach(el => el.textContent = t.hero.devLabel);
    document.querySelectorAll('[data-i18n="hero.devText"]').forEach(el => el.textContent = t.hero.devText);
    document.querySelectorAll('[data-i18n="hero.opsLabel"]').forEach(el => el.textContent = t.hero.opsLabel);
    document.querySelectorAll('[data-i18n="hero.opsText"]').forEach(el => el.textContent = t.hero.opsText);
    document.querySelectorAll('[data-i18n="hero.downloadCV"]').forEach(el => el.textContent = t.hero.downloadCV);
    document.querySelectorAll('[data-i18n="hero.badgeDev"]').forEach(el => el.textContent = t.hero.badgeDev);
    document.querySelectorAll('[data-i18n="hero.badgeSupport"]').forEach(el => el.textContent = t.hero.badgeSupport);
    document.querySelectorAll('[data-i18n="hero.downloadCVDev"]').forEach(el => el.textContent = t.hero.downloadCVDev);
    document.querySelectorAll('[data-i18n="hero.downloadCVSupport"]').forEach(el => el.textContent = t.hero.downloadCVSupport);
    document.querySelectorAll('[data-i18n="about.subtitle"]').forEach(el => el.textContent = t.about.subtitle);
    document.querySelectorAll('[data-i18n="about.aiverseDates"]').forEach(el => el.textContent = t.about.aiverseDates);
    document.querySelectorAll('[data-i18n="about.prosperDates"]').forEach(el => el.textContent = t.about.prosperDates);
    document.querySelectorAll('[data-i18n="hero.loading"]').forEach(el => el.textContent = t.hero.loading);

    // Atualizar About
    document.querySelectorAll('[data-i18n="about.experience"]').forEach(el => el.textContent = t.about.experience);
    document.querySelectorAll('[data-i18n="about.education"]').forEach(el => el.textContent = t.about.education);
    document.querySelectorAll('[data-i18n="about.current"]').forEach(el => el.textContent = t.about.current);
    document.querySelectorAll('[data-i18n="about.techSupport"]').forEach(el => el.textContent = t.about.techSupport);
    document.querySelectorAll('[data-i18n="about.techSupportDesc"]').forEach(el => el.textContent = t.about.techSupportDesc);
    document.querySelectorAll('[data-i18n="about.founder"]').forEach(el => el.textContent = t.about.founder);
    document.querySelectorAll('[data-i18n="about.founderDesc"]').forEach(el => el.textContent = t.about.founderDesc);
    document.querySelectorAll('[data-i18n="about.techEducation"]').forEach(el => el.textContent = t.about.techEducation);
    document.querySelectorAll('[data-i18n="about.techEducationLevel"]').forEach(el => el.textContent = t.about.techEducationLevel);
    document.querySelectorAll('[data-i18n="about.devclub"]').forEach(el => el.textContent = t.about.devclub);
    document.querySelectorAll('[data-i18n="about.devclubLevel"]').forEach(el => el.textContent = t.about.devclubLevel);
    document.querySelectorAll('[data-i18n="about.automation"]').forEach(el => el.textContent = t.about.automation);
    document.querySelectorAll('[data-i18n="about.automationLevel"]').forEach(el => el.textContent = t.about.automationLevel);
    document.querySelectorAll('[data-i18n="about.pixelCommunity"]').forEach(el => el.textContent = t.about.pixelCommunity);
    document.querySelectorAll('[data-i18n="about.pixelCommunityLevel"]').forEach(el => el.textContent = t.about.pixelCommunityLevel);
    document.querySelectorAll('[data-i18n="about.freeCourse1"]').forEach(el => el.textContent = t.about.freeCourse1);
    document.querySelectorAll('[data-i18n="about.freeCourse1Level"]').forEach(el => el.textContent = t.about.freeCourse1Level);
    document.querySelectorAll('[data-i18n="about.freeCourse2"]').forEach(el => el.textContent = t.about.freeCourse2);
    document.querySelectorAll('[data-i18n="about.freeCourse2Level"]').forEach(el => el.textContent = t.about.freeCourse2Level);
    document.querySelectorAll('[data-i18n="about.freeCourse3"]').forEach(el => el.textContent = t.about.freeCourse3);
    document.querySelectorAll('[data-i18n="about.freeCourse3Level"]').forEach(el => el.textContent = t.about.freeCourse3Level);
    document.querySelectorAll('[data-i18n="about.freeCourse4"]').forEach(el => el.textContent = t.about.freeCourse4);
    document.querySelectorAll('[data-i18n="about.freeCourse4Level"]').forEach(el => el.textContent = t.about.freeCourse4Level);
    document.querySelectorAll('[data-i18n="about.freeCourse5"]').forEach(el => el.textContent = t.about.freeCourse5);
    document.querySelectorAll('[data-i18n="about.freeCourse5Level"]').forEach(el => el.textContent = t.about.freeCourse5Level);
    document.querySelectorAll('[data-i18n="about.onlineCerts"]').forEach(el => el.textContent = t.about.onlineCerts);
    document.querySelectorAll('[data-i18n="about.achievements"]').forEach(el => el.textContent = t.about.achievements);
    document.querySelectorAll('[data-i18n="about.achievement1"]').forEach(el => el.textContent = t.about.achievement1);
    document.querySelectorAll('[data-i18n="about.achievement2"]').forEach(el => el.textContent = t.about.achievement2);
    document.querySelectorAll('[data-i18n="about.achievement3"]').forEach(el => el.textContent = t.about.achievement3);
    document.querySelectorAll('[data-i18n="about.location"]').forEach(el => el.textContent = t.about.location);
    document.querySelectorAll('[data-i18n="about.locationPlace"]').forEach(el => el.textContent = t.about.locationPlace);
    document.querySelectorAll('[data-i18n="about.cvTitle"]').forEach(el => el.textContent = t.about.cvTitle);
    document.querySelectorAll('[data-i18n="about.seeking"]').forEach(el => el.textContent = t.about.seeking);
    document.querySelectorAll('[data-i18n="about.seekingDesc"]').forEach(el => el.textContent = t.about.seekingDesc);
    document.querySelectorAll('[data-i18n="about.seeking1"]').forEach(el => el.textContent = t.about.seeking1);
    document.querySelectorAll('[data-i18n="about.seeking2"]').forEach(el => el.textContent = t.about.seeking2);
    document.querySelectorAll('[data-i18n="about.seeking3"]').forEach(el => el.textContent = t.about.seeking3);
    document.querySelectorAll('[data-i18n="about.seekingDetail1"]').forEach(el => el.textContent = t.about.seekingDetail1);
    document.querySelectorAll('[data-i18n="about.seekingDetail2"]').forEach(el => el.textContent = t.about.seekingDetail2);
    document.querySelectorAll('[data-i18n="about.seekingDetail3"]').forEach(el => el.textContent = t.about.seekingDetail3);
    document.querySelectorAll('[data-i18n="about.contactButton"]').forEach(el => el.textContent = t.about.contactButton);
    document.querySelectorAll('[data-i18n="about.subtitle"]').forEach(el => el.textContent = t.about.subtitle);
    document.querySelectorAll('[data-i18n="about.availability"]').forEach(el => el.textContent = t.about.availability);
    document.querySelectorAll('[data-i18n="about.stat1"]').forEach(el => el.textContent = t.about.stat1);
    document.querySelectorAll('[data-i18n="about.stat2"]').forEach(el => el.textContent = t.about.stat2);
    document.querySelectorAll('[data-i18n="about.stat3"]').forEach(el => el.textContent = t.about.stat3);
    document.querySelectorAll('[data-i18n="about.techStackLabel"]').forEach(el => el.textContent = t.about.techStackLabel);
    
    // Atualizar Skills
    document.querySelectorAll('[data-i18n="skills.techStack"]').forEach(el => el.textContent = t.skills.techStack);
    document.querySelectorAll('[data-i18n="skills.mySkillsLabel"]').forEach(el => el.textContent = t.skills.mySkillsLabel);
    document.querySelectorAll('[data-i18n="skills.mySkillsHighlight"]').forEach(el => el.textContent = t.skills.mySkillsHighlight);
    document.querySelectorAll('[data-i18n="skills.technologies"]').forEach(el => el.textContent = t.skills.technologies);
    document.querySelectorAll('[data-i18n="skills.frontend"]').forEach(el => el.textContent = t.skills.frontend);
    document.querySelectorAll('[data-i18n="skills.backend"]').forEach(el => el.textContent = t.skills.backend);
    document.querySelectorAll('[data-i18n="skills.tools"]').forEach(el => el.textContent = t.skills.tools);
    document.querySelectorAll('[data-i18n="skills.courses"]').forEach(el => el.textContent = t.skills.courses);
    document.querySelectorAll('.skills-active-section-name').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key && t.skills) {
            const k = key.replace('skills.', '');
            if (t.skills[k]) el.textContent = t.skills[k];
        }
    });

    // Atualizar Agency
    document.querySelectorAll('[data-i18n="agency.roleLabel"]').forEach(el => el.textContent = t.agency.roleLabel);
    document.querySelectorAll('[data-i18n="agency.tagline"]').forEach(el => el.textContent = t.agency.tagline);
    document.querySelectorAll('[data-i18n="agency.service1"]').forEach(el => el.textContent = t.agency.service1);
    document.querySelectorAll('[data-i18n="agency.service2"]').forEach(el => el.textContent = t.agency.service2);
    document.querySelectorAll('[data-i18n="agency.service3"]').forEach(el => el.textContent = t.agency.service3);
    document.querySelectorAll('[data-i18n="agency.projectsLabel"]').forEach(el => el.textContent = t.agency.projectsLabel);
    document.querySelectorAll('[data-i18n="agency.cta.question"]').forEach(el => el.textContent = t.agency.cta.question);
    document.querySelectorAll('[data-i18n="agency.cta.button"]').forEach(el => el.textContent = t.agency.cta.button);
    document.querySelectorAll('[data-i18n="agency.titleMain"]').forEach(el => el.textContent = t.agency.titleMain);
    document.querySelectorAll('[data-i18n="agency.titleHighlight"]').forEach(el => el.textContent = t.agency.titleHighlight);
    document.querySelectorAll('[data-i18n="agency.card1Desc"]').forEach(el => el.textContent = t.agency.card1Desc);
    document.querySelectorAll('[data-i18n="agency.card1Highlight"]').forEach(el => el.textContent = t.agency.card1Highlight);
    document.querySelectorAll('[data-i18n="agency.card2Desc"]').forEach(el => el.textContent = t.agency.card2Desc);
    document.querySelectorAll('[data-i18n="agency.card2Highlight"]').forEach(el => el.textContent = t.agency.card2Highlight);
    document.querySelectorAll('[data-i18n="agency.card3Desc"]').forEach(el => el.textContent = t.agency.card3Desc);
    document.querySelectorAll('[data-i18n="agency.card3Highlight"]').forEach(el => el.textContent = t.agency.card3Highlight);
    document.querySelectorAll('[data-i18n="agency.card4Type"]').forEach(el => el.textContent = t.agency.card4Type);
    document.querySelectorAll('[data-i18n="agency.card4Desc"]').forEach(el => el.textContent = t.agency.card4Desc);
    document.querySelectorAll('[data-i18n="agency.card4Highlight"]').forEach(el => el.textContent = t.agency.card4Highlight);
    document.querySelectorAll('[data-i18n="agency.readMore"]').forEach(el => el.textContent = t.agency.readMore);
    if (window.agentWidgetRestart) window.agentWidgetRestart(lang);
    if (window.rebuildSkillPips) window.rebuildSkillPips();
    if (typeof window.refreshSkillDetailsUi === 'function') window.refreshSkillDetailsUi();
    
    // Atualizar Projects
    document.querySelectorAll('[data-i18n="projects.title"]').forEach(el => {
        if (el.classList.contains('title-text-white')) {
            el.textContent = lang === 'pt' ? 'Meus ' : 'My ';
        } else if (el.classList.contains('title-text-orange')) {
            el.textContent = lang === 'pt' ? 'Projetos' : 'Projects';
        }
    });
    document.querySelectorAll('[data-i18n="projects.subtitle"]').forEach(el => el.textContent = t.projects.subtitle);
    document.querySelectorAll('[data-i18n="projects.readMore"]').forEach(el => el.textContent = t.projects.readMore);
    document.querySelectorAll('[data-i18n="projects.readLess"]').forEach(el => el.textContent = t.projects.readLess);
    document.querySelectorAll('[data-i18n="projects.visitSite"]').forEach(el => el.textContent = t.projects.visitSite);
    document.querySelectorAll('[data-i18n="projects.viewMenu"]').forEach(el => el.textContent = t.projects.viewMenu);
    document.querySelectorAll('[data-i18n="projects.viewCode"]').forEach(el => el.textContent = t.projects.viewCode);
    document.querySelectorAll('[data-i18n="projects.viewDetails"]').forEach(el => el.textContent = t.projects.viewDetails);
    // Atualizar títulos e descrições dos projetos
    document.querySelectorAll('[data-i18n="projects.project1Title"]').forEach(el => {
        const parts = t.projects.project1Title.split(' ');
        if (el.classList && el.classList.contains('text-primary')) {
            el.textContent = parts[1] || parts[0];
        } else {
            el.textContent = parts[0];
        }
    });
    document.querySelectorAll('[data-i18n="projects.project1Description"]').forEach(el => el.textContent = t.projects.project1Description);
    document.querySelectorAll('[data-i18n="projects.project2Title"]').forEach(el => {
        const parts = t.projects.project2Title.split(' ');
        if (el.classList && el.classList.contains('text-primary')) {
            el.textContent = parts[1] || parts[0];
        } else {
            el.textContent = parts[0];
        }
    });
    document.querySelectorAll('[data-i18n="projects.project2Description"]').forEach(el => el.textContent = t.projects.project2Description);
    document.querySelectorAll('[data-i18n="projects.project3Title"]').forEach(el => {
        const parts = t.projects.project3Title.split(' ');
        if (el.classList && el.classList.contains('text-primary')) {
            el.textContent = parts[1] || parts[0];
        } else {
            el.textContent = parts[0];
        }
    });
    document.querySelectorAll('[data-i18n="projects.project3Description"]').forEach(el => el.textContent = t.projects.project3Description);
    document.querySelectorAll('[data-i18n="projects.project4Title"]').forEach(el => {
        const parts = t.projects.project4Title.split(' ');
        if (el.classList && el.classList.contains('text-primary')) {
            el.textContent = parts[1] || parts[0];
        } else {
            el.textContent = parts[0];
        }
    });
    document.querySelectorAll('[data-i18n="projects.project4Description"]').forEach(el => el.textContent = t.projects.project4Description);
    document.querySelectorAll('[data-i18n="projects.project5Title"]').forEach(el => {
        const parts = t.projects.project5Title.split(' ');
        if (el.classList && el.classList.contains('text-primary')) {
            el.textContent = parts[parts.length - 1] || parts[0];
        } else {
            el.textContent = parts.length > 1 ? parts.slice(0, -1).join(' ') : parts[0];
        }
    });
    document.querySelectorAll('[data-i18n="projects.project5Description"]').forEach(el => el.textContent = t.projects.project5Description);
    document.querySelectorAll('[data-i18n="projects.project6Title"]').forEach(el => {
        if (el.classList && el.classList.contains('text-primary')) {
            el.textContent = lang === 'pt' ? 'XML' : 'Processor';
        } else {
            el.textContent = lang === 'pt' ? 'Processador de' : 'XML';
        }
    });
    document.querySelectorAll('[data-i18n="projects.project6Description"]').forEach(el => el.textContent = t.projects.project6Description);
    document.querySelectorAll('[data-i18n="projects.project7Title"]').forEach(el => {
        const parts = t.projects.project7Title.split(' ');
        if (el.classList && el.classList.contains('text-primary')) {
            el.textContent = parts[1] || parts[0];
        } else {
            el.textContent = parts[0];
        }
    });
    document.querySelectorAll('[data-i18n="projects.project7Description"]').forEach(el => el.textContent = t.projects.project7Description);
    document.querySelectorAll('[data-i18n="projects.project8Title"]').forEach(el => {
        const parts = t.projects.project8Title.split(' ');
        if (el.classList && el.classList.contains('text-primary')) {
            el.textContent = parts[1] || parts[0];
        } else {
            el.textContent = parts[0];
        }
    });
    document.querySelectorAll('[data-i18n="projects.project8Description"]').forEach(el => el.textContent = t.projects.project8Description);
    document.querySelectorAll('[data-i18n="projects.project1Summary"]').forEach(el => el.textContent = t.projects.project1Summary);
    document.querySelectorAll('[data-i18n="projects.project2Summary"]').forEach(el => el.textContent = t.projects.project2Summary);
    document.querySelectorAll('[data-i18n="projects.project3Summary"]').forEach(el => el.textContent = t.projects.project3Summary);
    document.querySelectorAll('[data-i18n="projects.project4Summary"]').forEach(el => el.textContent = t.projects.project4Summary);
    document.querySelectorAll('[data-i18n="projects.project5Summary"]').forEach(el => el.textContent = t.projects.project5Summary);
    document.querySelectorAll('[data-i18n="projects.project6Summary"]').forEach(el => el.textContent = t.projects.project6Summary);
    document.querySelectorAll('[data-i18n="projects.project7Summary"]').forEach(el => el.textContent = t.projects.project7Summary);
    document.querySelectorAll('[data-i18n="projects.project8Summary"]').forEach(el => el.textContent = t.projects.project8Summary);
    const projectsRail = document.querySelector('.projects-rail');
    if (projectsRail && t.projects.railLabel) {
        projectsRail.setAttribute('aria-label', t.projects.railLabel);
    }
    document.querySelectorAll('.projects-swipe-hint__label').forEach(el => {
        if (t.projects.swipeHint) el.textContent = t.projects.swipeHint;
    });
    const projectModalClose = document.querySelector('.project-detail-modal__close');
    if (projectModalClose && t.projects.modalClose) {
        projectModalClose.setAttribute('aria-label', t.projects.modalClose);
        projectModalClose.setAttribute('title', t.projects.modalClose);
    }
    document.querySelectorAll('[data-rail-for-project]').forEach(el => {
        const i = parseInt(el.getAttribute('data-rail-for-project'), 10);
        if (Number.isNaN(i) || i < 0) return;
        const key = 'project' + (i + 1) + 'Title';
        if (t.projects[key]) el.textContent = t.projects[key];
    });

    // Atualizar Contact
    document.querySelectorAll('[data-i18n="contact.title"]').forEach(el => {
        if (el.classList.contains('title-text-white')) {
            el.textContent = lang === 'pt' ? 'Entre em ' : 'Get in ';
        } else if (el.classList.contains('title-text-orange')) {
            el.textContent = lang === 'pt' ? 'Contato' : 'Touch';
        }
    });
    document.querySelectorAll('[data-i18n="contact.subtitle"]').forEach(el => el.textContent = t.contact.subtitle);
    
    // Atualizar botão de idioma
    const langText = document.getElementById('language-text');
    const langBtn = document.getElementById('language-btn');
    if (langText) langText.textContent = lang === 'pt' ? 'EN' : 'PT';
    if (langBtn) langBtn.setAttribute('title', lang === 'pt' ? 'Switch to English' : 'Mudar para Português');

    // Generic i18n fallback — handles skill labels and any other data-i18n not covered above
    const specialKeys = new Set([
        'projects.title', 'contact.title',
        'projects.project1Title', 'projects.project2Title',
        'projects.project3Title', 'projects.project4Title',
        'projects.project5Title', 'projects.project6Title',
        'projects.project7Title', 'projects.project8Title'
    ]);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (specialKeys.has(key)) return;
        const parts = key.split('.');
        let value = t;
        for (const p of parts) {
            if (value && typeof value === 'object') value = value[p];
            else { value = undefined; break; }
        }
        if (typeof value === 'string') el.textContent = value;
    });

    requestAnimationFrame(() => {
        if (typeof refreshAboutExperienceToggles === 'function') {
            refreshAboutExperienceToggles();
        }
    });
}

// Função para alternar idioma
function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    setLanguage(newLang);
}

// Inicializar idioma ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    setLanguage(currentLang);
});

// Enhanced Scroll Handler - Unified function
let ticking = false;

// Removed scroll handler - using section navigation instead

// Initialize - Show saved section or home section by default
document.addEventListener('DOMContentLoaded', () => {
    // Hide all sections first
    const allSections = document.querySelectorAll('.section-content');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Get saved section from localStorage or default to home
    const savedSection = localStorage.getItem('currentSection') || '#home';
    const targetSection = document.querySelector(savedSection);
    
    // Show saved section or home section
    if (targetSection) {
        targetSection.classList.add('active');
        // Update active nav link
        const targetLink = document.querySelector(`[href="${savedSection}"], [data-section="${savedSection.replace('#', '')}"]`);
        if (targetLink) {
            const icon = targetLink.querySelector('.material-icons-round');
            const text = targetLink.querySelector('span:last-child');
            targetLink.classList.remove('text-slate-400');
            targetLink.classList.add('text-primary');
            if (icon) icon.classList.add('text-primary');
            if (text) text.classList.add('text-primary');
        }
        if (savedSection === '#projects' && typeof window.refreshProjectsPanel === 'function') {
            setTimeout(() => window.refreshProjectsPanel(), 250);
        }
    } else {
        // Fallback to home if saved section doesn't exist
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.classList.add('active');
        }
        const homeLink = document.querySelector('[href="#home"]');
        if (homeLink) {
            const icon = homeLink.querySelector('.material-icons-round');
            const text = homeLink.querySelector('span:last-child');
            homeLink.classList.remove('text-slate-400');
            homeLink.classList.add('text-primary');
            if (icon) icon.classList.add('text-primary');
            if (text) text.classList.add('text-primary');
        }
    }
});

// Enhanced parallax effect function
function updateParallax(scrolled) {
    const rate = scrolled * -0.5;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${rate * 0.3}px)`;
    }

    // Background elements parallax
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Enhanced Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create multiple observers for different animation types
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Add staggered animation to children if they exist
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('revealed');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections and cards for animations
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll reveal classes to elements
    const sections = document.querySelectorAll('section:not(.section-content)');
    sections.forEach((section, index) => {
        section.classList.add('scroll-reveal');
        if (index % 2 === 0) {
            section.classList.add('scroll-reveal-left');
        } else {
            section.classList.add('scroll-reveal-right');
        }
    });

    // Add scroll reveal to cards
    const cards = document.querySelectorAll('.project-card, .skill-item, .info-item, .contact-item');
    cards.forEach((card, index) => {
        card.classList.add('scroll-reveal-scale', 'stagger-item');
    });

    // Add scroll reveal to section headers
    const headers = document.querySelectorAll('.section-header');
    headers.forEach(header => {
        header.classList.add('scroll-reveal');
    });

    // Observe all elements
    const animateElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    animateElements.forEach(el => {
        fadeInObserver.observe(el);
    });
});

// Enhanced parallax effect
function requestTick() {
    // This function is now handled by the unified scroll handler
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 150);
    }
});

// Skill Items Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
            item.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.4)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = 'none';
        });
    });
});

// Project Cards Hover Effects - Removido para evitar efeito de subir

// Parallax Effect for Hero Section - Already handled in unified scroll handler

// Floating Elements Animation (somente atraso de animação, sem acumular transforms)
document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const delay = index * 2;
        element.style.animationDelay = `${delay}s`;
    });
});

// Contact Form Validation (if form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Scroll to Top Button - Already handled in unified scroll handler

// Scroll to Top Functionality (for main container)
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(15, 23, 42, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
    
    .nav-link.active {
        color: #60a5fa !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;

document.head.appendChild(style);

// Console welcome message
console.log(`
%c🚀 Portfólio de Alexandro Granja
%c👨‍💻 Desenvolvedor Fullstack & Especialista em Automações com IA
%c💼 Dev Fullstack | AIverse · Ex-Prosper (Suporte TI)
%c📧 Alex.granjaaa@hotmail.com
%c🔗 GitHub: github.com/AlexandroGranja
%c🌐 AIverse Technologies: https://www.aiversetechnologies.com.br/

%c✨ Obrigado por visitar meu portfólio!
%c🎨 Design moderno com animações avançadas
%c🔧 Desenvolvido com HTML, CSS e JavaScript puro
`, 
'color: #3b82f6; font-size: 16px; font-weight: bold;',
'color: #60a5fa; font-size: 14px;',
'color: #8b5cf6; font-size: 12px;',
'color: #cbd5e1; font-size: 12px;',
'color: #cbd5e1; font-size: 12px;',
'color: #06b6d4; font-size: 12px;',
'color: #3b82f6; font-size: 14px; font-weight: bold; margin-top: 10px;',
'color: #94a3b8; font-size: 11px;',
'color: #94a3b8; font-size: 11px;'
);

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página carregada em ${Math.round(loadTime)}ms`);
});

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        console.log('🎉 Easter egg ativado! Você encontrou o código secreto!');
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ============================================
// TELA DE LOADING
// ============================================

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Aguardar animação de loading completar
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remover elemento após transição
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
});

// ============================================
// ANIMAÇÕES INTERATIVAS AVANÇADAS
// ============================================

// Cursor personalizado com efeito de partículas
if (ENABLE_CURSOR) document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #60a5fa;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #3b82f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.3s ease;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px #3b82f6;
    `;
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        const speed = 0.15;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Expandir cursor ao hover em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#8b5cf6';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#60a5fa';
        });
    });
});

// Sistema de partículas no fundo
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.5;
        `;
        document.body.prepend(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: `hsla(${200 + Math.random() * 60}, 70%, 60%, 0.5)`
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            // Movimento
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Atração ao mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx += dx / distance * force * 0.2;
                particle.vy += dy / distance * force * 0.2;
            }
            
            // Limites da tela
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Fricção
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Desenhar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Conectar partículas próximas
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `hsla(220, 70%, 60%, ${1 - distance / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar sistema de partículas
if (ENABLE_PARTICLES) window.addEventListener('load', () => {
    new ParticleSystem();
});

// Efeito de ondulação ao clicar
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple-expand 0.8s ease-out;
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
});

const rippleExpandStyle = document.createElement('style');
rippleExpandStyle.textContent = `
    @keyframes ripple-expand {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleExpandStyle);

// Efeito parallax no mouse para cards
if (ENABLE_CARD_TILT) document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .agency-card, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
});

// Efeito de texto animado
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pular títulos que já têm spans com classes de cor (projetos e contato)
                if (entry.target.querySelector('.title-text-white') || entry.target.querySelector('.title-text-orange')) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                    return;
                }
                
                const text = entry.target.textContent;
                entry.target.textContent = '';
                entry.target.style.opacity = '1';
                
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
                    entry.target.appendChild(span);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
});

const fadeInCharStyle = document.createElement('style');
fadeInCharStyle.textContent = `
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInCharStyle);

// Contador animado para estatísticas (se adicionar no futuro)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Efeito de brilho removido conforme solicitado

console.log('✨ Animações avançadas carregadas com sucesso!');

// =====================================================
// SKILL DETAILS — descrição honesta + nível detalhado
// Editável: ajuste textos/níveis aqui sem mexer no HTML.
// =====================================================
const SKILL_DETAILS_PT = {
    // ============ FRONTEND ============
    'html5':           { name: 'HTML5',            level: 'Expert · 5+ anos',          tags: ['Semântica', 'SEO', 'A11y'],
        description: 'Marcação semântica em todos os projetos. SEO técnico no Moraes Adesivos, formulários acessíveis no Burger House, OG tags e meta no Fortão Prêmios.' },
    'css3':            { name: 'CSS3',             level: 'Expert · 5+ anos',          tags: ['Grid', 'Flexbox', 'Animations'],
        description: 'Layouts responsivos, animações, grids complexos. ~2.500 linhas de CSS neste portfólio com variáveis e cascata controlada.' },
    'javascript':      { name: 'JavaScript',       level: 'Especialista · 4+ anos',    tags: ['ES6+', 'DOM', 'Async'],
        description: 'ES6+, async/await, DOM, eventos. Carrossel custom, i18n PT/EN com swipe gestures, integrações com APIs em projetos React e vanilla.' },
    'react':           { name: 'React',            level: 'Avançado · 3 anos',         tags: ['Hooks', 'Context', 'TanStack Query'],
        description: 'Hooks, Context, composição. Frontend do Fortão Prêmios (Next.js 14 + React 18), Burger House e cardápios digitais. TanStack Query para data fetching.' },
    'typescript':      { name: 'TypeScript',       level: 'Avançado · 2 anos',         tags: ['Types', 'Generics', 'Zod'],
        description: 'Tipagem em projetos Next.js, interfaces e generics. Migração progressiva de JS → TS no Fortão.' },
    'nextjs':          { name: 'Next.js',          level: 'Avançado · 2 anos',         tags: ['App Router', 'SSR/ISR', 'API Routes'],
        description: 'App Router, SSR/ISR, API Routes. Fortão Prêmios em produção com Next.js 14 deployado no Railway.' },
    'tailwind':        { name: 'Tailwind CSS',     level: 'Expert · 3 anos',           tags: ['JIT', 'Dark Mode', 'Mobile-first'],
        description: 'Utility-first em todos os projetos. JIT, dark mode, plugins customizados. Mobile-first sempre.' },
    'vuejs':           { name: 'Vue.js',           level: 'Intermediário · projetos pessoais', tags: ['Composition API'],
        description: 'Projetos pessoais e estudo. Composition API. Não é meu daily driver — preferência por React.' },
    'sass':            { name: 'SASS / SCSS',      level: 'Avançado · 3 anos',         tags: ['Mixins', 'Nesting', 'Variáveis'],
        description: 'Mixins, nesting, variáveis. Usado em projetos legados antes da migração para Tailwind.' },
    'bootstrap':       { name: 'Bootstrap',        level: 'Avançado · uso pontual',    tags: ['Prototipação', 'Legado'],
        description: 'Prototipação rápida e projetos que herdam stack legado.' },
    'git':             { name: 'Git',              level: 'Avançado · diário',         tags: ['Branches', 'PRs', 'Rebase'],
        description: 'Branches, PRs, rebase interativo. Trabalho colaborativo nos projetos da AIverse e Prosper.' },
    'radix':           { name: 'Radix UI',         level: 'Intermediário · projetos React', tags: ['Headless', 'A11y'],
        description: 'Componentes headless acessíveis. Uso com Tailwind para construir UIs custom sem reinventar a roda.' },
    'zustand':         { name: 'Zustand',          level: 'Intermediário · 1 ano',     tags: ['State', 'Leve'],
        description: 'Estado global leve. Preferência sobre Redux para apps pequenos/médios. Usado no Fortão.' },
    'vite':            { name: 'Vite',             level: 'Avançado · 2 anos',         tags: ['HMR', 'Build'],
        description: 'Dev server e build em projetos React fora do Next. HMR, plugins, otimizações de bundle.' },
    'react-hook-form': { name: 'React Hook Form',  level: 'Avançado · 2 anos',         tags: ['Forms', 'Validação Zod'],
        description: 'Formulários performáticos com validação Zod. Usado em forms complexos do Fortão e Burger House.' },
    'figma':           { name: 'Figma',            level: 'Intermediário · handoff',   tags: ['Design Handoff'],
        description: 'Leitura de design e handoff. Foco em implementação fiel ao mockup, não em criar do zero.' },

    // ============ BACKEND & AUTOMAÇÃO ============
    'python':          { name: 'Python',           level: 'Avançado · 3 anos',         tags: ['Automação', 'APIs', 'Scripts'],
        description: 'Scripts de automação, FastAPI/Flask, integrações n8n. Automações WhatsApp + n8n + Python que reduziram o tempo de atendimento em 80% na AIverse.' },
    'n8n':             { name: 'n8n',              level: 'Avançado · diário',         tags: ['Workflows', 'WhatsApp API', 'LLMs'],
        description: 'Workflows complexos: WhatsApp API + LLMs + Postgres. Self-hosted e cloud. Dezenas de fluxos em produção.' },
    'nodejs':          { name: 'Node.js',          level: 'Avançado · 3 anos',         tags: ['API REST', 'CLI'],
        description: 'API REST, scripts, ferramentas CLI. Base do ecossistema React/Next que uso no front.' },
    'supabase':        { name: 'Supabase',         level: 'Avançado · 2 anos',         tags: ['Auth', 'RLS', 'Realtime'],
        description: 'Auth, RLS, edge functions, realtime. Backend do Burger House e estrutura inicial de vários projetos.' },
    'postgresql':      { name: 'PostgreSQL',       level: 'Avançado · 3 anos',         tags: ['Queries', 'Índices', 'Migrations'],
        description: 'Queries complexas, índices, migrations. 13+ tabelas no Fortão Prêmios em produção.' },
    'mongodb':         { name: 'MongoDB',          level: 'Intermediário · uso ocasional', tags: ['NoSQL', 'Aggregations'],
        description: 'Documentos, agregações. Uso em projetos que não precisam de relacionamentos rígidos.' },
    'docker':          { name: 'Docker',           level: 'Intermediário · dev/deploy', tags: ['Containers', 'Compose'],
        description: 'Containers para dev e deploy. docker-compose em ambientes locais. Não opero K8s ainda.' },
    'rest-apis':       { name: 'REST APIs',        level: 'Avançado · 3 anos',         tags: ['Design', 'Auth', 'Paginação'],
        description: 'Design de endpoints, status codes, paginação, auth. 60+ rotas no Fortão Prêmios em produção.' },
    'graphql':         { name: 'GraphQL',          level: 'Básico · estudo',           tags: ['Schemas', 'Resolvers'],
        description: 'Conheço o básico de schemas e resolvers. Pouca experiência em produção.' },
    'flask':           { name: 'Flask',            level: 'Avançado · 2 anos',         tags: ['APIs', 'Microserviços'],
        description: 'APIs Python rápidas. Backend inicial do Burger House e protótipos.' },
    'fastapi':         { name: 'FastAPI',          level: 'Avançado · 2 anos',         tags: ['Async', 'OpenAPI'],
        description: 'Tipagem, docs automáticas, async. Preferência sobre Flask para projetos novos.' },
    'expressjs':       { name: 'Express.js',       level: 'Intermediário · projetos', tags: ['Node', 'Middleware'],
        description: 'APIs Node tradicionais. Stack comum em projetos que herdam codebase.' },

    // ============ IA & LLMs ============
    'openai-api':      { name: 'OpenAI API',       level: 'Avançado · integração diária', tags: ['GPT-4o', 'Function Calling', 'Structured Outputs'],
        description: 'GPT-4o / 4o-mini em automações de atendimento e geração de texto. Chamadas via SDK Python e n8n. Function calling e structured outputs em pipelines.' },
    'claude-api':      { name: 'Anthropic Claude API', level: 'Intermediário · projetos', tags: ['Sonnet', 'Análise', 'Classificação'],
        description: 'Claude (Sonnet) em pipelines de análise e classificação. Comparativo de custo/qualidade vs GPT em casos reais.' },
    'gemini-api':      { name: 'Google Gemini API', level: 'Básico · uso pontual',     tags: ['Multimodal', 'Imagem+Texto'],
        description: 'Uso pontual para multimodal (imagem+texto). Menos frequente que OpenAI/Claude no dia-a-dia.' },
    'claude-code':     { name: 'Claude Code',      level: 'Workflow · diário',         tags: ['Agente CLI', 'MCPs', 'Batch tasks'],
        description: 'Agente CLI do Anthropic. Uso diário para refactor, code review e batch tasks. Integrado com MCPs (Obsidian, Filesystem).' },
    'cursor':          { name: 'Cursor IDE',       level: 'Workflow · diário',         tags: ['Pair-programming', 'MCPs', 'Agente'],
        description: 'Pair-programming com IA. Editor padrão diário, com MCPs configurados (Playwright, GitHub, Obsidian). Edita este próprio portfólio com agente.' },
    'rag':             { name: 'RAG / Embeddings', level: 'Intermediário · projetos AIverse', tags: ['pgvector', 'Supabase Vector', 'Chunking'],
        description: 'Embeddings + pgvector / Supabase Vector. Bases de conhecimento para chatbots. Chunking e re-ranking básico.' },

    // ============ FERRAMENTAS / SUPORTE ============
    'zabbix':          { name: 'Zabbix',           level: 'Intermediário · Prosper',   tags: ['Monitoramento', 'Triggers', 'Dashboards'],
        description: 'Monitoramento de servidores e serviços na Prosper. Triggers, dashboards, agentes em Linux/Windows.' },
    'microsoft365':    { name: 'Microsoft 365',    level: 'Avançado · admin diário',   tags: ['Admin Center', 'Exchange', 'SharePoint'],
        description: 'Admin Center, gestão de usuários, licenças, Exchange Online, SharePoint básico.' },
    'active-directory':{ name: 'Active Directory', level: 'Intermediário · Suporte N1/N2', tags: ['Usuários', 'GPOs', 'OUs'],
        description: 'Usuários, grupos, GPOs, OUs. Suporte N1/N2 na Prosper para criação e troubleshooting de contas.' },
    'windows-server':  { name: 'Windows Server',   level: 'Intermediário · admin básico', tags: ['RDP', 'Serviços'],
        description: 'Administração básica, RDP, serviços. Apoio a infraestrutura interna.' },
    'linux':           { name: 'Linux',            level: 'Intermediário · servidores', tags: ['Bash', 'systemd', 'Ubuntu'],
        description: 'Bash, systemd, navegação, troubleshooting. Servidores Ubuntu para apps Python e Docker.' },
    'powershell':      { name: 'PowerShell',       level: 'Intermediário · scripts AD/M365', tags: ['Scripts', 'AD', 'M365'],
        description: 'Scripts de administração para AD, M365 e tarefas batch. Funcional, não expert.' },
    'jira':            { name: 'Jira',             level: 'Avançado · uso diário',     tags: ['Tickets', 'Sprints', 'Kanban'],
        description: 'Atlassian Jira / Service Management. Tickets, sprints, board Kanban. Operação diária.' },
    'servicenow':      { name: 'ServiceNow',       level: 'Operacional · N1',          tags: ['Tickets', 'ITSM'],
        description: 'Suporte N1 em chamados via ServiceNow. Opero a ferramenta, não administro.' },
    'erp-target':      { name: 'ERP Target',       level: 'Intermediário · suporte funcional', tags: ['Logística', 'Estoque'],
        description: 'Suporte funcional ao ERP usado em logística/estoque. Triagem de chamados e operação assistida.' },
    'target-mob':      { name: 'Target Mob',       level: 'Intermediário · campo',     tags: ['Mobile', 'Logística'],
        description: 'Componente mobile do ERP Target usado em campo. Suporte e configuração.' },
    'estoque':         { name: 'Gestão de Estoque', level: 'Intermediário · operação', tags: ['WMS', 'Inventário'],
        description: 'Operação de WMS (Target/integração ERP). Conferência, inventários, ajustes.' },
    'integracao-erp':  { name: 'Integração ERP',   level: 'Intermediário · troubleshooting', tags: ['ERP', 'Integrações'],
        description: 'Conector ERP ↔ outros sistemas. Suporte e troubleshooting de integrações.' },
    'anydesk':         { name: 'AnyDesk',          level: 'Uso diário · suporte remoto', tags: ['Acesso Remoto', 'Não assistido'],
        description: 'Suporte remoto a usuários internos e clientes. Configuração de acesso não atendido.' },
    'teamviewer':      { name: 'TeamViewer',       level: 'Operacional · uso pontual', tags: ['Acesso Remoto'],
        description: 'Alternativa ao AnyDesk em ambientes onde já é o padrão.' },
    'rdp':             { name: 'RDP / Remote Desktop', level: 'Avançado · diário',    tags: ['Windows', 'Gateway'],
        description: 'Conexão a servidores Windows e estações. Configuração de RDP e Gateway.' },
    'zendesk':         { name: 'Zendesk',          level: 'Operacional · tickets',     tags: ['Atendimento', 'Macros'],
        description: 'Atendimento via tickets, macros, automações básicas. Operacional, não admin.' },
    'teams':           { name: 'Microsoft Teams',  level: 'Avançado · diário',         tags: ['Reuniões', 'Canais', 'Integrações'],
        description: 'Padrão na rotina corporativa. Reuniões, canais, integrações com fluxos.' },
    'meet':            { name: 'Google Meet',      level: 'Avançado · diário',         tags: ['Reuniões', 'Clientes'],
        description: 'Reuniões com clientes da AIverse e prospects.' },
    'zoom':            { name: 'Zoom',             level: 'Intermediário · uso pontual', tags: ['Reuniões', 'Gravações'],
        description: 'Quando o cliente prefere. Configurações básicas, gravações.' }
};

/** English skill copy — same keys as SKILL_DETAILS_PT */
const SKILL_DETAILS_EN = {
    'html5':           { name: 'HTML5',            level: 'Expert · 5+ years',          tags: ['Semantics', 'SEO', 'A11y'],
        description: 'Semantic markup across projects. Technical SEO on Moraes Adesivos, accessible forms on Burger House, OG tags and meta on Fortão Prêmios.' },
    'css3':            { name: 'CSS3',             level: 'Expert · 5+ years',          tags: ['Grid', 'Flexbox', 'Animations'],
        description: 'Responsive layouts, animations, complex grids. ~2,500 lines of CSS in this portfolio with variables and controlled cascade.' },
    'javascript':      { name: 'JavaScript',       level: 'Specialist · 4+ years',    tags: ['ES6+', 'DOM', 'Async'],
        description: 'ES6+, async/await, DOM, events. Custom carousel, PT/EN i18n with swipe gestures, API integrations in React and vanilla projects.' },
    'react':           { name: 'React',            level: 'Advanced · 3 years',         tags: ['Hooks', 'Context', 'TanStack Query'],
        description: 'Hooks, Context, composition. Frontend for Fortão Prêmios (Next.js 14 + React 18), Burger House and digital menus. TanStack Query for data fetching.' },
    'typescript':      { name: 'TypeScript',       level: 'Advanced · 2 years',         tags: ['Types', 'Generics', 'Zod'],
        description: 'Typing in Next.js projects, interfaces and generics. Progressive JS → TS migration on Fortão.' },
    'nextjs':          { name: 'Next.js',          level: 'Advanced · 2 years',         tags: ['App Router', 'SSR/ISR', 'API Routes'],
        description: 'App Router, SSR/ISR, API Routes. Fortão Prêmios in production on Next.js 14 deployed to Railway.' },
    'tailwind':        { name: 'Tailwind CSS',     level: 'Expert · 3 years',           tags: ['JIT', 'Dark Mode', 'Mobile-first'],
        description: 'Utility-first on every project. JIT, dark mode, custom plugins. Mobile-first always.' },
    'vuejs':           { name: 'Vue.js',           level: 'Intermediate · side projects', tags: ['Composition API'],
        description: 'Side projects and learning. Composition API. Not my daily driver — I prefer React.' },
    'sass':            { name: 'SASS / SCSS',      level: 'Advanced · 3 years',         tags: ['Mixins', 'Nesting', 'Variables'],
        description: 'Mixins, nesting, variables. Used on legacy projects before migrating to Tailwind.' },
    'bootstrap':       { name: 'Bootstrap',        level: 'Advanced · occasional use',    tags: ['Prototyping', 'Legacy'],
        description: 'Rapid prototyping and projects that inherit a legacy stack.' },
    'git':             { name: 'Git',              level: 'Advanced · daily',         tags: ['Branches', 'PRs', 'Rebase'],
        description: 'Branches, PRs, interactive rebase. Collaborative work on AIverse and Prosper projects.' },
    'radix':           { name: 'Radix UI',         level: 'Intermediate · React projects', tags: ['Headless', 'A11y'],
        description: 'Accessible headless components. Used with Tailwind to build custom UIs without reinventing the wheel.' },
    'zustand':         { name: 'Zustand',          level: 'Intermediate · 1 year',     tags: ['State', 'Lightweight'],
        description: 'Lightweight global state. Preferred over Redux for small/medium apps. Used on Fortão.' },
    'vite':            { name: 'Vite',             level: 'Advanced · 2 years',         tags: ['HMR', 'Build'],
        description: 'Dev server and build for React projects outside Next. HMR, plugins, bundle optimizations.' },
    'react-hook-form': { name: 'React Hook Form',  level: 'Advanced · 2 years',         tags: ['Forms', 'Zod validation'],
        description: 'Performant forms with Zod validation. Used on complex forms for Fortão and Burger House.' },
    'figma':           { name: 'Figma',            level: 'Intermediate · handoff',   tags: ['Design Handoff'],
        description: 'Design reading and handoff. Focus on faithful implementation, not creating from scratch.' },
    'python':          { name: 'Python',           level: 'Advanced · 3 years',         tags: ['Automation', 'APIs', 'Scripts'],
        description: 'Automation scripts, FastAPI/Flask, n8n integrations. WhatsApp + n8n + Python automations that cut support time by 80% at AIverse.' },
    'n8n':             { name: 'n8n',              level: 'Advanced · daily',         tags: ['Workflows', 'WhatsApp API', 'LLMs'],
        description: 'Complex workflows: WhatsApp API + LLMs + Postgres. Self-hosted and cloud. Dozens of flows in production.' },
    'nodejs':          { name: 'Node.js',          level: 'Advanced · 3 years',         tags: ['REST API', 'CLI'],
        description: 'REST APIs, scripts, CLI tools. Foundation of the React/Next ecosystem I use on the front end.' },
    'supabase':        { name: 'Supabase',         level: 'Advanced · 2 years',         tags: ['Auth', 'RLS', 'Realtime'],
        description: 'Auth, RLS, edge functions, realtime. Backend for Burger House and initial structure for several projects.' },
    'postgresql':      { name: 'PostgreSQL',       level: 'Advanced · 3 years',         tags: ['Queries', 'Indexes', 'Migrations'],
        description: 'Complex queries, indexes, migrations. 13+ tables on Fortão Prêmios in production.' },
    'mongodb':         { name: 'MongoDB',          level: 'Intermediate · occasional', tags: ['NoSQL', 'Aggregations'],
        description: 'Documents, aggregations. Used when rigid relationships are not required.' },
    'docker':          { name: 'Docker',           level: 'Intermediate · dev/deploy', tags: ['Containers', 'Compose'],
        description: 'Containers for dev and deploy. docker-compose in local environments. I do not operate K8s yet.' },
    'rest-apis':       { name: 'REST APIs',        level: 'Advanced · 3 years',         tags: ['Design', 'Auth', 'Pagination'],
        description: 'Endpoint design, status codes, pagination, auth. 60+ routes on Fortão Prêmios in production.' },
    'graphql':         { name: 'GraphQL',          level: 'Basic · learning',           tags: ['Schemas', 'Resolvers'],
        description: 'I know schema and resolver basics. Limited production experience.' },
    'flask':           { name: 'Flask',            level: 'Advanced · 2 years',         tags: ['APIs', 'Microservices'],
        description: 'Fast Python APIs. Initial Burger House backend and prototypes.' },
    'fastapi':         { name: 'FastAPI',          level: 'Advanced · 2 years',         tags: ['Async', 'OpenAPI'],
        description: 'Typing, auto docs, async. Preferred over Flask for new projects.' },
    'expressjs':       { name: 'Express.js',       level: 'Intermediate · projects', tags: ['Node', 'Middleware'],
        description: 'Traditional Node APIs. Common stack in projects that inherit an existing codebase.' },
    'openai-api':      { name: 'OpenAI API',       level: 'Advanced · daily integration', tags: ['GPT-4o', 'Function Calling', 'Structured Outputs'],
        description: 'GPT-4o / 4o-mini in support automations and text generation. Calls via Python SDK and n8n. Function calling and structured outputs in pipelines.' },
    'claude-api':      { name: 'Anthropic Claude API', level: 'Intermediate · projects', tags: ['Sonnet', 'Analysis', 'Classification'],
        description: 'Claude (Sonnet) in analysis and classification pipelines. Cost/quality comparison vs GPT in real cases.' },
    'gemini-api':      { name: 'Google Gemini API', level: 'Basic · occasional',     tags: ['Multimodal', 'Image+Text'],
        description: 'Occasional multimodal use (image+text). Less frequent than OpenAI/Claude day to day.' },
    'claude-code':     { name: 'Claude Code',      level: 'Workflow · daily',         tags: ['CLI Agent', 'MCPs', 'Batch tasks'],
        description: 'Anthropic CLI agent. Daily use for refactors, code review and batch tasks. Integrated with MCPs (Obsidian, Filesystem).' },
    'cursor':          { name: 'Cursor IDE',       level: 'Workflow · daily',         tags: ['Pair programming', 'MCPs', 'Agent'],
        description: 'AI pair programming. Default daily editor with MCPs (Playwright, GitHub, Obsidian). Built this portfolio with the agent.' },
    'rag':             { name: 'RAG / Embeddings', level: 'Intermediate · AIverse projects', tags: ['pgvector', 'Supabase Vector', 'Chunking'],
        description: 'Embeddings + pgvector / Supabase Vector. Knowledge bases for chatbots. Basic chunking and re-ranking.' },
    'zabbix':          { name: 'Zabbix',           level: 'Intermediate · Prosper',   tags: ['Monitoring', 'Triggers', 'Dashboards'],
        description: 'Server and service monitoring at Prosper. Triggers, dashboards, agents on Linux/Windows.' },
    'microsoft365':    { name: 'Microsoft 365',    level: 'Advanced · daily admin',   tags: ['Admin Center', 'Exchange', 'SharePoint'],
        description: 'Admin Center, user management, licenses, Exchange Online, basic SharePoint.' },
    'active-directory':{ name: 'Active Directory', level: 'Intermediate · L1/L2 Support', tags: ['Users', 'GPOs', 'OUs'],
        description: 'Users, groups, GPOs, OUs. L1/L2 support at Prosper for account creation and troubleshooting.' },
    'windows-server':  { name: 'Windows Server',   level: 'Intermediate · basic admin', tags: ['RDP', 'Services'],
        description: 'Basic administration, RDP, services. Internal infrastructure support.' },
    'linux':           { name: 'Linux',            level: 'Intermediate · servers', tags: ['Bash', 'systemd', 'Ubuntu'],
        description: 'Bash, systemd, navigation, troubleshooting. Ubuntu servers for Python apps and Docker.' },
    'powershell':      { name: 'PowerShell',       level: 'Intermediate · AD/M365 scripts', tags: ['Scripts', 'AD', 'M365'],
        description: 'Admin scripts for AD, M365 and batch tasks. Functional, not expert level.' },
    'jira':            { name: 'Jira',             level: 'Advanced · daily',     tags: ['Tickets', 'Sprints', 'Kanban'],
        description: 'Atlassian Jira / Service Management. Tickets, sprints, Kanban board. Daily operations.' },
    'servicenow':      { name: 'ServiceNow',       level: 'Operational · L1',          tags: ['Tickets', 'ITSM'],
        description: 'L1 support on ServiceNow tickets. I operate the tool, I do not administer it.' },
    'erp-target':      { name: 'ERP Target',       level: 'Intermediate · functional support', tags: ['Logistics', 'Inventory'],
        description: 'Functional support for the ERP used in logistics/inventory. Ticket triage and assisted operations.' },
    'target-mob':      { name: 'Target Mob',       level: 'Intermediate · field',     tags: ['Mobile', 'Logistics'],
        description: 'Mobile component of ERP Target used in the field. Support and configuration.' },
    'estoque':         { name: 'Inventory Management', level: 'Intermediate · operations', tags: ['WMS', 'Inventory'],
        description: 'WMS operations (Target/ERP integration). Counting, inventories, adjustments.' },
    'integracao-erp':  { name: 'ERP Integration',   level: 'Intermediate · troubleshooting', tags: ['ERP', 'Integrations'],
        description: 'ERP ↔ other systems connector. Support and integration troubleshooting.' },
    'anydesk':         { name: 'AnyDesk',          level: 'Daily · remote support', tags: ['Remote Access', 'Unattended'],
        description: 'Remote support for internal users and clients. Unattended access setup.' },
    'teamviewer':      { name: 'TeamViewer',       level: 'Operational · occasional', tags: ['Remote Access'],
        description: 'Alternative to AnyDesk where it is already the standard.' },
    'rdp':             { name: 'RDP / Remote Desktop', level: 'Advanced · daily',    tags: ['Windows', 'Gateway'],
        description: 'Connections to Windows servers and workstations. RDP and Gateway configuration.' },
    'zendesk':         { name: 'Zendesk',          level: 'Operational · tickets',     tags: ['Support', 'Macros'],
        description: 'Ticket support, macros, basic automations. Operational, not admin.' },
    'teams':           { name: 'Microsoft Teams',  level: 'Advanced · daily',         tags: ['Meetings', 'Channels', 'Integrations'],
        description: 'Corporate routine standard. Meetings, channels, workflow integrations.' },
    'meet':            { name: 'Google Meet',      level: 'Advanced · daily',         tags: ['Meetings', 'Clients'],
        description: 'Meetings with AIverse clients and prospects.' },
    'zoom':            { name: 'Zoom',             level: 'Intermediate · occasional', tags: ['Meetings', 'Recordings'],
        description: 'When the client prefers it. Basic settings and recordings.' }
};

function getSkillDetails(skillId) {
    const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'pt';
    const store = lang === 'en' ? SKILL_DETAILS_EN : SKILL_DETAILS_PT;
    return store[skillId];
}

window.SKILL_DETAILS = SKILL_DETAILS_PT;

// =====================================================
// SKILL POPOVER (desktop) + DROPDOWN INLINE (mobile)
// =====================================================
(function initSkillInteraction() {
    let currentCard = null;

    function skillUiStrings() {
        const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'pt';
        const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang].skills : {};
        return {
            detailsBtn: t.detailsBtn || 'Detalhes',
            viewDetailsAria: t.viewDetailsAria || 'Ver detalhes',
            detailsSoon: t.detailsSoon || 'Detalhes em breve.'
        };
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
    }

    function applySkillDetailsButtonLabels() {
        const ui = skillUiStrings();
        document.querySelectorAll('.skill-details-btn').forEach(btn => {
            btn.setAttribute('aria-label', ui.viewDetailsAria);
            const label = btn.querySelector('span:first-child');
            if (label) label.textContent = ui.detailsBtn;
        });
    }

    // --- MOBILE: inject buttons + dropdown containers on load ---
    function injectMobileElements() {
        document.querySelectorAll('.skill-card-group').forEach(group => {
            if (group.querySelector('.skill-details-btn')) return;
            const card = group.querySelector('.skill-card');
            if (!card) return;

            const ui = skillUiStrings();
            const btn = document.createElement('button');
            btn.className = 'skill-details-btn';
            btn.type = 'button';
            btn.setAttribute('aria-label', ui.viewDetailsAria);
            btn.innerHTML = '<span>' + ui.detailsBtn + '</span><span class="material-icons-round">expand_more</span>';
            card.appendChild(btn);

            const dropdown = document.createElement('div');
            dropdown.className = 'skill-dropdown';
            group.appendChild(dropdown);
        });
    }

    function buildDropdownContent(data) {
        const ui = skillUiStrings();
        const desc = data ? data.description : ui.detailsSoon;
        const tags = (data && data.tags) ? data.tags : [];
        const tagsHtml = tags.map(t => `<span class="skill-dropdown-tag">${escapeHtml(t)}</span>`).join('');
        return `
            <div class="skill-dropdown-inner">
                ${tagsHtml ? `<div class="skill-dropdown-tags">${tagsHtml}</div>` : ''}
                <p class="skill-dropdown-desc">${escapeHtml(desc)}</p>
            </div>
        `;
    }

    function close() {
        if (!currentCard) return;
        currentCard.classList.remove('is-open');
        currentCard = null;
    }

    function open(card) {
        if (currentCard === card) { close(); return; }
        if (currentCard) close();

        const id = card.dataset.skillId;
        const data = typeof getSkillDetails === 'function' ? getSkillDetails(id) : (window.SKILL_DETAILS || {})[id];

        const dd = card.querySelector('.skill-dropdown');
        if (dd) {
            dd.innerHTML = buildDropdownContent(data);
        }

        currentCard = card;
        card.classList.add('is-open');
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.skills-tab-btn')) return;
        if (e.target.closest('.skill-dropdown')) return;

        const detailsBtn = e.target.closest('.skill-details-btn');
        if (detailsBtn) {
            const card = detailsBtn.closest('.skill-card-group');
            if (card) open(card);
            return;
        }

        /** Desktop + mobile: clique em qualquer ponto do .skill-card abre fecha o mesmo painel colado (toggle via open()). */
        const hitSkillInner = e.target.closest('#skills .skill-card');
        if (hitSkillInner) {
            const g = hitSkillInner.closest('.skill-card-group');
            if (g) open(g);
            return;
        }

        if (!e.target.closest('.skill-card-group')) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('.skills-tab-btn')) close();
    }, true);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectMobileElements();
            applySkillDetailsButtonLabels();
        });
    } else {
        injectMobileElements();
        applySkillDetailsButtonLabels();
    }

    window.refreshSkillDetailsUi = function() {
        document.querySelectorAll('.skill-dropdown').forEach(dd => { dd.innerHTML = ''; });
        applySkillDetailsButtonLabels();
        if (currentCard) {
            const id = currentCard.dataset.skillId;
            const data = typeof getSkillDetails === 'function' ? getSkillDetails(id) : null;
            const dd = currentCard.querySelector('.skill-dropdown');
            if (dd) dd.innerHTML = buildDropdownContent(data);
        }
    };

    window.openSkillPopover = open;
    window.closeSkillPopover = close;
})();

// Abas da seção de habilidades + animação das level bars
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = Array.from(document.querySelectorAll('.skills-tab-btn'));
    const skillCards = Array.from(document.querySelectorAll('.skill-card-group'));
    if (!tabButtons.length || !skillCards.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateLevelBars(target) {
        const visibleCards = skillCards.filter(c => c.dataset.tab === target);
        visibleCards.forEach((card, i) => {
            const fill = card.querySelector('.skill-level-fill');
            if (!fill) return;
            const level = Math.max(0, Math.min(100, parseInt(card.dataset.level || '0', 10)));
            fill.style.width = '0%';
            const delay = prefersReducedMotion ? 0 : 60 + (i * 30);
            setTimeout(() => { fill.style.width = level + '%'; }, delay);
        });
    }

    function staggerReveal(target) {
        if (prefersReducedMotion) return;
        const visibleCards = skillCards.filter(c => c.dataset.tab === target);
        visibleCards.forEach((card, i) => {
            card.classList.remove('skill-reveal');
            void card.offsetWidth;
            card.style.animationDelay = (i * 25) + 'ms';
            card.classList.add('skill-reveal');
        });
    }

    const sectionNameMap = {
        frontend: 'sectionFrontend',
        backend: 'sectionBackend',
        ai: 'sectionAi',
        support: 'sectionSupport'
    };

    function updateSectionName(target) {
        const el = document.querySelector('.skills-active-section-name');
        if (!el) return;
        const key = sectionNameMap[target] || 'sectionFrontend';
        el.setAttribute('data-i18n', 'skills.' + key);
        const lang = document.documentElement.lang === 'en' ? 'en' : 'pt';
        const t = (typeof translations !== 'undefined') ? translations[lang] : null;
        if (t && t.skills && t.skills[key]) {
            el.textContent = t.skills[key];
        }
    }

    function activateTab(target) {
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tabTarget === target;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        skillCards.forEach(card => {
            card.classList.toggle('hidden', card.dataset.tab !== target);
        });
        updateSectionName(target);
        staggerReveal(target);
        animateLevelBars(target);
    }

    if (tabButtons.length > 0) {
        activateTab(tabButtons[0].dataset.tabTarget);
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn.dataset.tabTarget));
    });

    // Re-trigger animations when skills section becomes active (SPA navigation)
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new MutationObserver(() => {
            if (skillsSection.classList.contains('active')) {
                const activeBtn = tabButtons.find(b => b.classList.contains('is-active')) || tabButtons[0];
                if (activeBtn) animateLevelBars(activeBtn.dataset.tabTarget);
            }
        });
        observer.observe(skillsSection, { attributes: true, attributeFilter: ['class'] });
    }
});

// Segurança: garantir rel="noopener noreferrer" em links que abrem em nova aba
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
        const rel = (a.getAttribute('rel') || '').split(' ').filter(Boolean);
        if (!rel.includes('noopener')) rel.push('noopener');
        if (!rel.includes('noreferrer')) rel.push('noreferrer');
        a.setAttribute('rel', rel.join(' '));
    });
});

// ============================================
// CARROSSEL DE IMAGENS DO PROJETO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const indicators = carousel.querySelectorAll('.indicator');
        
        let currentIndex = 0;
        
        function showImage(index) {
            // Remove active de todas as imagens e indicadores
            images.forEach(img => img.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            // Adiciona active na imagem e indicador atual
            images[index].classList.add('active');
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            
            currentIndex = index;
        }
        
        function nextImage() {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        }
        
        function prevImage() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(prevIndex);
        }
        
        // Event listeners para botões
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextImage();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevImage();
            });
        }
        
        // Event listeners para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(index);
            });
        });
        
        // Auto-play opcional (desabilitado por padrão)
        // Descomente as linhas abaixo se quiser auto-play
        // let autoPlayInterval = setInterval(nextImage, 5000);
        // 
        // carousel.addEventListener('mouseenter', () => {
        //     clearInterval(autoPlayInterval);
        // });
        // 
        // carousel.addEventListener('mouseleave', () => {
        //     autoPlayInterval = setInterval(nextImage, 5000);
        // });
    });
});

// ============================================
// MODAL DETALHES DO PROJETO — só ≥768px; no mobile usa Ver mais + scroll em #projects
// ============================================

function closeProjectDetailModal(immediate) {
    const modal = document.getElementById('project-detail-modal');
    if (!modal || !modal.classList.contains('is-open')) {
        return;
    }
    const dialog = modal.querySelector('.project-detail-modal__dialog');
    const reduced =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cleanup = () => {
        modal.classList.remove('is-open', 'is-visible');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('project-modal-open');
        const projects = document.getElementById('projects');
        if (projects && modal.parentElement !== projects) {
            projects.appendChild(modal);
        }
    };

    if (immediate || reduced) {
        cleanup();
        return;
    }

    modal.classList.remove('is-visible');

    if (!dialog) {
        cleanup();
        return;
    }

    let finished = false;
    const onEnd = (ev) => {
        if (ev.target !== dialog || ev.propertyName !== 'transform') {
            return;
        }
        dialog.removeEventListener('transitionend', onEnd);
        if (!finished) {
            finished = true;
            cleanup();
        }
    };
    dialog.addEventListener('transitionend', onEnd);
    window.setTimeout(() => {
        if (!finished) {
            finished = true;
            dialog.removeEventListener('transitionend', onEnd);
            cleanup();
        }
    }, 1400);
}

function openProjectDetailModal(card) {
    const modal = document.getElementById('project-detail-modal');
    if (!modal || !card) {
        return;
    }
    /* Mobile: detalhes no fluxo da página (Ver mais) — modal só no desktop */
    if (typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 767px)').matches) {
        return;
    }
    const media = card.querySelector('.project-card-media');
    if (media) {
        media.appendChild(modal);
    }
    const titleEl = document.getElementById('project-detail-modal-title');
    const bodyEl = modal.querySelector('.project-detail-modal__body');
    const footerTitle = card.querySelector('.project-card-footer__title');
    if (titleEl && footerTitle) {
        titleEl.innerHTML = '';
        titleEl.appendChild(footerTitle.cloneNode(true));
    } else if (titleEl) {
        titleEl.innerHTML = '';
    }
    if (bodyEl) {
        bodyEl.innerHTML = '';
        const src = card.querySelector('.project-content');
        if (src) {
            const clone = src.cloneNode(true);
            clone.querySelectorAll('.read-more-btn').forEach((b) => b.remove());
            clone.querySelectorAll('.project-description').forEach((p) => {
                p.classList.add('expanded');
                p.style.display = 'block';
                p.style.overflow = 'visible';
                p.style.maxHeight = 'none';
            });
            bodyEl.appendChild(clone);
        }
    }
    modal.classList.remove('is-visible');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('project-modal-open');
    void modal.offsetHeight;
    const reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        modal.classList.add('is-visible');
    } else {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                modal.classList.add('is-visible');
            });
        });
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') {
        return;
    }
    const modal = document.getElementById('project-detail-modal');
    if (modal && modal.classList.contains('is-open')) {
        e.preventDefault();
        closeProjectDetailModal();
    }
});

// ============================================
// CARROSSEL DE PROJETOS (rail + painel)
// ============================================

let currentProjectIndex = 0;
let isChangingProject = false; // Flag para evitar mudanças simultâneas

function getVisibleProjectIndices() {
    return Array.from(document.querySelectorAll('#projects .project-card:not(.project-archived)'))
        .map((card) => parseInt(card.getAttribute('data-project'), 10))
        .filter((n) => !Number.isNaN(n));
}

function isProjectArchived(index) {
    const card = document.querySelector(`#projects .project-card[data-project="${index}"]`);
    return !!(card && card.classList.contains('project-archived'));
}

function getTotalProjects() {
    const visible = getVisibleProjectIndices();
    return visible.length > 0 ? visible.length : 5;
}

// Função para mudar de projeto
window.changeProject = function(direction) {
    const visible = getVisibleProjectIndices();
    if (!visible.length) return;

    let pos = visible.indexOf(currentProjectIndex);
    if (pos < 0) pos = 0;

    let newPos = pos + direction;
    if (newPos < 0) {
        newPos = visible.length - 1;
    } else if (newPos >= visible.length) {
        newPos = 0;
    }

    goToProject(visible[newPos]);
};

// Função para ir diretamente a um projeto
window.goToProject = function(index) {
    if (isProjectArchived(index)) {
        return;
    }

    const visible = getVisibleProjectIndices();
    if (!visible.includes(index)) {
        return;
    }

    closeProjectDetailModal(true);

    // Evita mudanças simultâneas
    if (isChangingProject) {
        return;
    }
    
    // Se já está no projeto solicitado, não faz nada
    if (currentProjectIndex === index) {
        return;
    }
    
    isChangingProject = true;
    
    const allProjects = document.querySelectorAll('#projects .project-card');
    const railItems = document.querySelectorAll('.projects-rail-item');
    const targetProject = document.querySelector(`#projects .project-card[data-project="${index}"]`);
    
    if (!targetProject) {
        console.error(`Projeto ${index} não encontrado!`);
        isChangingProject = false;
        return;
    }
    
    currentProjectIndex = index;
    
    allProjects.forEach((p) => {
        const content = p.querySelector('.project-content');
        if (content) content.classList.remove('is-details-expanded');

        const desc = p.querySelector('.project-description');
        if (desc) desc.classList.remove('expanded');

        const rmBtn = p.querySelector('.read-more-btn');
        if (rmBtn) {
            rmBtn.classList.remove('expanded');
            rmBtn.setAttribute('aria-expanded', 'false');
            const rt = rmBtn.querySelector('.read-more-text');
            const rl = rmBtn.querySelector('.read-less-text');
            if (rt) rt.style.display = 'inline';
            if (rl) rl.style.display = 'none';
        }

        p.classList.remove('active');
        p.style.transition = 'none';
        p.style.setProperty('display', 'none', 'important');
        p.style.setProperty('opacity', '0', 'important');
    });
    
    railItems.forEach((btn) => {
        if (btn.classList.contains('project-archived')) {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-selected', 'false');
            return;
        }
        const btnIndex = parseInt(btn.getAttribute('data-project-index'), 10);
        const on = btnIndex === index;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    const activeRailBtn = document.querySelector('#projects .projects-rail-item.is-active');
    if (
        activeRailBtn &&
        typeof activeRailBtn.scrollIntoView === 'function' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(max-width: 767px)').matches
    ) {
        const railScrollSmooth =
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        activeRailBtn.scrollIntoView({
            block: 'nearest',
            behavior: railScrollSmooth ? 'smooth' : 'auto',
            inline: 'nearest',
        });
    }
    
    // Adiciona active ao projeto selecionado
    targetProject.classList.add('active');
    
    // Força display com !important (evita card “invisível” por cascata / estilos inline fracos)
    targetProject.style.transition = 'none';
    targetProject.style.setProperty('display', 'flex', 'important');
    targetProject.style.setProperty('opacity', '1', 'important');
    targetProject.style.setProperty('transform', 'translateX(0)', 'important');
    
    // Força reflow
    void targetProject.offsetHeight;
    
    // Restaura transição após um frame
    requestAnimationFrame(() => {
        targetProject.style.transition = '';
        allProjects.forEach((p) => {
            if (p !== targetProject) {
                p.style.transition = '';
            }
        });
    });
    
    resetImageCarousel(targetProject);
    
    // Reinicializar swipe para o novo projeto
    setTimeout(() => {
        initSwipeForCarousels();
        initProjectCardDrag();
        isChangingProject = false; // Libera a flag após tudo estar pronto
    }, 100);
};

// Função para mudar imagem dentro de um projeto
window.changeImage = function(button, direction) {
    if (!button) {
        return;
    }
    
    const imageContainer = button.closest('.project-image-container');
    if (!imageContainer) {
        return;
    }
    
    const imageCarousel = imageContainer.querySelector('.project-image-carousel');
    if (!imageCarousel) {
        return;
    }
    
    const slides = Array.from(imageCarousel.querySelectorAll('.carousel-slide'));
    const indicators = Array.from(imageContainer.querySelectorAll('.carousel-indicators .indicator'));
    
    if (!slides.length || slides.length <= 1) {
        return;
    }
    
    // Encontra o slide ativo ANTES de remover qualquer classe
    let currentIndex = 0;
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
            currentIndex = i;
            break;
    }
    }
    
    // Remove active de todos os slides e indicadores
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Calcula novo índice
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
        newIndex = 0;
    }
    
    // Adiciona active ao novo slide e indicador
    if (slides[newIndex]) {
        slides[newIndex].classList.add('active');
    }
    if (indicators[newIndex]) {
        indicators[newIndex].classList.add('active');
    }
};

// Função para ir diretamente a uma imagem
window.goToImage = function(indicator, index) {
    const imageContainer = indicator.closest('.project-image-container');
    if (!imageContainer) return;
    
    const imageCarousel = imageContainer.querySelector('.project-image-carousel');
    if (!imageCarousel) return;
    
    const slides = Array.from(imageCarousel.querySelectorAll('.carousel-slide'));
    const indicators = Array.from(imageContainer.querySelectorAll('.carousel-indicators .indicator'));
    
    if (index < 0 || index >= slides.length) return;
    
    // Remove active de todos
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    
    // Adiciona active ao slide selecionado
    if (slides[index]) {
    slides[index].classList.add('active');
    }
    if (indicators[index]) {
    indicators[index].classList.add('active');
    }
};

// Função para resetar o carrossel de imagens
function resetImageCarousel(projectCard) {
    const imageCarousel = projectCard.querySelector('.project-image-carousel');
    if (!imageCarousel) return;
    
    const slides = imageCarousel.querySelectorAll('.carousel-slide');
    const indicators = projectCard.querySelectorAll('.carousel-indicators .indicator');
    
    slides.forEach((s) => {
        s.classList.remove('active');
        s.style.transition = '';
        s.style.transform = '';
        s.style.opacity = '';
        s.style.display = '';
        s.style.visibility = '';
    });
    indicators.forEach(i => i.classList.remove('active'));
    
    // Ativa o primeiro slide
    if (slides[0]) {
        slides[0].classList.add('active');
    }
    if (indicators[0]) {
        indicators[0].classList.add('active');
    }
}

// Inicializa o primeiro projeto ao carregar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        currentProjectIndex = 0;
        const allProjects = document.querySelectorAll('#projects .project-card');
        allProjects.forEach(p => {
            p.classList.remove('active');
            p.style.display = '';
            p.style.opacity = '';
            p.style.transition = '';
            p.style.transform = '';
        });
        
        const firstProject = document.querySelector('#projects .project-card[data-project="0"]');
        if (firstProject) {
            firstProject.classList.add('active');
            firstProject.style.setProperty('display', 'flex', 'important');
            firstProject.style.setProperty('opacity', '1', 'important');
            firstProject.style.setProperty('transform', 'translateX(0)', 'important');
            resetImageCarousel(firstProject);
        }
        
        document.querySelectorAll('.projects-rail-item:not(.project-archived)').forEach((btn) => {
            const idx = parseInt(btn.getAttribute('data-project-index'), 10);
            const on = idx === 0;
            btn.classList.toggle('is-active', on);
            btn.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        
        // Esconde botões de navegação de imagens se houver apenas 1 imagem
        document.querySelectorAll('.project-image-carousel').forEach(carousel => {
            const imageCount = parseInt(carousel.getAttribute('data-images'));
            const container = carousel.closest('.project-image-container');
            
            if (imageCount === 1 && container) {
                const prevBtn = container.querySelector('.carousel-prev');
                const nextBtn = container.querySelector('.carousel-next');
                const indicators = container.querySelector('.carousel-indicators');
                
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
                if (indicators) indicators.style.display = 'none';
            }
        });
        
        document.querySelectorAll('.projects-rail-item:not(.project-archived)').forEach((btn) => {
            const idx = parseInt(btn.getAttribute('data-project-index'), 10);
            if (Number.isNaN(idx)) return;
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                goToProject(idx);
            });
        });

        const projectsRoot = document.getElementById('projects');
        if (projectsRoot) {
            projectsRoot.addEventListener('click', function(e) {
                const openBtn = e.target.closest('.project-open-modal-btn');
                if (!openBtn) return;
                if (typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 767px)').matches) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                const card = openBtn.closest('.project-card');
                if (card) openProjectDetailModal(card);
            });
        }

        const projectDetailModal = document.getElementById('project-detail-modal');
        if (projectDetailModal) {
            projectDetailModal.addEventListener('click', function(e) {
                if (e.target.closest('[data-project-modal-close]')) {
                    closeProjectDetailModal();
                }
            });
        }
        
        // Adiciona listeners aos indicadores de imagens
        const imageIndicators = document.querySelectorAll('.carousel-indicators .indicator');
        imageIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToImage(indicator, index);
            });
        });
        
        // Adicionar funcionalidade de swipe/touch para mobile
        setTimeout(() => {
            initSwipeForCarousels();
        }, 200);
    }, 100);
});

// ============================================
// FUNCIONALIDADE DE ARRASTO (DRAG) PARA CARROSSEL DE IMAGENS
// ============================================

function initSwipeForCarousels() {
    const imageContainers = document.querySelectorAll('.project-image-container');
    
    if (imageContainers.length === 0) {
        return;
    }
    
    imageContainers.forEach((container) => {
        // Verificar se já tem listeners (evitar duplicação)
        if (container.dataset.swipeInitialized === 'true') {
            return;
        }
        
        const imageCarousel = container.querySelector('.project-image-carousel');
        if (!imageCarousel) return;
        
        const slides = Array.from(imageCarousel.querySelectorAll('.carousel-slide'));
        if (slides.length <= 1) return;

        const isProjectsMobileFlow = () =>
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(max-width: 767px)').matches &&
            !!container.closest('#projects');
        
        let touchStartX = 0;
        let touchStartY = 0;
        let currentX = 0;
        let isDragging = false;
        let currentIndex = 0;
        let startIndex = 0;
        
        const getContainerWidth = () => container.offsetWidth || container.clientWidth;
        const getThreshold = () => getContainerWidth() * 0.3; // 30% da largura para mudar de slide
        
        // Encontrar índice inicial
        const findCurrentIndex = () => {
            for (let i = 0; i < slides.length; i++) {
                if (slides[i].classList.contains('active')) {
                    return i;
                }
            }
            return 0;
        };
        
        const updateIndicators = (index) => {
            const indicators = Array.from(container.querySelectorAll('.carousel-indicators .indicator'));
            indicators.forEach(i => i.classList.remove('active'));
            if (indicators[index]) indicators[index].classList.add('active');
        };
        
        const goToSlide = (index, animate = true) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentIndex = index;

            if (isProjectsMobileFlow()) {
                slides.forEach((s, i) => {
                    s.classList.toggle('active', i === index);
                    s.style.transition = '';
                    s.style.transform = '';
                    s.style.opacity = '';
                    s.style.display = '';
                    s.style.visibility = '';
                });
                updateIndicators(index);
                return;
            }
            
            // Remover active de todos e resetar estilos
            slides.forEach(s => {
                s.classList.remove('active');
                if (animate) {
                    s.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
                } else {
                    s.style.transition = 'none';
                }
                const slideIndex = parseInt(s.dataset.index);
                const offset = slideIndex - currentIndex;
                s.style.transform = `translateX(${offset * 100}%)`;
                s.style.opacity = offset === 0 ? 1 : 0;
            });
            
            // Adicionar active ao slide atual
            if (slides[currentIndex]) {
                slides[currentIndex].classList.add('active');
                slides[currentIndex].style.transform = 'translateX(0%)';
                slides[currentIndex].style.opacity = 1;
                slides[currentIndex].style.display = 'flex';
                slides[currentIndex].style.visibility = 'visible';
            }
            
            updateIndicators(currentIndex);
            
            // Resetar transformações após animação
            if (animate) {
                setTimeout(() => {
                    slides.forEach(s => {
                        if (!s.classList.contains('active')) {
                            s.style.transition = '';
                            s.style.transform = '';
                            s.style.opacity = '';
                            s.style.display = '';
                            s.style.visibility = '';
                        }
                    });
                }, 300);
            }
        };
        
        // Inicializar índices dos slides
        slides.forEach((slide, index) => {
            slide.dataset.index = index;
        });
        
        currentIndex = findCurrentIndex();
        startIndex = currentIndex;
        
        const handleTouchStart = (e) => {
            const touch = e.touches ? e.touches[0] : e.changedTouches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            isDragging = false;
            currentIndex = findCurrentIndex();
            startIndex = currentIndex;
            
            // Remover transições durante o arrasto
            slides.forEach(s => {
                s.style.transition = 'none';
            });
        };
        
        const handleTouchMove = (e) => {
            if (!touchStartX) return;

            if (isProjectsMobileFlow()) {
                const touch = e.touches ? e.touches[0] : e.changedTouches[0];
                currentX = touch.clientX;
                const deltaX = currentX - touchStartX;
                const deltaY = Math.abs(touch.clientY - touchStartY);
                if (Math.abs(deltaX) > 5 && Math.abs(deltaX) > deltaY * 1.5) {
                    if (!isDragging) {
                        isDragging = true;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }
                return;
            }
            
            const touch = e.touches ? e.touches[0] : e.changedTouches[0];
            currentX = touch.clientX;
            const deltaX = currentX - touchStartX;
            const deltaY = Math.abs(touch.clientY - touchStartY);
            
            // Se o movimento horizontal for maior que o vertical, é um arrasto horizontal
            if (Math.abs(deltaX) > 5 && Math.abs(deltaX) > deltaY * 1.5) {
                if (!isDragging) {
                    isDragging = true;
                }
                
                // Prevenir scroll da página durante o arrasto horizontal
                e.preventDefault();
                e.stopPropagation();
                
                // Calcular offset baseado no índice atual
                const containerWidth = getContainerWidth();
                const offset = deltaX / containerWidth;
                
                // Mover todos os slides
                slides.forEach((slide) => {
                    const slideIndex = parseInt(slide.dataset.index);
                    const baseOffset = slideIndex - currentIndex;
                    const totalOffset = baseOffset + offset;
                    slide.style.transform = `translateX(${totalOffset * 100}%)`;
                    slide.style.opacity = Math.max(0.3, 1 - Math.abs(totalOffset) * 0.5);
                    // Mostrar o slide durante o arrasto
                    if (Math.abs(totalOffset) < 1.5) {
                        slide.style.display = 'flex';
                        slide.style.visibility = 'visible';
                    }
                });
            }
        };
        
        const handleTouchEnd = (e) => {
            if (!touchStartX || !isDragging) {
                touchStartX = 0;
                isDragging = false;
                return;
            }
            
            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;
            const absDeltaX = Math.abs(deltaX);
            const threshold = getThreshold();
            
            // Determinar se deve mudar de slide
            if (absDeltaX > threshold) {
                // Mudar de slide
                if (deltaX > 0) {
                    // Arrastou para a direita - slide anterior
                    goToSlide(currentIndex - 1);
                } else {
                    // Arrastou para a esquerda - próximo slide
                    goToSlide(currentIndex + 1);
                }
            } else {
                // Voltar para o slide atual
                goToSlide(currentIndex);
            }
            
            isDragging = false;
            touchStartX = 0;
        };
        
        // Adicionar listeners
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        imageCarousel.addEventListener('touchstart', handleTouchStart, { passive: false });
        imageCarousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        imageCarousel.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Marcar como inicializado
        container.dataset.swipeInitialized = 'true';
    });
}

// Inicializar swipe quando a página carregar e quando projetos mudarem
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initSwipeForCarousels();
        initProjectCardDrag();
    }, 800);
});

// Também inicializar quando a seção de projetos for ativada
document.addEventListener('DOMContentLoaded', () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        initProjectCardDrag();
                    }, 300);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(projectsSection);
    }
});

// ============================================
// HINT: arrastar para trocar projeto (mobile)
// ============================================
(function initProjectsSwipeHint() {
    const STORAGE_KEY = 'portfolio_projects_swipe_hint_v5';
    let hintEl = null;
    let autoHideTimer = null;
    let showDelayTimer = null;
    let dismissListenersActive = false;

    function isMobileProjects() {
        return typeof window.matchMedia === 'function' &&
            window.matchMedia('(max-width: 767px)').matches;
    }

    function isProjectsSectionVisible() {
        const section = document.getElementById('projects');
        return section && section.classList.contains('active');
    }

    function isDismissed() {
        try {
            return localStorage.getItem(STORAGE_KEY) === '1';
        } catch (_) {
            return false;
        }
    }

    function getHintLabel() {
        const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'pt';
        const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : null;
        return (t && t.projects && t.projects.swipeHint) ? t.projects.swipeHint : 'Arraste para o lado para ver o próximo projeto';
    }

    function dismissAll(persist) {
        if (persist !== false) {
            try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) { /* ignore */ }
        }
        dismissOverlay(persist);
    }

    function dismissOverlay() {
        if (!hintEl || hintEl.classList.contains('is-hidden')) return;
        hintEl.classList.add('is-hidden');
        if (autoHideTimer) {
            clearTimeout(autoHideTimer);
            autoHideTimer = null;
        }
        setTimeout(() => {
            if (hintEl && hintEl.parentNode) hintEl.parentNode.removeChild(hintEl);
            hintEl = null;
        }, 450);
    }

    function ensureHint() {
        if (!isMobileProjects() || !isProjectsSectionVisible() || isDismissed()) {
            removeExistingHint();
            return;
        }

        const mount = document.querySelector('#projects .project-card.active > .project-content');
        if (!mount) return;

        if (hintEl && hintEl.parentElement === mount && hintEl.classList.contains('is-visible')) {
            return;
        }

        removeExistingHint();

        hintEl = document.createElement('div');
        hintEl.className = 'projects-swipe-hint';
        hintEl.setAttribute('role', 'status');
        const inner = document.createElement('div');
        inner.className = 'projects-swipe-hint__inner';
        const icon = document.createElement('span');
        icon.className = 'material-icons-round projects-swipe-hint__icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'back_hand';
        const label = document.createElement('span');
        label.className = 'projects-swipe-hint__label';
        label.textContent = getHintLabel();
        const chevronL = document.createElement('span');
        chevronL.className = 'material-icons-round projects-swipe-hint__chevron';
        chevronL.setAttribute('aria-hidden', 'true');
        chevronL.textContent = 'chevron_left';

        const chevronR = document.createElement('span');
        chevronR.className = 'material-icons-round projects-swipe-hint__chevron';
        chevronR.setAttribute('aria-hidden', 'true');
        chevronR.textContent = 'chevron_right';

        inner.appendChild(chevronL);
        inner.appendChild(icon);
        inner.appendChild(chevronR);
        hintEl.appendChild(inner);
        hintEl.appendChild(label);

        mount.insertBefore(hintEl, mount.firstChild);
        requestAnimationFrame(() => {
            if (hintEl) hintEl.classList.add('is-visible');
        });

        autoHideTimer = setTimeout(() => dismissOverlay(), 5500);
    }

    function removeExistingHint() {
        if (autoHideTimer) {
            clearTimeout(autoHideTimer);
            autoHideTimer = null;
        }
        document.querySelectorAll('#projects .projects-swipe-hint').forEach(el => el.remove());
        hintEl = null;
    }

    function onUserDismissInteraction() {
        if (!dismissListenersActive) return;
        dismissAll(true);
    }

    function bindDismiss() {
        const section = document.getElementById('projects');
        if (!section || section.dataset.swipeHintBound === '1') return;
        section.dataset.swipeHintBound = '1';

        section.querySelectorAll('.projects-rail-item').forEach(btn => {
            btn.addEventListener('click', onUserDismissInteraction);
        });

        const origGoTo = window.goToProject;
        if (typeof origGoTo === 'function' && !origGoTo._swipeHintWrapped) {
            const wrapped = function(index) {
                const result = origGoTo.apply(this, arguments);
                if (!window._suppressSwipeHintDismiss) {
                    onUserDismissInteraction();
                } else if (typeof window.scheduleProjectsSwipeHint === 'function') {
                    window.scheduleProjectsSwipeHint();
                }
                return result;
            };
            wrapped._swipeHintWrapped = true;
            window.goToProject = wrapped;
        }

        const origChange = window.changeProject;
        if (typeof origChange === 'function' && !origChange._swipeHintWrapped) {
            const wrappedChange = function(dir) {
                if (!window._suppressSwipeHintDismiss) {
                    onUserDismissInteraction();
                }
                return origChange.apply(this, arguments);
            };
            wrappedChange._swipeHintWrapped = true;
            window.changeProject = wrappedChange;
        }
    }

    function refresh() {
        if (showDelayTimer) {
            clearTimeout(showDelayTimer);
            showDelayTimer = null;
        }
        dismissListenersActive = false;
        if (!isMobileProjects() || !isProjectsSectionVisible()) {
            removeExistingHint();
            return;
        }
        if (isDismissed()) {
            removeExistingHint();
            return;
        }
        ensureHint();
        setTimeout(() => {
            dismissListenersActive = true;
        }, 1500);
    }

    function scheduleShow() {
        if (showDelayTimer) clearTimeout(showDelayTimer);
        showDelayTimer = setTimeout(() => {
            showDelayTimer = null;
            refresh();
        }, 1000);
    }

    window.refreshProjectsSwipeHint = refresh;
    window.scheduleProjectsSwipeHint = scheduleShow;
    window.resetProjectsSwipeHint = function() {
        try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* ignore */ }
        refresh();
    };

    document.addEventListener('DOMContentLoaded', () => {
        bindDismiss();
        initProjectsRailScrollHint();
        const section = document.getElementById('projects');
        if (!section) return;

        const observer = new MutationObserver(() => {
            if (section.classList.contains('active')) {
                scheduleShow();
            } else {
                removeExistingHint();
            }
        });
        observer.observe(section, { attributes: true, attributeFilter: ['class'] });

        window.addEventListener('resize', () => {
            if (!isMobileProjects()) removeExistingHint();
            else if (isProjectsSectionVisible()) scheduleShow();
        });

        if (section.classList.contains('active')) {
            scheduleShow();
        }
    });
})();

// ============================================
// SETA NO RAIL DE PROJETOS (mobile — indica scroll horizontal)
// ============================================

function initProjectsRailScrollHint() {
    const rail = document.querySelector('#projects .projects-rail');
    const hint = document.querySelector('#projects .projects-rail-scroll-hint');
    if (!rail || !hint) return;

    function updateRailScrollHint() {
        if (window.innerWidth > 767) {
            hint.classList.add('is-hidden');
            return;
        }
        const canScroll = rail.scrollWidth > rail.clientWidth + 4;
        const atStart = rail.scrollLeft < 16;
        hint.classList.toggle('is-hidden', !canScroll || !atStart);
    }

    rail.addEventListener('scroll', updateRailScrollHint, { passive: true });
    window.addEventListener('resize', updateRailScrollHint);
    rail.querySelectorAll('img').forEach((img) => {
        if (!img.complete) img.addEventListener('load', updateRailScrollHint, { once: true });
    });
    const section = document.getElementById('projects');
    if (section) {
        const obs = new MutationObserver(updateRailScrollHint);
        obs.observe(section, { attributes: true, attributeFilter: ['class'] });
    }
    updateRailScrollHint();
}

// ============================================
// ARRASTO DO CARD COMPLETO PARA TROCAR PROJETOS
// ============================================

// Variáveis globais para o arrasto do card
let cardDragHandlers = {
    touchStartX: 0,
    touchStartY: 0,
    isDragging: false,
    currentCard: null
};

function initProjectCardDrag() {
    // Função para adicionar listeners ao card ativo
    const setupCardDrag = () => {
        const activeCard = document.querySelector('.project-card.active');
        if (!activeCard) return;
        
        // Remover listeners anteriores do card se existirem
        if (activeCard.dataset.dragSetup === 'true') {
            // Remover listeners antigos antes de adicionar novos
            const oldHandlers = activeCard._dragHandlers;
            if (oldHandlers) {
                activeCard.removeEventListener('touchstart', oldHandlers.start, { passive: false, capture: true });
                activeCard.removeEventListener('touchmove', oldHandlers.move, { passive: false, capture: true });
                activeCard.removeEventListener('touchend', oldHandlers.end, { passive: true, capture: true });
                activeCard.removeEventListener('mousedown', oldHandlers.mouseDown, { passive: false });
                document.removeEventListener('mousemove', oldHandlers.mouseMove, { passive: false });
                document.removeEventListener('mouseup', oldHandlers.mouseUp, { passive: true });
            }
        }
        
        const getCardWidth = () => activeCard.offsetWidth || activeCard.clientWidth;
        const getThreshold = () => getCardWidth() * 0.25;
        
        const handleTouchStart = (e) => {
            // Verificar se o toque começou em um botão ou link (não arrastar nesses casos)
            const target = e.target;
            if (target.closest('button') || target.closest('a') || target.closest('.carousel-btn') || target.closest('.carousel-indicators') || target.closest('.project-card-footer')) {
                return;
            }
            
            // Verificar se o toque começou na área da imagem
            const imageContainer = activeCard.querySelector('.project-image-container');
            const touch = e.touches ? e.touches[0] : e.changedTouches[0];
            
            if (imageContainer) {
                const rect = imageContainer.getBoundingClientRect();
                const isInImageArea = touch.clientX >= rect.left && 
                                     touch.clientX <= rect.right && 
                                     touch.clientY >= rect.top && 
                                     touch.clientY <= rect.bottom;
                
                // Se o toque começou na área da imagem, não iniciar arrasto do card
                if (isInImageArea) {
                    return;
                }
            }
            
            cardDragHandlers.currentCard = activeCard;
            cardDragHandlers.touchStartX = touch.clientX;
            cardDragHandlers.touchStartY = touch.clientY;
            cardDragHandlers.isDragging = false;
            
            // Remover transições durante o arrasto
            activeCard.style.transition = 'none';
        };
        
        // Handlers para mouse (desktop)
        const handleMouseDown = (e) => {
            // Verificar se o clique começou em um botão ou link
            const target = e.target;
            if (target.closest('button') || target.closest('a') || target.closest('.carousel-btn') || target.closest('.carousel-indicators') || target.closest('.project-card-footer')) {
                return;
            }
            
            // Verificar se o clique começou na área da imagem
            const imageContainer = activeCard.querySelector('.project-image-container');
            
            if (imageContainer) {
                const rect = imageContainer.getBoundingClientRect();
                const isInImageArea = e.clientX >= rect.left && 
                                     e.clientX <= rect.right && 
                                     e.clientY >= rect.top && 
                                     e.clientY <= rect.bottom;
                
                if (isInImageArea) {
                    return;
                }
            }
            
            cardDragHandlers.currentCard = activeCard;
            cardDragHandlers.touchStartX = e.clientX;
            cardDragHandlers.touchStartY = e.clientY;
            cardDragHandlers.isDragging = false;
            
            activeCard.style.transition = 'none';
            activeCard.style.cursor = 'grabbing';
        };
        
        const handleMouseMove = (e) => {
            if (!cardDragHandlers.currentCard || !cardDragHandlers.touchStartX || cardDragHandlers.currentCard !== activeCard) return;
            
            const currentX = e.clientX;
            const currentY = e.clientY;
            const deltaX = currentX - cardDragHandlers.touchStartX;
            const deltaY = Math.abs(currentY - cardDragHandlers.touchStartY);
            
            if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY * 1.2) {
                if (!cardDragHandlers.isDragging) {
                    cardDragHandlers.isDragging = true;
                }
                
                e.preventDefault();
                
                const offset = deltaX;
                activeCard.style.transform = `translateX(${offset}px)`;
                activeCard.style.opacity = Math.max(0.4, 1 - Math.abs(offset) / getCardWidth() * 0.6);
            }
        };
        
        const handleMouseUp = (e) => {
            if (!cardDragHandlers.currentCard || !cardDragHandlers.touchStartX || cardDragHandlers.currentCard !== activeCard) {
                cardDragHandlers.touchStartX = 0;
                cardDragHandlers.isDragging = false;
                cardDragHandlers.currentCard = null;
                activeCard.style.cursor = 'grab';
                return;
            }
            
            if (!cardDragHandlers.isDragging) {
                cardDragHandlers.touchStartX = 0;
                cardDragHandlers.currentCard = null;
                activeCard.style.cursor = 'grab';
                return;
            }
            
            const touchEndX = e.clientX;
            const deltaX = touchEndX - cardDragHandlers.touchStartX;
            const absDeltaX = Math.abs(deltaX);
            const threshold = getThreshold();
            
            activeCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            activeCard.style.cursor = 'grab';
            
            if (absDeltaX > threshold) {
                if (deltaX > 0) {
                    changeProject(-1);
                } else {
                    changeProject(1);
                }
            } else {
                activeCard.style.transform = '';
                activeCard.style.opacity = '';
            }
            
            cardDragHandlers.isDragging = false;
            cardDragHandlers.touchStartX = 0;
            
            setTimeout(() => {
                if (activeCard && activeCard.classList.contains('active')) {
                    activeCard.style.transition = '';
                }
                cardDragHandlers.currentCard = null;
            }, 300);
        };
        
        const handleTouchMove = (e) => {
            if (!cardDragHandlers.currentCard || !cardDragHandlers.touchStartX || cardDragHandlers.currentCard !== activeCard) return;
            
            const touch = e.touches ? e.touches[0] : e.changedTouches[0];
            if (!touch) return;
            
            const currentX = touch.clientX;
            const currentY = touch.clientY;
            const deltaX = currentX - cardDragHandlers.touchStartX;
            const deltaY = Math.abs(currentY - cardDragHandlers.touchStartY);
            
            // Se o movimento horizontal for maior que o vertical, é um arrasto horizontal
            if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY * 1.2) {
                if (!cardDragHandlers.isDragging) {
                    cardDragHandlers.isDragging = true;
                }
                
                // Prevenir scroll da página durante o arrasto horizontal
                e.preventDefault();
                e.stopPropagation();
                
                // Mover o card
                const offset = deltaX;
                activeCard.style.transform = `translateX(${offset}px)`;
                activeCard.style.opacity = Math.max(0.4, 1 - Math.abs(offset) / getCardWidth() * 0.6);
            }
        };
        
        const handleTouchEnd = (e) => {
            if (!cardDragHandlers.currentCard || !cardDragHandlers.touchStartX || cardDragHandlers.currentCard !== activeCard) {
                cardDragHandlers.touchStartX = 0;
                cardDragHandlers.isDragging = false;
                cardDragHandlers.currentCard = null;
                return;
            }
            
            if (!cardDragHandlers.isDragging) {
                cardDragHandlers.touchStartX = 0;
                cardDragHandlers.currentCard = null;
                return;
            }
            
            const touch = e.changedTouches[0];
            if (!touch) return;
            
            const touchEndX = touch.clientX;
            const deltaX = touchEndX - cardDragHandlers.touchStartX;
            const absDeltaX = Math.abs(deltaX);
            const threshold = getThreshold();
            
            // Restaurar transição
            activeCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Determinar se deve mudar de projeto
            if (absDeltaX > threshold) {
                if (deltaX > 0) {
                    // Arrastou para a direita - projeto anterior
                    changeProject(-1);
                } else {
                    // Arrastou para a esquerda - próximo projeto
                    changeProject(1);
                }
            } else {
                // Voltar para a posição original
                activeCard.style.transform = '';
                activeCard.style.opacity = '';
            }
            
            cardDragHandlers.isDragging = false;
            cardDragHandlers.touchStartX = 0;
            
            // Resetar transição após animação
            setTimeout(() => {
                if (activeCard && activeCard.classList.contains('active')) {
                    activeCard.style.transition = '';
                }
                cardDragHandlers.currentCard = null;
            }, 300);
        };
        
        // Adicionar listeners diretamente no card ativo usando capture
        activeCard.addEventListener('touchstart', handleTouchStart, { passive: false, capture: true });
        activeCard.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
        activeCard.addEventListener('touchend', handleTouchEnd, { passive: true, capture: true });
        
        // Adicionar listeners para mouse (desktop)
        activeCard.addEventListener('mousedown', handleMouseDown, { passive: false });
        document.addEventListener('mousemove', handleMouseMove, { passive: false });
        document.addEventListener('mouseup', handleMouseUp, { passive: true });
        
        // Salvar referências para poder remover depois
        activeCard._dragHandlers = {
            start: handleTouchStart,
            move: handleTouchMove,
            end: handleTouchEnd,
            mouseDown: handleMouseDown,
            mouseMove: handleMouseMove,
            mouseUp: handleMouseUp
        };
        
        activeCard.dataset.dragSetup = 'true';
    };
    
    // Configurar o card ativo inicial
    setupCardDrag();
    
        // Observar mudanças no card ativo
        const projectsCarouselWrapper = document.querySelector('.projects-carousel');
        if (projectsCarouselWrapper) {
            // Remover observer anterior se existir
            if (projectsCarouselWrapper._dragObserver) {
                projectsCarouselWrapper._dragObserver.disconnect();
            }
            
            const observer = new MutationObserver(() => {
                // Pequeno delay para garantir que a classe active foi aplicada
                setTimeout(() => {
                    // Remover setup de todos os cards
                    document.querySelectorAll('.project-card').forEach(card => {
                        if (card.dataset.dragSetup === 'true') {
                            const oldHandlers = card._dragHandlers;
                            if (oldHandlers) {
                                card.removeEventListener('touchstart', oldHandlers.start, { passive: false, capture: true });
                                card.removeEventListener('touchmove', oldHandlers.move, { passive: false, capture: true });
                                card.removeEventListener('touchend', oldHandlers.end, { passive: true, capture: true });
                                card.removeEventListener('mousedown', oldHandlers.mouseDown, { passive: false });
                                if (oldHandlers.mouseMove) {
                                    document.removeEventListener('mousemove', oldHandlers.mouseMove, { passive: false });
                                }
                                if (oldHandlers.mouseUp) {
                                    document.removeEventListener('mouseup', oldHandlers.mouseUp, { passive: true });
                                }
                            }
                            card.dataset.dragSetup = 'false';
                        }
                    });
                    // Configurar o novo card ativo
                    setupCardDrag();
                }, 50);
            });
            
            observer.observe(projectsCarouselWrapper, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
            
            projectsCarouselWrapper._dragObserver = observer;
        }
}

// ============================================
// VER MAIS / VER MENOS — EXPERIÊNCIA (SOBRE)
// ============================================

window.toggleAboutExperienceDesc = function(button) {
    const wrap = button.closest('.about-exp-desc-wrap');
    if (!wrap) return;
    const desc = wrap.querySelector('.about-exp-desc');
    const readMore = button.querySelector('.read-more-text');
    const readLess = button.querySelector('.read-less-text');
    if (!desc) return;

    const expanded = !desc.classList.contains('is-expanded');
    desc.classList.toggle('is-expanded', expanded);
    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    if (readMore) readMore.style.display = expanded ? 'none' : 'inline';
    if (readLess) readLess.style.display = expanded ? 'inline' : 'none';
    button.hidden = false;
};

function refreshAboutExperienceToggles() {
    document.querySelectorAll('#about .about-exp-desc-wrap').forEach((wrap) => {
        const desc = wrap.querySelector('.about-exp-desc');
        const button = wrap.querySelector('.about-exp-toggle');
        if (!desc || !button) return;

        const expanded = desc.classList.contains('is-expanded');
        if (!expanded) {
            button.hidden = desc.scrollHeight <= desc.clientHeight + 1;
        } else {
            button.hidden = false;
        }

        const readMore = button.querySelector('.read-more-text');
        const readLess = button.querySelector('.read-less-text');
        if (readMore) readMore.style.display = expanded ? 'none' : 'inline';
        if (readLess) readLess.style.display = expanded ? 'inline' : 'none';
        button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    refreshAboutExperienceToggles();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(refreshAboutExperienceToggles, 150);
    });
});

// ============================================
// BOTÃO VER MAIS / VER MENOS NA DESCRIÇÃO
// ============================================

window.toggleDescription = function(button) {
    const wrapper = button.closest('.project-description-wrapper');
    const description = wrapper.querySelector('.project-description');
    const readMoreText = button.querySelector('.read-more-text');
    const readLessText = button.querySelector('.read-less-text');
    const rootContent = wrapper.closest('.project-content');

    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        readMoreText.style.display = 'inline';
        readLessText.style.display = 'none';
        button.classList.remove('expanded');
        button.setAttribute('aria-expanded', 'false');
        if (rootContent) {
            rootContent.classList.remove('is-details-expanded');
        }
    } else {
        description.classList.add('expanded');
        readMoreText.style.display = 'none';
        readLessText.style.display = 'inline';
        button.classList.add('expanded');
        button.setAttribute('aria-expanded', 'true');
        if (rootContent) {
            rootContent.classList.add('is-details-expanded');
        }

        /* Mobile projetos: scroll suave até o bloco expandido (stack + CTAs) */
        const scrollProjectsExpanded = () => {
            const projectsEl = document.getElementById('projects');
            if (!projectsEl || !button.closest('#projects') || !rootContent) {
                return;
            }

            requestAnimationFrame(() => {
                const rr = rootContent.getBoundingClientRect();
                const vr = projectsEl.getBoundingClientRect();
                let delta = 0;
                if (rr.bottom > vr.bottom - 56) {
                    delta = rr.bottom - vr.bottom + 36;
                } else if (rr.top < vr.top + 12) {
                    delta = rr.top - vr.top - 12;
                }
                if (!delta) {
                    return;
                }

                const nextTop = Math.min(
                    projectsEl.scrollHeight - projectsEl.clientHeight,
                    Math.max(0, projectsEl.scrollTop + delta)
                );

                const reduceMotion =
                    typeof window.matchMedia !== 'undefined' &&
                    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                if (reduceMotion) {
                    projectsEl.scrollTop = nextTop;
                    return;
                }

                try {
                    projectsEl.scrollTo({ top: nextTop, behavior: 'smooth' });
                } catch (_) {
                    projectsEl.scrollTop = nextTop;
                }
            });
        };

        if (typeof window.matchMedia !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(scrollProjectsExpanded);
            });
        }
    }
};

// ============================================
// HERO v2 — Canvas Particles
// ============================================
(function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    function resize() {
        canvas.width = canvas.offsetWidth || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;
    }

    function mkParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5,
            a: Math.random() * 0.45 + 0.1
        };
    }

    function init() {
        resize();
        const count = Math.min(55, Math.floor((canvas.width * canvas.height) / 14000));
        particles = Array.from({ length: count }, mkParticle);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const MAX_DIST = 130;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245,158,11,${p.a})`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x, dy = p.y - q.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < MAX_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(245,158,11,${(1 - d / MAX_DIST) * 0.12})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        raf = requestAnimationFrame(draw);
    }

    init();
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { init(); }, 200);
    });
})();


// ============================================
// HERO v2 — Counter Animation
// ============================================
(function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    let done = false;
    function run() {
        if (done) return;
        done = true;
        counters.forEach(el => {
            const target = parseInt(el.getAttribute('data-counter'), 10);
            let current = 0;
            const steps = 35;
            const inc = target / steps;
            const timer = setInterval(() => {
                current += inc;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + '+';
            }, 40);
        });
    }

    // Run when home section is visible
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    const obs = new MutationObserver(() => {
        if (homeSection.classList.contains('active')) run();
    });
    obs.observe(homeSection, { attributes: true, attributeFilter: ['class'] });
    // Also run on first load if active
    if (homeSection.classList.contains('active')) setTimeout(run, 2400);
})()
