document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.getElementById("hambutton");
    const navMenu = document.querySelector("nav");

    hamButton.addEventListener("click", () => {
        // Alterna la clase 'show' para mostrar/ocultar el menú
        navMenu.classList.toggle("show");
        
        // Alterna la clase 'open' para cambiar el icono de ☰ a ✕
        hamButton.classList.toggle("open");
    });
});