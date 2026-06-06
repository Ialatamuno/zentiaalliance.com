const fs = require('fs');

const files = ['index.html', 'nosotros.html', 'divisiones.html', 'partners.html', 'contacto.html'];

const replacements = [
    { from: /\/\/ Translations Dictionary/g, to: '// Diccionario de Traducciones: Almacena los textos en distintos idiomas' },
    { from: /\/\/ Scroll interactions/g, to: '// Interacciones de Desplazamiento (Scroll): Cambia el estilo del menú al bajar' },
    { from: /\/\/ Auto-set active nav link/g, to: '// Auto-seleccionar enlace activo: Resalta en el menú la página actual' },
    { from: /\/\/ Intersection Observer for scroll animations/g, to: '// Observador de Intersección: Activa animaciones cuando los elementos entran en pantalla' },
    { from: /\/\/ Tab Switching for Partners/g, to: '// Cambio de Pestañas (Tabs): Lógica para mostrar/ocultar el contenido de los partners' },
    { from: /\/\/ Hide all tab contents/g, to: '// Ocultar todo el contenido de las pestañas' },
    { from: /\/\/ Remove active class from all buttons/g, to: '// Quitar la clase "active" de todos los botones' },
    { from: /\/\/ Show selected tab content/g, to: '// Mostrar el contenido de la pestaña seleccionada' },
    { from: /\/\/ Add active class to clicked button/g, to: '// Agregar la clase "active" al botón clickeado' },
    { from: /\/\/ Language Switching Engine/g, to: '// Motor de Cambio de Idioma: Maneja la lógica de traducción de la página' },
    { from: /\/\/ Toggle active classes on language buttons/g, to: '// Alternar clases "active" en los botones selectores de idioma' },
    { from: /\/\/ Apply fade transition for smooth premium feel/g, to: '// Aplicar transición de desvanecimiento (fade) para un efecto visual suave y moderno' },
    { from: /\/\/ Update standard translatable texts/g, to: '// Actualizar los textos estándar que requieren traducción' },
    { from: /\/\/ Update input\/textarea placeholders/g, to: '// Actualizar los textos de ayuda (placeholders) en campos de formulario' },
    { from: /\/\/ Remove fade-out to trigger smooth fade-in/g, to: '// Quitar la clase "fade-out" para activar la transición de aparición (fade-in)' },
    { from: /\/\/ Initialize Language on load/g, to: '// Inicializar Idioma al Cargar: Configura el idioma correcto apenas carga la página' },
    { from: /\/\/ Form Submission \(Simulated\)/g, to: '// Envío de Formulario (Simulado): Captura el envío y muestra un mensaje de confirmación' },
    // Also some CSS comments that might exist
    { from: /\/\* Contact Section \*\//g, to: '/* Sección de Contacto */' },
    { from: /\/\* Form \*\//g, to: '/* Formulario */' },
    { from: /\/\* Footer \*\//g, to: '/* Pie de página (Footer) */' },
    { from: /\/\* Responsive \*\//g, to: '/* Reglas Responsive (Adaptación para móviles) */' }
];

files.forEach(file => {
    let path = 'c:\\Users\\Usuario\\OneDrive\\Documents\\sitionuevo\\' + file;
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        replacements.forEach(r => {
            content = content.replace(r.from, r.to);
        });
        fs.writeFileSync(path, content, 'utf8');
        console.log('Translated comments in ' + file);
    }
});
