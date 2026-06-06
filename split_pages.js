const fs = require('fs');

// ==========================================
// 1. CARGA DEL ARCHIVO ORIGINAL
// ==========================================
// Se lee el contenido completo del archivo 'index.html' original.
// Se asume que este archivo contiene todo el sitio (One-Page) antes de ser dividido.
const html = fs.readFileSync('c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\index.html', 'utf8');

// ==========================================
// 2. FUNCIÓN AUXILIAR DE EXTRACCIÓN
// ==========================================
// Función que extrae una sección específica del HTML usando expresiones regulares.
// Busca una etiqueta <section> que coincida con un "id" o "class" dado.
function extractSection(html, idOrClass) {
    const regex = new RegExp(`<section[^>]*?(?:id="${idOrClass}"|class="${idOrClass}")[^>]*>[\\s\\S]*?<\\/section>`, 'i');
    const match = html.match(regex);
    return match ? match[0] : '';
}

// ==========================================
// 3. EXTRACCIÓN DE ELEMENTOS COMUNES
// ==========================================
// Estas variables almacenarán las partes del sitio web que se repiten en todas las páginas.

// Extraer el encabezado (<head> y el inicio del <body>).
const headMatch = html.match(/<!DOCTYPE html>[\s\S]*?<body>/i);
const head = headMatch ? headMatch[0] : '';

// Extraer la barra de navegación (<nav>).
const navMatch = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
let nav = navMatch ? navMatch[0] : '';

// Extraer el pie de página (<footer>).
const footerMatch = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
const footer = footerMatch ? footerMatch[0] : '';

// Extraer los scripts (JavaScript) ubicados antes del cierre del <body>.
const scriptMatch = html.match(/<script>[\s\S]*?<\/script>\s*<\/body>\s*<\/html>/i);
let script = scriptMatch ? scriptMatch[0] : '';

// ==========================================
// 4. EXTRACCIÓN DE LAS SECCIONES DE CONTENIDO
// ==========================================

// Extraer el Hero (el banner visual principal que suele estar arriba).
const heroMatch = html.match(/<header class="hero">[\s\S]*?<\/header>/i);
const hero = heroMatch ? heroMatch[0] : '';

// Extraer las secciones individuales utilizando nuestra función auxiliar.
const sectionNosotros = extractSection(html, 'nosotros');
const sectionDivisiones = extractSection(html, 'divisiones');
const sectionWhy = extractSection(html, 'why-section');
const sectionPartners = extractSection(html, 'partners');
const sectionContacto = extractSection(html, 'contacto');

// ==========================================
// 5. ADAPTACIÓN DE CÓDIGO (ENLACES Y SCRIPTS)
// ==========================================

// Modificar la barra de navegación:
// Cambiar los enlaces de tipo ancla (ej. href="#nosotros") a enlaces de páginas individuales (ej. href="nosotros.html").
nav = nav.replace(/href="#"(.*?)>Inicio/g, 'href="index.html"$1>Inicio');
nav = nav.replace(/href="#nosotros"/g, 'href="nosotros.html"');
nav = nav.replace(/href="#divisiones"/g, 'href="divisiones.html"');
nav = nav.replace(/href="#partners"/g, 'href="partners.html"');
nav = nav.replace(/href="#contacto"/g, 'href="contacto.html"');

// Modificar el script de JavaScript base:
// Se agrega un fragmento de código que detecta en qué página está el usuario 
// actualmente y le asigna la clase "active" al botón correcto del menú.
script = script.replace(
    /const navbar = document\.getElementById\('navbar'\);/g,
    `
    // Código inyectado: auto-seleccionar el enlace activo del menú de navegación
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === currentPath) {
            a.classList.add('active');
        }
    });
    
    const navbar = document.getElementById('navbar');`
);

// ==========================================
// 6. FUNCIÓN ENSAMBLADORA DE PÁGINAS
// ==========================================
// Toma el contenido de una sección extraída y la ensambla junto con el head, nav, footer y scripts,
// retornando el HTML completo listo para guardarse.
function buildPage(content, titleAdd) {
    // Se actualiza la etiqueta <title> para que refleje el nombre de la página específica.
    let newHead = head.replace('<title>Zentia Alliance | Conectando América Latina con Corea</title>', `<title>Zentia Alliance | ${titleAdd}</title>`);
    return `${newHead}\n${nav}\n<main style="padding-top: 90px; min-height: 80vh;">\n${content}\n</main>\n${footer}\n${script}`;
}

// ==========================================
// 7. CREACIÓN Y GUARDADO DE ARCHIVOS FINALES
// ==========================================

// 1. Index (Página de Inicio)
// Combina el Hero actualizado y la sección "Por qué elegirnos" (Why Section).
let indexHero = hero.replace(/href="#divisiones"/g, 'href="divisiones.html"').replace(/href="#partners"/g, 'href="partners.html"');
let indexContent = `${indexHero}\n${sectionWhy}`;
let newHeadIndex = head;
// Se arma la página principal sin la etiqueta <main> con padding extra para que el Hero ocupe toda la pantalla arriba.
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

// Mensaje en consola indicando éxito.
console.log('El sitio web se ha dividido exitosamente en múltiples páginas.');
