// Menu Mobile
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Fechar menu ao clicar em um link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Mostrar/ocultar botão voltar ao topo (ESQUERDA)
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
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
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se estiver aberto
            if (mobileNav.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Botão voltar ao topo (ESQUERDA)
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Player de Vídeo Automático
const videoPlayer = document.getElementById('institutionalVideo');
const videoOverlay = document.getElementById('videoOverlay');

if (videoPlayer && videoOverlay) {
    // Vídeo começa automático e mudo
    videoPlayer.muted = true;
    videoPlayer.autoplay = true;
    videoPlayer.loop = true;
    videoPlayer.playsInline = true;
    
    // Ativar som ao clicar no vídeo
    videoPlayer.addEventListener('click', toggleVideoSound);
    videoOverlay.addEventListener('click', toggleVideoSound);
    
    function toggleVideoSound() {
        if (videoPlayer.muted) {
            videoPlayer.muted = false;
            videoOverlay.classList.add('hidden');
            videoPlayer.style.cursor = 'default';
        } else {
            videoPlayer.muted = true;
            videoOverlay.classList.remove('hidden');
        }
    }
    
    // Mostrar overlay quando o som está desativado
    videoPlayer.addEventListener('volumechange', () => {
        if (videoPlayer.muted) {
            videoOverlay.classList.remove('hidden');
        }
    });
}

// Dados dos Serviços
const servicosData = {
    contabilidade: {
        title: "Assessoria Contábil",
        icon: '<i class="fas fa-calculator"></i>',
        description: "Gestão completa da contabilidade da sua empresa com relatórios precisos e atualizados.",
        details: "Oferecemos serviços completos de contabilidade, incluindo escrituração contábil, elaboração de balanços patrimoniais, demonstrações de resultados (DRE), balancetes mensais, conciliações bancárias e todas as obrigações acessórias exigidas pela legislação. Nossa equipe especializada garante que sua empresa esteja sempre em conformidade com as normas contábeis vigentes.",
        benefits: [
            "Relatórios financeiros precisos e em tempo real",
            "Cumprimento de todas as obrigações contábeis",
            "Análise de desempenho financeiro da empresa",
            "Suporte para tomada de decisões estratégicas",
            "Planejamento contábil personalizado"
        ],
        whatsappMessage: "Olá! Gostaria de saber mais sobre a Assessoria Contábil da MMJ Contabilidade."
    },
    fiscal: {
        title: "Assessoria Fiscal",
        icon: '<i class="fas fa-file-invoice-dollar"></i>',
        description: "Cumprimento de obrigações fiscais e otimização de tributos dentro da legalidade.",
        details: "Nossa assessoria fiscal inclui apuração e recolhimento de impostos federais, estaduais e municipais, análise de créditos tributários, elaboração e entrega de declarações obrigatórias (SPED Fiscal, EFD Contribuições, DCTF, entre outras), e planejamento tributário estratégico para redução da carga fiscal de forma legal e segura.",
        benefits: [
            "Otimização legal da carga tributária",
            "Cumprimento em dia de todas as obrigações fiscais",
            "Recuperação de créditos tributários",
            "Monitoramento de mudanças na legislação",
            "Evitar multas e penalidades fiscais"
        ],
        whatsappMessage: "Olá! Gostaria de saber mais sobre a Assessoria Fiscal da MMJ Contabilidade."
    },
    tributaria: {
        title: "Assessoria Tributária",
        icon: '<i class="fas fa-balance-scale"></i>',
        description: "Planejamento tributário estratégico para redução da carga fiscal de forma legal.",
        details: "Desenvolvemos estratégias personalizadas de planejamento tributário para sua empresa, analisando o melhor regime de tributação (Lucro Real, Lucro Presumido ou Simples Nacional), identificando oportunidades de economia fiscal legal, e assessorando em processos administrativos e judiciais relacionados a tributos.",
        benefits: [
            "Redução legal da carga tributária",
            "Escolha do melhor regime de tributação",
            "Defesa em processos fiscais",
            "Planejamento tributário preventivo",
            "Consultoria em operações específicas"
        ],
        whatsappMessage: "Olá! Gostaria de saber mais sobre a Assessoria Tributária da MMJ Contabilidade."
    },
    ambiental: {
        title: "Assessoria Ambiental",
        icon: '<i class="fas fa-leaf"></i>',
        description: "Consultoria para compliance ambiental e licenciamento de atividades.",
        details: "Oferecemos consultoria especializada em legislação ambiental, auxiliando sua empresa no licenciamento ambiental, gestão de resíduos, outorgas de água, regularização de passivos ambientais e implementação de sistemas de gestão ambiental. Garantimos que sua empresa opere em conformidade com as normas ambientais vigentes.",
        benefits: [
            "Regularização ambiental completa",
            "Evitar multas e penalidades ambientais",
            "Licenciamento ambiental ágil",
            "Gestão eficiente de resíduos",
            "Sustentabilidade empresarial"
        ],
        whatsappMessage: "Olá! Gostaria de saber mais sobre a Assessoria Ambiental da MMJ Contabilidade."
    },
    trabalhista: {
        title: "Assessoria Trabalhista",
        icon: '<i class="fas fa-briefcase"></i>',
        description: "Gestão de rotinas trabalhistas e previdenciárias com foco na legislação vigente.",
        details: "Serviços completos de departamento pessoal, incluindo admissões, rescisões, férias, 13º salário, folha de pagamento, cálculo de encargos sociais, elaboração de contratos de trabalho, e assessoria em questões trabalhistas e previdenciárias. Mantemos sua empresa em conformidade com a CLT e legislação previdenciária.",
        benefits: [
            "Folha de pagamento precisa e em dia",
            "Conformidade total com a legislação trabalhista",
            "Redução de passivos trabalhistas",
            "Gestão eficiente de benefícios",
            "Consultoria em relações trabalhistas"
        ],
        whatsappMessage: "Olá! Gostaria de saber mais sobre a Assessoria Trabalhista da MMJ Contabilidade."
    },
    juridica: {
        title: "Assessoria Jurídica",
        icon: '<i class="fas fa-gavel"></i>',
        description: "Suporte legal especializado em direito empresarial, tributário e trabalhista.",
        details: "Nossa assessoria jurídica abrange todas as áreas do direito empresarial: contratos societários, constituição e alteração de empresas, recuperação judicial e extrajudicial, direito tributário, direito trabalhista, propriedade intelectual e consultoria legal preventiva. Atuamos também em processos administrativos e judiciais.",
        benefits: [
            "Proteção legal do patrimônio empresarial",
            "Elaboração e revisão de contratos",
            "Defesa em processos judiciais",
            "Consultoria jurídica preventiva",
            "Regularização societária completa"
        ],
        whatsappMessage: "Olá! Gostaria de saber mais sobre a Assessoria Jurídica da MMJ Contabilidade."
    }
};

// Modal de Serviços
const serviceModal = document.getElementById('serviceModal');
const modalClose = document.getElementById('modalClose');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDetails = document.getElementById('modalDetails');
const modalBenefits = document.getElementById('modalBenefits');
const modalWhatsApp = document.getElementById('modalWhatsApp');
const modalContact = document.getElementById('modalContact');

// Abrir modal ao clicar nos cards de serviço
const servicoCards = document.querySelectorAll('.servico-card');

servicoCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        const serviceData = servicosData[serviceType];
        
        if (serviceData) {
            // Preencher modal com dados do serviço
            modalIcon.innerHTML = serviceData.icon;
            modalTitle.textContent = serviceData.title;
            modalDescription.textContent = serviceData.description;
            modalDetails.textContent = serviceData.details;
            
            // Limpar e preencher benefícios
            modalBenefits.innerHTML = '';
            serviceData.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.textContent = benefit;
                modalBenefits.appendChild(li);
            });
            
            // Configurar link do WhatsApp
            const whatsappUrl = `https://wa.me/5537988888888?text=${encodeURIComponent(serviceData.whatsappMessage)}`;
            modalWhatsApp.href = whatsappUrl;
            
            // Configurar botão de contato alternativo
            modalContact.addEventListener('click', () => {
                serviceModal.classList.remove('active');
                document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
            });
            
            // Mostrar modal
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Fechar modal
modalClose.addEventListener('click', () => {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Fechar modal ao clicar fora do conteúdo
serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    }
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
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
});

const numerosSection = document.querySelector('.numeros');
if (numerosSection) {
    numberObserver.observe(numerosSection);
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 0;
    
    function updateCounter() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
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
                    input.style.borderColor = '#E9ECEF';
                }, 2000);
            }
        });
        
        if (isValid) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Simulação de envio
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.style.opacity = '0.7';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                submitButton.style.background = '#48bb78';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
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
                input.style.borderColor = '#E9ECEF';
            }
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
            const submitBtn = newsletterForm.querySelector('button');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    emailInput.value = '';
                    alert('Obrigado por se inscrever em nossa newsletter!');
                }, 1000);
            }, 1500);
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

// Atualizar ano no footer
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = currentYear;
}

// Service cards hover effect
servicoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Iniciar vídeo automaticamente
    if (videoPlayer) {
        videoPlayer.play().catch(e => {
            console.log('Autoplay bloqueado pelo navegador:', e);
        });
    }
});

// Mapa interativo (simulação)
const mapaPlaceholder = document.querySelector('.mapa-placeholder');
if (mapaPlaceholder) {
    mapaPlaceholder.addEventListener('click', () => {
        window.open('https://www.google.com/maps/place/Pará+de+Minas+-+MG', '_blank');
    });
}

// WhatsApp button enhancement
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1) translateY(-5px)';
    });
    
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1) translateY(0)';
    });
}

// Prevenir envio de formulários vazios
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const requiredInputs = form.querySelectorAll('[required]');
            let allValid = true;
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    allValid = false;
                    input.style.borderColor = '#E30613';
                    setTimeout(() => {
                        input.style.borderColor = '#E9ECEF';
                    }, 2000);
                }
            });
            
            if (!allValid) {
                e.preventDefault();
                return false;
            }
        });
    });
});

