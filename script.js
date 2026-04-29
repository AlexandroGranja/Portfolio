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
            subtitle: "Desenvolvedor Fullstack & Especialista em Automações com IA 🚀",
            description: "Desenvolvedor Fullstack focado em React, Python/Flask e PostgreSQL. Construí o Fortão Prêmios — sistema em produção com cache em 5 camadas que reduziu 40% do tempo de carregamento — e automatizo fluxos com n8n e IA na rotina de TI da Prosper. Gosto de problemas onde a aplicação inteira precisa funcionar bem.",
            viewProjects: "Ver Projetos",
            contactMe: "Entre em Contato",
            downloadCV: "Baixar CV",
            loading: "Carregando experiência...",
            statProjects: "Projetos",
            statAutomations: "Automações",
            statExperience: "Anos Exp."
        },
        // About Section
        about: {
            title: "Alexandro Granja",
            subtitle: "Desenvolvedor Fullstack & Especialista em Automações com IA 🚀",
            experience: "Experiência Profissional",
            education: "Formação",
            current: "Atual",
            techSupport: "Analista de Suporte de TI",
            techSupportDesc: "Suporte técnico N1/N2, manutenção de hardware e software, administração de Active Directory e Microsoft 365, gestão de chamados e suporte ao ERP Target/Target Mob em ambiente de logística e distribuição. Também desenvolvi ferramentas internas para otimização de processos.",
            founder: "Fundador & Fullstack Dev",
            founderDesc: "Desenvolvimento de aplicações Fullstack (React + Python/Flask + PostgreSQL), automações com n8n, integrações via APIs/webhooks e agentes de WhatsApp com IA.",
            techEducation: "Técnico em Informática",
            techEducationLevel: "Ensino Médio Técnico",
            devclub: "DevClub Fullstack Pro",
            devclubLevel: "Formação Intensiva",
            automation: "Gestão de Automação",
            automationLevel: "Especialização IA & n8n",
            pixelCommunity: "Comunidade Pixel",
            pixelCommunityLevel: "n8n & Agentes IA",
            onlineCerts: "Certificados Online",
            achievements: "Principais Conquistas",
            achievement1: "Redução de 80% no tempo de atendimento com automações",
            achievement2: "Aplicações Fullstack escaláveis com React + Python",
            achievement3: "Integrações multicanal via APIs e webhooks",
            location: "Localização",
            locationPlace: "Brasil, Rio de Janeiro",
            seeking: "Buscando Oportunidades",
            seekingDesc: "Estou aberto a novas oportunidades nas áreas de:",
            seeking1: "Desenvolvimento Fullstack (React + Python/Flask)",
            seeking2: "Automações e Integrações (n8n, APIs, Webhooks)",
            seeking3: "Desenvolvimento Web & IA",
            contactButton: "Entre em contato"
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
            courses: "Certificados"
        },
        // Projects Section
        projects: {
            title: "Meus Projetos",
            subtitle: "Alguns dos meus trabalhos em desenvolvimento web e automações",
            readMore: "Ver mais",
            readLess: "Ver menos",
            visitSite: "Visitar Site",
            viewMenu: "Ver Cardápio",
            viewCode: "Ver Código"
        },
        // Contact Section
        contact: {
            title: "Entre em Contato",
            subtitle: "Estou sempre aberto a novas conexões, aprendizado e colaborações"
        },
        // Agency Section
        agency: {
            tagline: "Transformando ideias em soluções digitais inteligentes",
            webDev: {
                title: "Desenvolvimento Web Profissional",
                description: "Criamos sites modernos, responsivos e otimizados para SEO. Desde landing pages até sistemas web complexos, cada projeto é desenvolvido com as melhores práticas e tecnologias mais recentes do mercado.",
                feature1: "Design Moderno e Responsivo",
                feature2: "Otimização para Conversão",
                feature3: "Performance e SEO"
            },
            whatsapp: {
                title: "Agentes de WhatsApp com IA",
                description: "Revolucione seu atendimento ao cliente com agentes inteligentes personalizados. Automação completa integrada com IA, capaz de responder perguntas, processar solicitações e fornecer suporte 24/7 de forma natural e eficiente.",
                feature1: "Atendimento 24/7 Automatizado",
                feature2: "Integração com IA Avançada",
                feature3: "Personalização Total"
            },
            automation: {
                title: "Automações Inteligentes",
                description: "Especialistas em n8n e Python/Flask, criamos fluxos de automação que otimizam processos empresariais, reduzem custos operacionais e aumentam a produtividade. Integramos diferentes sistemas e ferramentas para trabalhar em harmonia, aplicando engenharia de prompts e soluções com IA/LLMs quando necessário.",
                feature1: "Fluxos Complexos com n8n",
                feature2: "Integração de Sistemas",
                feature3: "ROI Comprovado"
            },
            cta: {
                question: "Pronto para transformar seu negócio com tecnologia?",
                button: "Visite AIverse Technologies"
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
            // Níveis de proficiência
            expert: "Expert",
            advanced: "Avançado",
            intermediate: "Intermediário",
            specialist: "Especialista",
            // Categorias de habilidades
            versioning: "Versionamento",
            automation: "Automação",
            backendSkill: "Backend",
            database: "Database",
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
            logistics: "Logística"
        },
        // Projects Section
        projects: {
            title: "Meus Projetos",
            subtitle: "Alguns dos meus trabalhos em desenvolvimento web e automações",
            readMore: "Ver mais",
            readLess: "Ver menos",
            visitSite: "Visitar Site",
            viewMenu: "Ver Cardápio",
            viewCode: "Ver Código",
            // Projeto 1: Fortão Prêmios
            project1Title: "Fortão Prêmios",
            project1Description: "Sistema completo de campanhas promocionais online com Next.js 14, React e TypeScript. Implementei autenticação com JWT/bcrypt, cache em 5 camadas que reduziu o tempo de carregamento em 40%, dashboard administrativo com estatísticas em tempo real e design responsivo. Deploy na Railway com otimizações de performance e segurança.",
            // Projeto 2: Cardápio Online
            project2Title: "Cardápio Online",
            project2Description: "Sistema completo de cardápio online com painel administrativo avançado. Desenvolvido com React 18 e integração total com Supabase. Inclui cardápio dinâmico, carrinho de compras, checkout completo, gerenciamento de pedidos, upload de imagens, configurações personalizáveis (cores, logo, endereço, redes sociais) e sistema de autenticação. Backend opcional em Flask/Python. Deploy realizado na Railway.",
            // Projeto 3: Moraes Adesivos
            project3Title: "Moraes Adesivos",
            project3Description: "Site completo desenvolvido pela AIverse Technologies para empresa especializada em adesivos decorativos. Landing page moderna com galeria de trabalhos, seção de serviços e integração com WhatsApp para orçamentos. Design responsivo e otimizado para conversão de leads.",
            // Projeto 4: Prosper Roteiros
            project4Title: "Prosper Roteiros",
            project4Description: "Sistema inteligente de geração de roteiros otimizados para vendedores. Desenvolvido com React e Flask/Python, utiliza algoritmo do vizinho mais próximo para otimização geográfica. Inclui agrupamento de clientes por proximidade usando coordenadas GPS e CEPs, geração automática de rotas com 6-8 visitas por rota, visualização interativa de rotas em mapas (Leaflet), dashboard com métricas detalhadas (total de visitas, dias de trabalho, distância média), gerenciamento de arquivos Excel/CSV, filtros por vendedor e data, e exportação de roteiros em CSV. Interface moderna e responsiva com design intuitivo.",
            // Projeto 5: Processador de XML
            project5Title: "Processador de XML",
            project5Description: "Sistema web para processamento e seleção de arquivos XML baseado em planilhas Excel. Desenvolvido com Flask e Python, permite fazer upload de uma planilha Excel (.xlsx) com números de NF na coluna B e um arquivo ZIP contendo XMLs de notas fiscais. O sistema verifica automaticamente se os números da planilha estão contidos nos XMLs, seleciona os arquivos correspondentes e gera um novo arquivo ZIP compactado com apenas os XMLs selecionados. Interface moderna e intuitiva com drag-and-drop, feedback visual durante o processamento e download automático do resultado."
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
            subtitle: "Fullstack Developer & AI Automation Specialist 🚀",
            description: "Fullstack Developer working with React, Python/Flask and PostgreSQL. I built Fortão Prêmios — a production system with a 5-layer cache that cut load time by 40% — and I automate workflows with n8n and AI in my IT role at Prosper. I'm drawn to problems where the whole stack has to work together.",
            viewProjects: "View Projects",
            contactMe: "Get in Touch",
            downloadCV: "Download CV",
            loading: "Loading experience...",
            statProjects: "Projects",
            statAutomations: "Automations",
            statExperience: "Yrs Exp."
        },
        // About Section
        about: {
            title: "Alexandro Granja",
            subtitle: "Fullstack Developer & AI Automation Specialist 🚀",
            experience: "Professional Experience",
            education: "Education",
            current: "Current",
            techSupport: "IT Support Analyst",
            techSupportDesc: "N1/N2 technical support, hardware and software maintenance, Active Directory and Microsoft 365 administration, ticket management, and ERP Target/Target Mob support in a logistics and distribution environment. Also developed internal tools to optimize team processes.",
            founder: "Founder & Fullstack Dev",
            founderDesc: "Development of Fullstack applications (React + Python/Flask + PostgreSQL), automations with n8n, integrations via APIs/webhooks, and WhatsApp agents with AI.",
            techEducation: "IT Technician",
            techEducationLevel: "Technical High School",
            devclub: "DevClub Fullstack Pro",
            devclubLevel: "Intensive Training",
            automation: "Automation Management",
            automationLevel: "AI & n8n Specialization",
            pixelCommunity: "Pixel Community",
            pixelCommunityLevel: "n8n & AI Agents",
            onlineCerts: "Online Certificates",
            achievements: "Main Achievements",
            achievement1: "80% reduction in service time with automations",
            achievement2: "Scalable Fullstack applications with React + Python",
            achievement3: "Multi-channel integrations via APIs and webhooks",
            location: "Location",
            locationPlace: "Brazil, Rio de Janeiro",
            seeking: "Seeking Opportunities",
            seekingDesc: "I am open to new opportunities in the areas of:",
            seeking1: "Fullstack Development (React + Python/Flask)",
            seeking2: "Automations and Integrations (n8n, APIs, Webhooks)",
            seeking3: "Web & AI Development",
            contactButton: "Get in Touch"
        },
        // Skills Section
        skills: {
            frontend: "Frontend",
            backend: "Backend & Automation",
            tools: "Tools",
            courses: "Courses"
        },
        // Projects Section
        projects: {
            title: "My Projects",
            subtitle: "Some of my work in web development and automations",
            readMore: "Read more",
            readLess: "Read less",
            visitSite: "Visit Site",
            viewMenu: "View Menu",
            viewCode: "View Code"
        },
        // Contact Section
        contact: {
            title: "Get in Touch",
            subtitle: "I'm always open to new connections, learning and collaborations"
        },
        // Agency Section
        agency: {
            tagline: "Transforming ideas into intelligent digital solutions",
            webDev: {
                title: "Professional Web Development",
                description: "We create modern, responsive, and SEO-optimized websites. From landing pages to complex web systems, each project is developed with best practices and the latest market technologies.",
                feature1: "Modern and Responsive Design",
                feature2: "Conversion Optimization",
                feature3: "Performance and SEO"
            },
            whatsapp: {
                title: "WhatsApp Agents with AI",
                description: "Revolutionize your customer service with personalized intelligent agents. Complete automation integrated with AI, capable of answering questions, processing requests, and providing 24/7 support naturally and efficiently.",
                feature1: "24/7 Automated Service",
                feature2: "Advanced AI Integration",
                feature3: "Total Personalization"
            },
            automation: {
                title: "Intelligent Automations",
                description: "Specialists in n8n and Python/Flask, we create automation flows that optimize business processes, reduce operational costs, and increase productivity. We integrate different systems and tools to work in harmony, applying prompt engineering and solutions with AI/LLMs when necessary.",
                feature1: "Complex Flows with n8n",
                feature2: "System Integration",
                feature3: "Proven ROI"
            },
            cta: {
                question: "Ready to transform your business with technology?",
                button: "Visit AIverse Technologies"
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
            logistics: "Logistics"
        },
        // Projects Section
        projects: {
            title: "My Projects",
            subtitle: "Some of my work in web development and automations",
            readMore: "Read more",
            readLess: "Read less",
            visitSite: "Visit Site",
            viewMenu: "View Menu",
            viewCode: "View Code",
            // Projeto 1: Fortão Prêmios
            project1Title: "Fortão Prêmios",
            project1Description: "Complete online promotional campaign system built with Next.js 14, React and TypeScript. Implemented JWT/bcrypt authentication, a 5-layer cache that cut loading time by 40%, an admin dashboard with real-time statistics, and responsive design. Deployed on Railway with performance and security optimizations.",
            // Projeto 2: Cardápio Online
            project2Title: "Online Menu",
            project2Description: "Complete online menu system with advanced admin panel. Developed with React 18 and full Supabase integration. Includes dynamic menu, shopping cart, complete checkout, order management, image upload, customizable settings (colors, logo, address, social media) and authentication system. Optional Flask/Python backend. Deploy performed on Railway.",
            // Projeto 3: Moraes Adesivos
            project3Title: "Moraes Adesivos",
            project3Description: "Complete website developed by AIverse Technologies for a company specialized in decorative stickers. Modern landing page with work gallery, services section and WhatsApp integration for quotes. Responsive design optimized for lead conversion.",
            // Projeto 4: Prosper Roteiros
            project4Title: "Prosper Roteiros",
            project4Description: "Intelligent system for generating optimized routes for salespeople. Developed with React and Flask/Python, uses nearest neighbor algorithm for geographic optimization. Includes customer grouping by proximity using GPS coordinates and ZIP codes, automatic route generation with 6-8 visits per route, interactive route visualization on maps (Leaflet), dashboard with detailed metrics (total visits, work days, average distance), Excel/CSV file management, filters by seller and date, and CSV route export. Modern and responsive interface with intuitive design.",
            // Projeto 5: Processador de XML
            project5Title: "XML Processor",
            project5Description: "Web system for processing and selecting XML files based on Excel spreadsheets. Developed with Flask and Python, allows uploading an Excel spreadsheet (.xlsx) with NF numbers in column B and a ZIP file containing invoice XMLs. The system automatically checks if the spreadsheet numbers are contained in the XMLs, selects the corresponding files and generates a new compressed ZIP file with only the selected XMLs. Modern and intuitive interface with drag-and-drop, visual feedback during processing and automatic result download."
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
    document.querySelectorAll('[data-i18n="hero.description"]').forEach(el => el.textContent = t.hero.description);
    document.querySelectorAll('[data-i18n="hero.viewProjects"]').forEach(el => el.textContent = t.hero.viewProjects);
    document.querySelectorAll('[data-i18n="hero.contactMe"]').forEach(el => el.textContent = t.hero.contactMe);
    document.querySelectorAll('[data-i18n="hero.downloadCV"]').forEach(el => el.textContent = t.hero.downloadCV);
    document.querySelectorAll('[data-i18n="hero.loading"]').forEach(el => el.textContent = t.hero.loading);
    document.querySelectorAll('[data-i18n="hero.statProjects"]').forEach(el => el.textContent = t.hero.statProjects);
    document.querySelectorAll('[data-i18n="hero.statAutomations"]').forEach(el => el.textContent = t.hero.statAutomations);
    document.querySelectorAll('[data-i18n="hero.statExperience"]').forEach(el => el.textContent = t.hero.statExperience);

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
    document.querySelectorAll('[data-i18n="about.onlineCerts"]').forEach(el => el.textContent = t.about.onlineCerts);
    document.querySelectorAll('[data-i18n="about.achievements"]').forEach(el => el.textContent = t.about.achievements);
    document.querySelectorAll('[data-i18n="about.achievement1"]').forEach(el => el.textContent = t.about.achievement1);
    document.querySelectorAll('[data-i18n="about.achievement2"]').forEach(el => el.textContent = t.about.achievement2);
    document.querySelectorAll('[data-i18n="about.achievement3"]').forEach(el => el.textContent = t.about.achievement3);
    document.querySelectorAll('[data-i18n="about.location"]').forEach(el => el.textContent = t.about.location);
    document.querySelectorAll('[data-i18n="about.locationPlace"]').forEach(el => el.textContent = t.about.locationPlace);
    document.querySelectorAll('[data-i18n="about.seeking"]').forEach(el => el.textContent = t.about.seeking);
    document.querySelectorAll('[data-i18n="about.seekingDesc"]').forEach(el => el.textContent = t.about.seekingDesc);
    document.querySelectorAll('[data-i18n="about.seeking1"]').forEach(el => el.textContent = t.about.seeking1);
    document.querySelectorAll('[data-i18n="about.seeking2"]').forEach(el => el.textContent = t.about.seeking2);
    document.querySelectorAll('[data-i18n="about.seeking3"]').forEach(el => el.textContent = t.about.seeking3);
    document.querySelectorAll('[data-i18n="about.contactButton"]').forEach(el => el.textContent = t.about.contactButton);
    document.querySelectorAll('[data-i18n="about.subtitle"]').forEach(el => el.textContent = t.about.subtitle);
    
    // Atualizar Skills
    document.querySelectorAll('[data-i18n="skills.techStack"]').forEach(el => el.textContent = t.skills.techStack);
    document.querySelectorAll('[data-i18n="skills.mySkillsLabel"]').forEach(el => el.textContent = t.skills.mySkillsLabel);
    document.querySelectorAll('[data-i18n="skills.mySkillsHighlight"]').forEach(el => el.textContent = t.skills.mySkillsHighlight);
    document.querySelectorAll('[data-i18n="skills.technologies"]').forEach(el => el.textContent = t.skills.technologies);
    document.querySelectorAll('[data-i18n="skills.frontend"]').forEach(el => el.textContent = t.skills.frontend);
    document.querySelectorAll('[data-i18n="skills.backend"]').forEach(el => el.textContent = t.skills.backend);
    document.querySelectorAll('[data-i18n="skills.tools"]').forEach(el => el.textContent = t.skills.tools);
    document.querySelectorAll('[data-i18n="skills.courses"]').forEach(el => el.textContent = t.skills.courses);

    // Atualizar Agency
    document.querySelectorAll('[data-i18n="agency.tagline"]').forEach(el => el.textContent = t.agency.tagline);
    document.querySelectorAll('[data-i18n="agency.webDev.title"]').forEach(el => el.textContent = t.agency.webDev.title);
    document.querySelectorAll('[data-i18n="agency.webDev.description"]').forEach(el => el.textContent = t.agency.webDev.description);
    document.querySelectorAll('[data-i18n="agency.webDev.feature1"]').forEach(el => el.textContent = t.agency.webDev.feature1);
    document.querySelectorAll('[data-i18n="agency.webDev.feature2"]').forEach(el => el.textContent = t.agency.webDev.feature2);
    document.querySelectorAll('[data-i18n="agency.webDev.feature3"]').forEach(el => el.textContent = t.agency.webDev.feature3);
    document.querySelectorAll('[data-i18n="agency.whatsapp.title"]').forEach(el => el.textContent = t.agency.whatsapp.title);
    document.querySelectorAll('[data-i18n="agency.whatsapp.description"]').forEach(el => el.textContent = t.agency.whatsapp.description);
    document.querySelectorAll('[data-i18n="agency.whatsapp.feature1"]').forEach(el => el.textContent = t.agency.whatsapp.feature1);
    document.querySelectorAll('[data-i18n="agency.whatsapp.feature2"]').forEach(el => el.textContent = t.agency.whatsapp.feature2);
    document.querySelectorAll('[data-i18n="agency.whatsapp.feature3"]').forEach(el => el.textContent = t.agency.whatsapp.feature3);
    document.querySelectorAll('[data-i18n="agency.automation.title"]').forEach(el => el.textContent = t.agency.automation.title);
    document.querySelectorAll('[data-i18n="agency.automation.description"]').forEach(el => el.textContent = t.agency.automation.description);
    document.querySelectorAll('[data-i18n="agency.automation.feature1"]').forEach(el => el.textContent = t.agency.automation.feature1);
    document.querySelectorAll('[data-i18n="agency.automation.feature2"]').forEach(el => el.textContent = t.agency.automation.feature2);
    document.querySelectorAll('[data-i18n="agency.automation.feature3"]').forEach(el => el.textContent = t.agency.automation.feature3);
    document.querySelectorAll('[data-i18n="agency.cta.question"]').forEach(el => el.textContent = t.agency.cta.question);
    document.querySelectorAll('[data-i18n="agency.cta.button"]').forEach(el => el.textContent = t.agency.cta.button);
    
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
    const sections = document.querySelectorAll('section');
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
%c💼 Analista de TI - Prosper | Fundador - AIverse Technologies
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

// Abas da seção de habilidades
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = Array.from(document.querySelectorAll('.skills-tab-btn'));
    const skillCards = Array.from(document.querySelectorAll('.skill-card-group'));
    if (!tabButtons.length || !skillCards.length) return;

    function activateTab(target) {
        // Atualizar botões
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tabTarget === target;
            if (isActive) {
                btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-700');
                btn.classList.add('bg-primary', 'text-white', 'font-semibold', 'shadow-lg', 'shadow-primary/25');
            } else {
                btn.classList.remove('bg-primary', 'text-white', 'font-semibold', 'shadow-lg', 'shadow-primary/25');
                btn.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'font-medium', 'border', 'border-slate-200', 'dark:border-slate-700');
            }
        });
        
        // Atualizar cards
        skillCards.forEach(card => {
            const show = card.dataset.tab === target;
            card.classList.toggle('hidden', !show);
        });
    }

    // Ativar primeira aba por padrão
    if (tabButtons.length > 0) {
        activateTab(tabButtons[0].dataset.tabTarget);
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn.dataset.tabTarget));
    });
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
// CARROSSEL DE PROJETOS
// ============================================

let currentProjectIndex = 0;
const totalProjects = 5;
let isChangingProject = false; // Flag para evitar mudanças simultâneas

// Função para mudar de projeto
window.changeProject = function(direction) {
    // Calcula novo índice primeiro
    let newIndex = currentProjectIndex + direction;
    if (newIndex < 0) {
        newIndex = totalProjects - 1;
    } else if (newIndex >= totalProjects) {
        newIndex = 0;
    }
    
    // Usa goToProject para garantir que tudo seja atualizado corretamente
    goToProject(newIndex);
};

// Função para ir diretamente a um projeto
window.goToProject = function(index) {
    if (index < 0 || index >= totalProjects) {
        return;
    }
    
    // Evita mudanças simultâneas
    if (isChangingProject) {
        return;
    }
    
    // Se já está no projeto solicitado, não faz nada
    if (currentProjectIndex === index) {
        return;
    }
    
    isChangingProject = true;
    
    // Atualiza o índice atual ANTES de fazer qualquer coisa
    currentProjectIndex = index;
    
    // Primeiro, remover active de TODOS os projetos
    const allProjects = document.querySelectorAll('.project-card');
    const allIndicators = document.querySelectorAll('.project-indicator');
    
    // Remove active de todos e força display none imediatamente
    allProjects.forEach((p) => {
        p.classList.remove('active');
        // Força display none imediatamente sem transição
        p.style.transition = 'none';
        p.style.display = 'none';
        p.style.opacity = '0';
    });
    
    allIndicators.forEach((ind) => {
        ind.classList.remove('active');
    });
    
    // Agora encontrar o projeto específico pelo data-project
    const targetProject = document.querySelector(`.project-card[data-project="${index}"]`);
    const targetIndicator = allIndicators[index];
    
    if (!targetProject) {
        console.error(`Projeto ${index} não encontrado!`);
        return;
    }
    
    // Adiciona active ao projeto selecionado
    targetProject.classList.add('active');
    
    // Força display flex imediatamente sem transição
    targetProject.style.transition = 'none';
    targetProject.style.display = 'flex';
    targetProject.style.opacity = '1';
    targetProject.style.transform = 'translateX(0)';
    
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
    
    if (targetIndicator) {
        targetIndicator.classList.add('active');
    }
    
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
    
    // Remove active de todos
    slides.forEach(s => s.classList.remove('active'));
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
    // Aguarda um pouco para garantir que o DOM está totalmente carregado
    setTimeout(() => {
        // Garantir que apenas o primeiro projeto está ativo
        const allProjects = document.querySelectorAll('.project-card');
        const allIndicators = document.querySelectorAll('.project-indicator');
        
        // Remove active de todos os projetos
        allProjects.forEach(p => p.classList.remove('active'));
        allIndicators.forEach(i => i.classList.remove('active'));
        
        // Ativa apenas o primeiro projeto
        const firstProject = document.querySelector('.project-card[data-project="0"]');
        const firstIndicator = document.querySelector('.project-indicator');
        
        if (firstProject) {
            firstProject.classList.add('active');
            resetImageCarousel(firstProject);
        }
        
        if (firstIndicator) {
            firstIndicator.classList.add('active');
        }
        
        
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
        
        // Garante que os botões de navegação estão funcionando
        const prevBtn = document.querySelector('.project-nav-left');
        const nextBtn = document.querySelector('.project-nav-right');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                changeProject(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                changeProject(1);
            });
        }
        
        // Também adiciona listeners aos indicadores de projetos
        const projectIndicators = document.querySelectorAll('.project-indicator');
        projectIndicators.forEach((indicator) => {
            // Remove listeners anteriores se existirem
            const newIndicator = indicator.cloneNode(true);
            indicator.parentNode.replaceChild(newIndicator, indicator);
            
            // Pega o índice do data-project-index
            const index = parseInt(newIndicator.getAttribute('data-project-index'));
            
            newIndicator.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToProject(index);
            });
        });
        
        // Os botões do carrossel já têm onclick inline no HTML, não precisamos adicionar listeners
        
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
            if (target.closest('button') || target.closest('a') || target.closest('.carousel-btn') || target.closest('.carousel-indicators')) {
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
            if (target.closest('button') || target.closest('a') || target.closest('.carousel-btn') || target.closest('.carousel-indicators')) {
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
// BOTÃO VER MAIS / VER MENOS NA DESCRIÇÃO
// ============================================

window.toggleDescription = function(button) {
    const wrapper = button.closest('.project-description-wrapper');
    const description = wrapper.querySelector('.project-description');
    const readMoreText = button.querySelector('.read-more-text');
    const readLessText = button.querySelector('.read-less-text');

    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        readMoreText.style.display = 'inline';
        readLessText.style.display = 'none';
        button.classList.remove('expanded');
    } else {
        description.classList.add('expanded');
        readMoreText.style.display = 'none';
        readLessText.style.display = 'inline';
        button.classList.add('expanded');
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
// HERO v2 — Typewriter
// ============================================
(function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const roles = {
        pt: ['Desenvolvedor Web', 'Especialista em Automações', 'Fundador da AIverse', 'Full Stack Dev'],
        en: ['Web Developer', 'Automation Specialist', 'AIverse Founder', 'Full Stack Dev']
    };

    let roleIdx = 0, charIdx = 0, deleting = false;

    function getLang() {
        return document.documentElement.lang === 'en' ? 'en' : 'pt';
    }

    function tick() {
        const list = roles[getLang()];
        const current = list[roleIdx % list.length];
        if (deleting) {
            el.textContent = current.slice(0, charIdx--);
        } else {
            el.textContent = current.slice(0, charIdx++);
        }

        let delay = deleting ? 45 : 95;
        if (!deleting && charIdx > current.length) {
            delay = 2200; deleting = true;
        } else if (deleting && charIdx < 0) {
            deleting = false; charIdx = 0;
            roleIdx = (roleIdx + 1) % list.length;
            delay = 350;
        }
        setTimeout(tick, delay);
    }

    setTimeout(tick, 2400);
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
