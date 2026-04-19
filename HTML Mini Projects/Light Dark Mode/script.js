const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('change', () => {
    // Toggles the dark-theme class on and off the whole page
    document.body.classList.toggle('dark-theme');
});