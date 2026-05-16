/* Zentia Alliance - Interactivity & Animations */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Language Toggle Logic
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
        // Store preference
        localStorage.setItem('zentia-lang', lang);
    };

    btnEs.addEventListener('click', () => setLanguage('es'));
    btnPt.addEventListener('click', () => setLanguage('pt'));

    // Check stored preference
    const storedLang = localStorage.getItem('zentia-lang');
    if (storedLang) setLanguage(storedLang);


    // 2. Navigation Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });


    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


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
