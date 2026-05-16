/* Zentia Alliance - Interactivity & Animations */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Preloader Removal
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    });

    // 1. Scroll Progress & Parallax
    const scrollProgress = document.getElementById('scroll-progress');
    const heroBg = document.querySelector('.hero-bg-wrapper');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalScroll) * 100;
        scrollProgress.style.width = `${progress}%`;

        // Hero Parallax
        if (heroBg) {
            const scrollValue = window.scrollY;
            heroBg.style.transform = `scale(1.1) translateY(${scrollValue * 0.3}px)`;
        }

        // Nav Scrolled State
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Language Toggle Logic
    const html = document.documentElement;
    const btnEs = document.getElementById('toggle-es');
    const btnPt = document.getElementById('toggle-pt');

    const setLanguage = (lang) => {
        html.setAttribute('lang', lang);
        if (lang === 'es') {
            btnEs.classList.add('active');
            btnPt.classList.remove('active');
        } else {
            btnPt.classList.add('active');
            btnEs.classList.remove('active');
        }
        localStorage.setItem('zentia-lang', lang);
    };

    btnEs.addEventListener('click', () => setLanguage('es'));
    btnPt.addEventListener('click', () => setLanguage('pt'));

    const storedLang = localStorage.getItem('zentia-lang');
    if (storedLang) setLanguage(storedLang);


    // 3. Advanced Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-stagger > *');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach((el, index) => {
        // Add manual delay for staggering if in a container
        if (el.parentElement.classList.contains('reveal-stagger')) {
            el.style.transitionDelay = `${index * 0.15}s`;
        }
        revealObserver.observe(el);
    });


    // 4. Mobile Menu Toggle (Simplified)
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        // Toggle basic mobile visibility if needed
        // For this premium version, we'll keep it simple or expand if requested
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--navy)';
        navLinks.style.padding = '20px';
    });


    // 5. Form Submission (Demo)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Thank you. We will contact you shortly.';
                btn.style.background = '#28a745';
                btn.style.borderColor = '#28a745';
                contactForm.reset();
            }, 1500);
        });
    }
});
