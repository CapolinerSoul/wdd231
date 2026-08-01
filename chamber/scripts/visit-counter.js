const visitContainer = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastChamberVisit');
const currentTimestamp = Date.now();

const ONE_DAY_MS = 86400000; 

if (!lastVisit) {
    // Caso 1: Primera visita del usuario
    visitContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentTimestamp - parseInt(lastVisit, 10);

    if (timeDifference < ONE_DAY_MS) {

        visitContainer.textContent = "Back so soon! Awesome!";
    } else {

        const daysBetween = Math.floor(timeDifference / ONE_DAY_MS);
        
        if (daysBetween === 1) {
            visitContainer.textContent = "You last visited 1 day ago.";
        } else {
            visitContainer.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }
}

localStorage.setItem('lastChamberVisit', currentTimestamp);
