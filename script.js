// Menu Mobile
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const spans = mobileToggle.querySelectorAll('span');
    
    if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em um link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Mostrar/ocultar botão voltar ao topo
    const backToTop = document.getElementById('backToTop');
    if (currentScroll > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        const mobileNavLink = document.querySelector(`.mobile-nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            mobileNavLinks.forEach(link => link.classList.remove('active'));
            
            if (navLink) navLink.classList.add('active');
            if (mobileNavLink) mobileNavLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 90;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation for Numbers Section
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.numero-valor');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            numberObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const numerosSection = document.querySelector('.numeros');
if (numerosSection) {
    numberObserver.observe(numerosSection);
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Animação de entrada para elementos
const fadeElements = document.querySelectorAll('.servico-card, .diferencial-card, .numero-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Form validation and handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#E30613';
                setTimeout(() => {
                    input.style.borderColor = '#E0E0E0';
                }, 2000);
            }
        });
        
        if (isValid) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Simulação de envio
            submitButton.textContent = 'Enviando...';
            submitButton.style.opacity = '0.7';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Mensagem Enviada!';
                submitButton.style.background = '#48bb78';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.style.opacity = '1';
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        }
    });
    
    // Reset border color on focus
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#FF4D4D';
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                input.style.borderColor = '#E0E0E0';
            }
        });
    });
}

// Botão voltar ao topo
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email && isValidEmail(email)) {
            // Simular cadastro
            emailInput.value = '';
            alert('Obrigado por se inscrever em nossa newsletter!');
        } else {
            alert('Por favor, insira um e-mail válido.');
        }
    });
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulação de login (Área do Cliente)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Entrando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Login realizado com sucesso! Redirecionando para a área do cliente...');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear && footerYear.textContent.includes('2024')) {
    footerYear.innerHTML = `&copy; ${currentYear} MMJ Contabilidade. Todos os direitos reservados.`;
}

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        if (heroSection && scrolled < window.innerHeight) {
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        }
    });
}

// Service cards hover effect
const servicoCards = document.querySelectorAll('.servico-card');
servicoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});