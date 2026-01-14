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
%c👨‍💻 Desenvolvedor Web & Especialista em Automações
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
const totalProjects = 3;

// Função para mudar de projeto
window.changeProject = function(direction) {
    const projects = document.querySelectorAll('.project-card');
    const indicators = document.querySelectorAll('.project-indicator');
    
    if (!projects.length || !indicators.length) {
        console.error('Projetos ou indicadores não encontrados');
        return;
    }
    
    // Remove active do projeto atual
    if (projects[currentProjectIndex]) {
        projects[currentProjectIndex].classList.remove('active');
    }
    if (indicators[currentProjectIndex]) {
        indicators[currentProjectIndex].classList.remove('active');
    }
    
    // Calcula novo índice
    currentProjectIndex += direction;
    if (currentProjectIndex < 0) {
        currentProjectIndex = totalProjects - 1;
    } else if (currentProjectIndex >= totalProjects) {
        currentProjectIndex = 0;
    }
    
    // Adiciona active ao novo projeto
    if (projects[currentProjectIndex]) {
        projects[currentProjectIndex].classList.add('active');
        resetImageCarousel(projects[currentProjectIndex]);
    }
    if (indicators[currentProjectIndex]) {
        indicators[currentProjectIndex].classList.add('active');
    }
};

// Função para ir diretamente a um projeto
window.goToProject = function(index) {
    if (index < 0 || index >= totalProjects) return;
    
    const projects = document.querySelectorAll('.project-card');
    const indicators = document.querySelectorAll('.project-indicator');
    
    // Remove active de todos
    projects.forEach(p => p.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    
    // Adiciona active ao projeto selecionado
    currentProjectIndex = index;
    projects[currentProjectIndex].classList.add('active');
    indicators[currentProjectIndex].classList.add('active');
    
    // Reseta o carrossel de imagens
    resetImageCarousel(projects[currentProjectIndex]);
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
        projectIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
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
    }, 100);
});

// ============================================
// BOTÃO VER MAIS / VER MENOS NA DESCRIÇÃO
// ============================================

window.toggleDescription = function(button) {
    const wrapper = button.closest('.project-description-wrapper');
    const description = wrapper.querySelector('.project-description');
    const readMoreText = button.querySelector('.read-more-text');
    const readLessText = button.querySelector('.read-less-text');
    
    if (description.classList.contains('expanded')) {
        // Colapsar
        description.classList.remove('expanded');
        readMoreText.style.display = 'inline';
        readLessText.style.display = 'none';
        button.classList.remove('expanded');
    } else {
        // Expandir
        description.classList.add('expanded');
        readMoreText.style.display = 'none';
        readLessText.style.display = 'inline';
        button.classList.add('expanded');
    }
};
