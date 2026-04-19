const card = document.getElementById('card');

// Listen for mouse movement over the card
card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    
    // Find mouse position relative to the card's top-left corner
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    // Find the center point of the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate how much to rotate (max 20 degrees)
    const rotateX = ((y - centerY) / centerY) * -20; 
    const rotateY = ((x - centerX) / centerX) * 20;
    
    // Apply the 3D rotation
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Snap back to normal when the mouse leaves
card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card.style.transition = `transform 0.5s ease`; // Smooth transition back
});

// Remove transition when hovering so it tracks perfectly with the mouse
card.addEventListener('mouseenter', () => {
    card.style.transition = `none`; 
});