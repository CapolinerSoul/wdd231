import { drawings } from '../data/drawings.mjs';

// Función para renderizar la grilla en el DOM
function renderGrid() {
  // Buscamos el contenedor en el HTML (asegurate de tener un <div id="grid-container"></div>)
  const container = document.getElementById('gallery-container');
  if (!container) return;

  // Aplicamos la clase de la grilla al contenedor
  container.className = 'drawings-grid';

  // Recorremos el arreglo de dibujos y creamos los elementos
  drawings.forEach(drawing => {
    const figure = document.createElement('figure');
    figure.className = 'drawing-card';

    figure.innerHTML = `
      <img src="${drawing.image}" alt="${drawing.name}" loading="lazy">
      <figcaption>
        <h3>${drawing.name}</h3>
        <time datetime="${drawing.date}">Fecha: ${drawing.date}</time>
      </figcaption>
    `;

    container.appendChild(figure);
  });
}

// Ejecutamos la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderGrid);