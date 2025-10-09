// Portfolio JavaScript - Alexandro Granja

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Scroll Handler - Unified function
let ticking = false;

function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Navbar background on scroll
    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active navigation link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrolled >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Parallax effects
    updateParallax(scrolled);
    
    // Show/Hide Scroll to Top Button
    if (scrolled > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
    
    ticking = false;
}

function requestScrollTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}

// Replace multiple scroll event listeners with single unified handler
window.addEventListener('scroll', requestScrollTick);

// Enhanced parallax effect function
function updateParallax(scrolled) {
    const rate = scrolled * -0.5;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${rate * 0.3}px)`;
    }

    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform += ` translateY(${scrolled * speed * 0.1}px)`;
    });

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

// Project Cards Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});

// Parallax Effect for Hero Section - Already handled in unified scroll handler

// Floating Elements Animation
document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 2;
        element.style.animationDelay = `${delay}s`;
        
        // Add random floating motion
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            element.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
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

// Scroll to Top Functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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
document.addEventListener('DOMContentLoaded', () => {
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
window.addEventListener('load', () => {
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
document.addEventListener('DOMContentLoaded', () => {
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

// Efeito de brilho que segue o mouse nos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .agency-card');
    
    cards.forEach(card => {
        const glow = document.createElement('div');
        glow.className = 'mouse-glow';
        glow.style.cssText = `
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        card.appendChild(glow);
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.left = (x - 100) + 'px';
            glow.style.top = (y - 100) + 'px';
            glow.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    });
});

console.log('✨ Animações avançadas carregadas com sucesso!');

