document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('form-timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const openButtons = document.querySelectorAll('button[data-modal]');
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.showModal();
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const openModal = button.closest('dialog');
            if (openModal) {
                openModal.close();
            }
        });
    });
});
