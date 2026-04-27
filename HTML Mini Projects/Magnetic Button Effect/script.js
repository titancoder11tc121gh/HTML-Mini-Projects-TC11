const magnetBtn = document.getElementById('magnet');
const btnText = magnetBtn.querySelector('.btn-text');

// Magnetic radius in pixels
const triggerDistance = 150; 

document.addEventListener('mousemove', (e) => {
    const rect = magnetBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    // Efficient Math.hypot distance calculation
    const distance = Math.hypot(distX, distY);

    // Tracking in magnetic field
    if (distance < triggerDistance) {
        
        // Disable transition for instant tracking
        magnetBtn.style.transition = 'none';
        btnText.style.transition = 'none';

        const pullX = distX * 0.4;
        const pullY = distY * 0.4;

        // Calculate pull and apply parallax
        magnetBtn.style.transform = `translate(${pullX}px, ${pullY}px)`;
        btnText.style.transform = `translate(${pullX * 0.3}px, ${pullY * 0.3}px)`;
        
    } else {
        // Restore transition and reset position
        magnetBtn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        btnText.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Snap back precisely to center
        magnetBtn.style.transform = 'translate(0px, 0px)';
        btnText.style.transform = 'translate(0px, 0px)';
    }
});