
// Este archivo no es parte del código fuente de la aplicación
// Es un script de utilidad para desplegar a GitHub Pages

const ghpages = require('gh-pages');
const path = require('path');

// Configura las opciones de despliegue
const options = {
  branch: 'gh-pages',
  repo: process.env.GITHUB_REPOSITORY || 'https://github.com/username/tupromptperfecto.git', // Reemplazar con el repositorio real
  message: 'Auto-deploy from GitHub Actions',
  dotfiles: true, // Incluir archivos que comienzan con punto, como .nojekyll
};

// Ruta al directorio de compilación
const dir = path.join(process.cwd(), 'dist');

// Función para desplegar
function deploy() {
  console.log('Iniciando despliegue a GitHub Pages...');
  
  // Crear un archivo .nojekyll para evitar problemas con Jekyll
  require('fs').writeFileSync(path.join(dir, '.nojekyll'), '');
  
  // Asegurarse de que el archivo CNAME se copie a la carpeta dist
  require('fs').copyFileSync(
    path.join(process.cwd(), 'CNAME'),
    path.join(dir, 'CNAME')
  );

  // Desplegar a GitHub Pages
  ghpages.publish(dir, options, (err) => {
    if (err) {
      console.error('Error durante el despliegue:', err);
      process.exit(1);
    } else {
      console.log('¡Despliegue completado con éxito!');
    }
  });
}

// Ejecutar la función de despliegue
deploy();
