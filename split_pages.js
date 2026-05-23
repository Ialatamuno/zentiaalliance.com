const fs = require('fs');

const html = fs.readFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\index.html', 'utf8');

// Helper to extract sections by ID or Class
function extractSection(html, idOrClass) {
    const regex = new RegExp(`<section[^>]*?(?:id="${idOrClass}"|class="${idOrClass}")[^>]*>[\\s\\S]*?<\\/section>`, 'i');
    const match = html.match(regex);
    return match ? match[0] : '';
}

// Extract Common Parts
const headMatch = html.match(/<!DOCTYPE html>[\s\S]*?<body>/i);
const head = headMatch ? headMatch[0] : '';

const navMatch = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
let nav = navMatch ? navMatch[0] : '';

const footerMatch = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
const footer = footerMatch ? footerMatch[0] : '';

const scriptMatch = html.match(/<script>[\s\S]*?<\/script>\s*<\/body>\s*<\/html>/i);
let script = scriptMatch ? scriptMatch[0] : '';

// Extract Sections
const heroMatch = html.match(/<header class="hero">[\s\S]*?<\/header>/i);
const hero = heroMatch ? heroMatch[0] : '';

const sectionNosotros = extractSection(html, 'nosotros');
const sectionDivisiones = extractSection(html, 'divisiones');
const sectionWhy = extractSection(html, 'why-section');
const sectionPartners = extractSection(html, 'partners');
const sectionContacto = extractSection(html, 'contacto');

// Update Nav Links
nav = nav.replace(/href="#"(.*?)>Inicio/g, 'href="index.html"$1>Inicio');
nav = nav.replace(/href="#nosotros"/g, 'href="nosotros.html"');
nav = nav.replace(/href="#divisiones"/g, 'href="divisiones.html"');
nav = nav.replace(/href="#partners"/g, 'href="partners.html"');
nav = nav.replace(/href="#contacto"/g, 'href="contacto.html"');

// Fix translation logic for multiple pages (remove active classes dynamically)
script = script.replace(
    /const navbar = document\.getElementById\('navbar'\);/g,
    `
    // Auto-set active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === currentPath) {
            a.classList.add('active');
        }
    });
    
    const navbar = document.getElementById('navbar');`
);

// We need to create a helper to build the page
function buildPage(content, titleAdd) {
    let newHead = head.replace('<title>Zentia Alliance | Conectando América Latina con Corea</title>', `<title>Zentia Alliance | ${titleAdd}</title>`);
    return `${newHead}\n${nav}\n<main style="padding-top: 90px; min-height: 80vh;">\n${content}\n</main>\n${footer}\n${script}`;
}

// 1. Index (Home)
// We keep Hero and Why Section
let indexHero = hero.replace(/href="#divisiones"/g, 'href="divisiones.html"').replace(/href="#partners"/g, 'href="partners.html"');
let indexContent = `${indexHero}\n${sectionWhy}`;
// The main tag padding for index shouldn't exist because of hero
let newHeadIndex = head;
let indexHtml = `${newHeadIndex}\n${nav}\n${indexContent}\n${footer}\n${script}`;
fs.writeFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\index.html', indexHtml, 'utf8');

// 2. Nosotros
fs.writeFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\nosotros.html', buildPage(sectionNosotros, 'Nosotros'), 'utf8');

// 3. Divisiones
fs.writeFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\divisiones.html', buildPage(sectionDivisiones, 'Divisiones'), 'utf8');

// 4. Partners
fs.writeFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\partners.html', buildPage(sectionPartners, 'Strategic Partners'), 'utf8');

// 5. Contacto
fs.writeFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\contacto.html', buildPage(sectionContacto, 'Contacto'), 'utf8');

console.log('Site successfully split into multiple pages.');
