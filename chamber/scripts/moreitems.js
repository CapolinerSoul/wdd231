import { itemsDeInteres } from '../data/interest.mjs';

const container = document.getElementById('cards-container');

itemsDeInteres.forEach(item => {
  const card = document.createElement('article');
  card.className = `card ${item.id}`;

  card.innerHTML = `
    <h2>${item.nombre}</h2>
    <figure>
      <img src="${item.imagen}" alt="${item.nombre}" width="300" height="200">
    </figure>
    <address>${item.direccion}</address>
    <p>${item.descripcion}</p>
    <button type="button">learn more</button>
  `;

  container.appendChild(card);
});
