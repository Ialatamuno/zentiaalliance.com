const fs = require('fs');
const files = ['index.html', 'nosotros.html', 'divisiones.html', 'partners.html', 'contacto.html'];

const cssToInject = `
    <!-- Premium Effects CSS -->
    <style>
        #particles-js {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
        }

        .hero {
            background-attachment: fixed !important;
            position: relative;
            overflow: hidden;
        }

        .hero-content {
            position: relative;
            z-index: 2;
        }

        /* Custom Cursor */
        body {
            cursor: none;
        }

        .cursor-dot, .cursor-outline {
            position: fixed;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none;
        }

        .cursor-dot {
            width: 6px;
            height: 6px;
            background-color: var(--color-acento);
        }

        .cursor-outline {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(0, 194, 255, 0.5);
            transition: width 0.2s, height 0.2s, background-color 0.2s;
        }

        .cursor-hover {
            width: 60px;
            height: 60px;
            background-color: rgba(0, 194, 255, 0.1);
            border-color: transparent;
        }

        /* Glow Spotlight Effect */
        .glow-effect {
            position: relative;
            overflow: hidden;
        }

        .glow-effect::before {
            content: '';
            position: absolute;
            top: var(--y, 50%);
            left: var(--x, 50%);
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(0, 194, 255, 0.1) 0%, transparent 60%);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            z-index: 0;
        }

        .glow-effect:hover::before {
            opacity: 1;
        }

        .glow-effect > * {
            position: relative;
            z-index: 1;
        }

        /* Typewriter cursor */
        .typewriter-text {
            border-right: 3px solid var(--color-acento);
            white-space: pre-wrap;
            animation: blink 0.7s infinite;
        }

        @keyframes blink {
            50% { border-color: transparent; }
        }
    </style>
`;

const jsToInject = `
    <!-- Premium Effects Scripts -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Custom Cursor
            if (window.innerWidth > 768) { // Only on desktop
                const cursorDot = document.createElement('div');
                cursorDot.className = 'cursor-dot';
                const cursorOutline = document.createElement('div');
                cursorOutline.className = 'cursor-outline';
                document.body.appendChild(cursorDot);
                document.body.appendChild(cursorOutline);

                window.addEventListener('mousemove', (e) => {
                    cursorDot.style.left = e.clientX + 'px';
                    cursorDot.style.top = e.clientY + 'px';
                    
                    cursorOutline.animate({
                        left: e.clientX + 'px',
                        top: e.clientY + 'px'
                    }, { duration: 300, fill: "forwards" });
                });

                document.querySelectorAll('a, button, .division-card, .ecosystem-block, .tab-btn').forEach(el => {
                    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
                    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
                });
            }

            // 2. Glow Hover Effect
            const glowCards = document.querySelectorAll('.division-card, .op-gallery-item-patent, .ecosystem-block');
            glowCards.forEach(card => {
                card.classList.add('glow-effect');
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--x', x + 'px');
                    card.style.setProperty('--y', y + 'px');
                });
            });

            // 3. Particles Initialization (Only if #particles-js exists)
            if (document.getElementById('particles-js')) {
                particlesJS("particles-js", {
                    "particles": {
                        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                        "color": { "value": "#00C2FF" },
                        "shape": { "type": "circle" },
                        "opacity": { "value": 0.4, "random": false },
                        "size": { "value": 2, "random": true },
                        "line_linked": { "enable": true, "distance": 150, "color": "#00C2FF", "opacity": 0.2, "width": 1 },
                        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                        "modes": { "grab": { "distance": 180, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 3 } }
                    },
                    "retina_detect": true
                });
            }
            
            // Initial Typewriter effect trigger for hero
            setTimeout(() => {
                const heroTitle = document.querySelector('h1[data-translate="hero-title"]');
                if(heroTitle && typeof translations !== 'undefined' && typeof currentLang !== 'undefined') {
                     triggerTypewriter(heroTitle, translations[currentLang]["hero-title"]);
                }
            }, 500);
        });

        // 4. Typewriter Logic Override
        let typeWriterInterval;
        function triggerTypewriter(element, text) {
            clearInterval(typeWriterInterval);
            element.textContent = '';
            element.classList.add('typewriter-text');
            
            let i = 0;
            typeWriterInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriterInterval);
                    setTimeout(() => element.classList.remove('typewriter-text'), 1500); // Stop blinking cursor after a while
                }
            }, 35); // typing speed
        }

        const originalSetLanguage = window.setLanguage;
        if (typeof originalSetLanguage === 'function') {
            window.setLanguage = function(lang) {
                originalSetLanguage(lang);
                
                setTimeout(() => {
                    const heroTitle = document.querySelector('h1[data-translate="hero-title"]');
                    if (heroTitle && translations[lang] && translations[lang]["hero-title"]) {
                        triggerTypewriter(heroTitle, translations[lang]["hero-title"]);
                    }
                }, 260); // Wait for fade-out to finish
            }
        }
    </script>
`;

files.forEach(file => {
    let path = 'c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\' + file;
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        
        // Remove old injected premium scripts if re-running
        content = content.replace(/<!-- Premium Effects CSS -->[\s\S]*?<\/style>/i, '');
        content = content.replace(/<!-- Premium Effects Scripts -->[\s\S]*?<\/script>/gi, '');
        
        // Inject CSS before </head>
        content = content.replace('</head>', cssToInject + '\n</head>');
        
        // Inject JS before </body>
        content = content.replace('</body>', jsToInject + '\n</body>');
        
        // Inject particles div inside <header class="hero">
        if (file === 'index.html') {
             // Remove it if it exists already
             content = content.replace(/<div id="particles-js"><\/div>/g, '');
             content = content.replace(/<header class="hero">/i, '<header class="hero">\n        <div id="particles-js"></div>');
        }

        fs.writeFileSync(path, content, 'utf8');
        console.log('Applied premium effects to ' + file);
    }
});
