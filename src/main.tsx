
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Asegurarse de que la aplicación se monte correctamente, independientemente de la URL base
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error("No se encontró el elemento root para montar la aplicación");
}
