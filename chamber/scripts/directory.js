const url = 'data/members.json';
const container = document.querySelector('#memberContainer');
const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');

// 1. Función asincrónica para obtener los datos
async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al cargar los datos del JSON');
    }
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = `<p class="error">No se pudo cargar el directorio en este momento.</p>`;
  }
}

// 2. Función para renderizar las tarjetas/filas
function displayMembers(members) {
  container.innerHTML = ""; // Limpiar contenedor

  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');
    
    // Convertir nivel de membresía numérico a texto legible
    let levelText = "Miembro";
    if (member.membership_level === 2) levelText = "Plata (Silver)";
    if (member.membership_level === 3) levelText = "Oro (Gold)";

    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo de ${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p class="category"><strong>${member.category}</strong></p>
      <p class="address"> ${member.address}</p>
      <p class="phone"> ${member.phone}</p>
      <span class="badge level-${member.membership_level}">${levelText}</span>
      <a href="${member.website}" target="_blank" rel="noopener">Visitar Sitio Web</a>
    `;
    container.appendChild(card);
  });
}

// 3. Eventos para cambiar de vista (Toggle Grid/List)
gridBtn.addEventListener('click', () => {
  container.classList.add('grid-view');
  container.classList.remove('list-view');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list-view');
  container.classList.remove('grid-view');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

// Llamada inicial
getMembers();