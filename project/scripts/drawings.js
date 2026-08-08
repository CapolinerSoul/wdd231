import { drawings } from '../data/drawings.mjs';

function renderGrid() {

  const container = document.getElementById('gallery-container');
  if (!container) return;

  container.className = 'drawings-grid';

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

document.addEventListener('DOMContentLoaded', renderGrid);