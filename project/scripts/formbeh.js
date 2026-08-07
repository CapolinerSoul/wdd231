  document.getElementById('commissionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            let output = '';
            
            const keysMapping = {
                'username': 'USERNAME / ALIAS',
                'email': 'EMAIL ADDRESS',
                'company': 'COMPANY NAME',
                'commission_type': 'COMMISSION TYPE',
                'additional_characters': 'ADDITIONAL CHARACTERS',
                'complex_background': 'COMPLEX BACKGROUND',
                'nsfw': 'NSFW REQUEST',
                'description': 'DESCRIPTION'
            };

            formData.forEach((value, key) => {
                if (value.trim() !== '') {
                    output += `<div class="summary-item"><strong>${keysMapping[key]}:</strong> ${value}</div>`;
                }
            });

            if (!formData.has('company') || formData.get('company').trim() === '') {
                output += `<div class="summary-item"><strong>COMPANY NAME:</strong> N/A</div>`;
            }
            if (!formData.has('additional_characters') || formData.get('additional_characters') === '') {
                output += `<div class="summary-item"><strong>ADDITIONAL CHARACTERS:</strong> 0</div>`;
            }
            if (!formData.has('complex_background')) {
                output += `<div class="summary-item"><strong>COMPLEX BACKGROUND:</strong> No</div>`;
            }
            if (!formData.has('nsfw')) {
                output += `<div class="summary-item"><strong>NSFW REQUEST:</strong> No</div>`;
            }

            document.getElementById('summary-content').innerHTML = output;
            document.getElementById('action-page').style.display = 'block';
            
            document.getElementById('action-page').scrollIntoView({ behavior: 'smooth' });
        });

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('tierSpecsModal');
    const openBtn = document.getElementById('openSpecsBtn');
    const closeBtn = document.getElementById('closeSpecsBtn');
    const modalBody = document.getElementById('modalBody');

    let isDataLoaded = false;

    async function loadTierData() {
        try {
            const response = await fetch('data/info.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const tiers = await response.json();
            
            modalBody.innerHTML = '';

            // Construimos e inyectamos el HTML dinámicamente para cada objeto del JSON
            tiers.forEach(tier => {
                const tierElement = document.createElement('div');
                tierElement.classList.add('tier-spec');
                tierElement.innerHTML = `
                    <h3>${tier.title}</h3>
                    <p>${tier.description}</p>
                `;
                modalBody.appendChild(tierElement);
            });

            isDataLoaded = true;
        } catch (error) {
            console.error('Error fetching the tier data:', error);
            modalBody.innerHTML = `<p style="color: var(--accent-color);">Failed to load commission descriptions. Please try again later.</p>`;
        }
    }


    openBtn.addEventListener('click', async () => {
        modal.showModal();
        
        if (!isDataLoaded) {
            await loadTierData();
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });
});
