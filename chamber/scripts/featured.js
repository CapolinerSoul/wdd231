const urlFeatured = 'data/members.json';
const featuredContainer = document.querySelector('#featuredContainer');

async function getFeaturedMembers() {
  try {
    const response = await fetch(urlFeatured);
    if (!response.ok) throw new Error('Error al cargar destacados');
    
    const data = await response.json();
    
    const eligibleMembers = data.filter(member => 
      member.membership_level === 2 || member.membership_level === 3
    );

    const selectedMembers = getRandomMembers(eligibleMembers, 2);


    displayFeatured(selectedMembers);
  } catch (error) {
    console.error('Error en destacados:', error);
    if (featuredContainer) {
      featuredContainer.innerHTML = `<p class="error">Unable to load members.</p>`;
    }
  }
}

function getRandomMembers(arr, count) {

  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function displayFeatured(members) {
  if (!featuredContainer) return;
  featuredContainer.innerHTML = ""; 

  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card', 'featured-card'); // Extra class just in case.
    
    let levelText = member.membership_level === 3 ? "Oro (Gold)" : "Plata (Silver)";

    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo de ${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p class="category"><strong>${member.category}</strong></p>
      <p class="address">${member.address}</p>
      <p class="phone">${member.phone}</p>
      <span class="badge level-${member.membership_level}">${levelText}</span>
      <a href="${member.website}" target="_blank" rel="noopener">Visitar Sitio Web</a>
    `;
    featuredContainer.appendChild(card);
  });
}

getFeaturedMembers();
