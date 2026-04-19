document.addEventListener('mousemove', function(e) {
    // 1. Create a new div element
    let particle = document.createElement('div');
    particle.classList.add('particle');

    // 2. Randomize the size of each spark (between 5px and 20px)
    let size = Math.random() * 15 + 5; 
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // 3. Position the spark exactly at the mouse coordinates
    // Subtracting size/2 centers the circle right on the tip of the cursor
    particle.style.left = (e.clientX - size / 2) + 'px';
    particle.style.top = (e.clientY - size / 2) + 'px';

    // 4. Randomize the glow color (Hue range 160 to 220 = Cyans to Blues)
    let hue = Math.random() * 60 + 160; 
    particle.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 50%), 0 0 20px hsl(${hue}, 100%, 50%)`;

    // 5. Append the spark to the web page
    document.body.appendChild(particle);

    // 6. Clean up: Delete the element from the DOM after the CSS animation finishes (800ms)
    setTimeout(() => {
        particle.remove();
    }, 800);
});