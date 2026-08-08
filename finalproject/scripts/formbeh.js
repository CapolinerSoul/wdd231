// --- 1. SCRIPT DE INTERACCIÓN DEL MODAL (FETCH DEL JSON) ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('tierSpecsModal');
    const openBtn = document.getElementById('openSpecsBtn');
    const closeBtn = document.getElementById('closeSpecsBtn');
    const modalBody = document.getElementById('modalBody');

    let isDataLoaded = false;

    // Si el modal no existe en esta página (ej: en action.html), frena el script
    if (!modal || !openBtn) return;

    async function loadTierData() {
        try {
            const response = await fetch('data/info.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const tiers = await response.json();
            modalBody.innerHTML = '';

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


// --- 2. SCRIPT DE LOCAL STORAGE Y ENVÍO DEL FORMULARIO ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('commissionForm');
    
    // Si el formulario no existe en la página actual, frena el script
    if (!form) return;

    const formFields = [
        'username',
        'email',
        'company',
        'commission_type',
        'additional_characters',
        'complex_background',
        'nsfw',
        'description'
    ];

    function loadSavedFormData() {
        const savedData = localStorage.getItem('capoliner_commission_draft');
        if (!savedData) return;

        try {
            const data = JSON.parse(savedData);
            
            formFields.forEach(fieldId => {
                const element = document.getElementById(fieldId);
                if (!element) return;

                if (element.type === 'checkbox') {
                    element.checked = !!data[fieldId];
                } else {
                    if (data[fieldId] !== undefined) {
                        element.value = data[fieldId];
                    }
                }
            });
            console.log('Draft successfully restored from Local Storage.');
        } catch (error) {
            console.error('Error parsing saved local storage data:', error);
        }
    }

    function saveFormData() {
        const dataToSave = {};
        
        formFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (!element) return;

            if (element.type === 'checkbox') {
                dataToSave[fieldId] = element.checked;
            } else {
                dataToSave[fieldId] = element.value;
            }
        });

        localStorage.setItem('capoliner_commission_draft', JSON.stringify(dataToSave));
    }

    // Inicializa la carga del borrador y el guardado en tiempo real
    loadSavedFormData();
    form.addEventListener('input', saveFormData);

    // CONTROL DE ENVÍO REPARADO: 
    // No usamos e.preventDefault() para permitir que viaje de verdad a action.html
    form.addEventListener('submit', () => {
        localStorage.removeItem('capoliner_commission_draft');
    });
});
