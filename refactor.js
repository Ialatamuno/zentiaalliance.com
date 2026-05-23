const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\index.html', 'utf8');

// 1. Fonts
html = html.replace(
    'family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans',
    'family=Outfit:wght@300;400;500;600;700&family=DM+Sans'
);

// 2. CSS variables and generic styles
html = html.replace(
    /        :root \{[\s\S]*?--shadow:[^\}]+\}/,
    `        :root {
            --color-fondo: #060816;
            --color-azul-marino: #0A0F24;
            --color-azul-medio: #0f172a;
            --color-acento: #00C2FF;
            --color-acento-2: #2563EB;
            --color-gris-claro: #0A0F24;
            --color-gris-medio: #94A3B8;
            --color-texto: #F8FAFC;
            --color-blanco: #FFFFFF;
            --border-color: rgba(255, 255, 255, 0.08);
            --transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            --shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        }`
);

html = html.replace(
    /        h1, h2, h3, h4, \.display-font \{[\s\S]*?color: var\(--color-azul-marino\);\r?\n        \}/,
    `        h1, h2, h3, h4, .display-font {
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            color: var(--color-texto);
            letter-spacing: -0.02em;
        }`
);

// 3. Navbar
html = html.replace(
    /        nav \{[\s\S]*?transition: var\(--transition\);\r?\n        \}/,
    `        nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 90px;
            background-color: rgba(6, 8, 22, 0.75);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            z-index: 1000;
            transition: var(--transition);
        }`
);

// 4. Logo invert
html = html.replace(
    /        \.logo img \{[\s\S]*?object-fit: contain;\r?\n        \}/,
    `        .logo img {
            max-height: 35px;
            width: auto;
            object-fit: contain;
            filter: grayscale(1) invert(1) brightness(1.5);
            mix-blend-mode: screen;
        }`
);
html = html.replace(
    /        \.footer-logo img \{[\s\S]*?display: block;\r?\n        \}/,
    `        .footer-logo img {
            max-height: 45px;
            width: auto;
            object-fit: contain;
            margin: 0 auto;
            display: block;
            filter: grayscale(1) invert(1) brightness(1.5);
            mix-blend-mode: screen;
        }`
);

// 5. Buttons
html = html.replace(
    /        \.btn-filled \{[\s\S]*?border: 1px solid var\(--color-acento\);\r?\n        \}/,
    `        .btn-filled {
            background: linear-gradient(135deg, var(--color-acento-2), var(--color-acento));
            color: var(--color-blanco);
            border: none;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }`
);
html = html.replace(
    /        \.btn-filled:hover \{[\s\S]*?color: var\(--color-acento\);\r?\n        \}/,
    `        .btn-filled:hover {
            background: linear-gradient(135deg, var(--color-acento), var(--color-acento-2));
            color: var(--color-blanco);
            box-shadow: 0 6px 20px rgba(0, 194, 255, 0.4);
            transform: translateY(-2px);
        }`
);
html = html.replace(
    /        \.btn-outline \{[\s\S]*?border: 1px solid var\(--color-blanco\);\r?\n        \}/,
    `        .btn-outline {
            background-color: transparent;
            color: var(--color-blanco);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }`
);
html = html.replace(
    /        \.btn-outline:hover \{[\s\S]*?color: var\(--color-azul-marino\);\r?\n        \}/,
    `        .btn-outline:hover {
            background-color: rgba(0, 194, 255, 0.05);
            color: var(--color-acento);
            border-color: var(--color-acento);
        }`
);

// 6. Hero background
html = html.replace(
    /linear-gradient\(rgba\(11, 30, 61, 0\.55\), rgba\(11, 30, 61, 0\.55\)\), url\('seoul_hero\.png'\)/,
    `linear-gradient(rgba(6, 8, 22, 0.6), rgba(6, 8, 22, 0.9)), url('assets/seoul_tech_hero.png')`
);

// 7. Cards
html = html.replace(
    /        \.division-card \{[\s\S]*?gap: 20px;\r?\n        \}/,
    `        .division-card {
            background-color: rgba(255, 255, 255, 0.02);
            padding: 60px;
            border: 1px solid var(--border-color);
            border-left: 2px solid var(--color-acento-2);
            box-shadow: var(--shadow);
            transition: var(--transition);
            display: flex;
            flex-direction: column;
            gap: 20px;
            border-radius: 4px;
            backdrop-filter: blur(10px);
        }`
);
html = html.replace(
    /        \.division-card:hover \{[\s\S]*?border-left-width: 8px;\r?\n        \}/,
    `        .division-card:hover {
            transform: translateY(-4px);
            border-left-color: var(--color-acento);
            background-color: rgba(255, 255, 255, 0.04);
            box-shadow: 0 10px 30px rgba(0, 194, 255, 0.1);
            border-color: rgba(0, 194, 255, 0.2);
        }`
);

// 8. Sections that were white/light
html = html.replace(
    /        \.why-section \{\r?\n            background-color: var\(--color-blanco\);\r?\n        \}/,
    `        .why-section {
            background-color: var(--color-fondo);
        }`
);
html = html.replace(
    /        \.contacto \{\r?\n            background-color: var\(--color-blanco\);\r?\n        \}/,
    `        .contacto {
            background-color: var(--color-fondo);
        }`
);

// Contact form fixes for dark theme
html = html.replace(
    /        \.contact-form input, \.contact-form select, \.contact-form textarea \{[\s\S]*?transition: var\(--transition\);\r?\n        \}/,
    `        .contact-form input, .contact-form select, .contact-form textarea {
            padding: 15px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-family: 'DM Sans', sans-serif;
            font-size: 14px;
            transition: var(--transition);
            background-color: rgba(255, 255, 255, 0.03);
            color: var(--color-texto);
        }`
);
html = html.replace(
    /        \.btn-submit \{[\s\S]*?transition: var\(--transition\);\r?\n        \}/,
    `        .btn-submit {
            background: linear-gradient(135deg, var(--color-acento-2), var(--color-acento));
            color: var(--color-blanco);
            border: none;
            padding: 18px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            cursor: pointer;
            transition: var(--transition);
            border-radius: 4px;
        }`
);
html = html.replace(
    /        \.btn-submit:hover \{\r?\n            background-color: var\(--color-azul-medio\);\r?\n        \}/,
    `        .btn-submit:hover {
            box-shadow: 0 6px 20px rgba(0, 194, 255, 0.3);
            transform: translateY(-2px);
        }`
);

// Adjust Tags
html = html.replace(
    /        \.tag \{[\s\S]*?letter-spacing: 0\.05em;\r?\n        \}/,
    `        .tag {
            background-color: rgba(37, 99, 235, 0.15);
            color: var(--color-acento);
            padding: 6px 14px;
            border-radius: 100px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border: 1px solid rgba(37, 99, 235, 0.3);
        }`
);

// Footer
html = html.replace(
    /        footer \{\r?\n            background-color: var\(--color-azul-marino\);/,
    `        footer {\n            background-color: var(--color-azul-marino);`
);

fs.writeFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\index.html', html, 'utf8');
console.log('Refactor script applied.');
