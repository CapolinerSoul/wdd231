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
                // Time for transition. AI used for assistance to solve that.
                setTimeout(() => {
                    targetModal.classList.add('modal-visible');
                }, 10);
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const openModal = button.closest('dialog');
            if (openModal) {
                openModal.classList.remove('modal-visible');
                //  Time for transition. AI used for assistance to solve that.
                setTimeout(() => {
                    openModal.close();
                }, 400);
            }
        });
    });
});
