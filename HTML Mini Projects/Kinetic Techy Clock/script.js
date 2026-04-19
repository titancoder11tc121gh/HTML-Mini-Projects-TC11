function updateClock() {
    const now = new Date();
    
    // Get Time Units
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    
    // Update Digital Display
    document.getElementById('hours').textContent = h.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = s.toString().padStart(2, '0');

    // Calculate Rotation
    // 360 degrees / 60 seconds = 6 deg per second
    const sDeg = s * 6;
    const mDeg = (m * 6) + (s * 0.1); // Smooth transition
    const hDeg = (h * 30) + (m * 0.5); // Smooth transition

    // Rotate Rings
    document.getElementById('sec-ring').style.transform = `rotate(${sDeg}deg)`;
    document.getElementById('min-ring').style.transform = `rotate(${mDeg}deg)`;
    document.getElementById('hr-ring').style.transform = `rotate(${hDeg}deg)`;

    // Update Date
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('en-US', options);

    // Feature: Dynamic Background based on hour
    const body = document.body;
    if (h >= 6 && h < 18) {
        body.style.background = "#0a0a12"; // Day Mode
    } else {
        body.style.background = "#050508"; // Night Mode
    }
}

// 3D Tilt for the container
const container = document.querySelector('.clock-container');
document.addEventListener('mousemove', (e) => {
    let x = (window.innerWidth / 2 - e.pageX) / 30;
    let y = (window.innerHeight / 2 - e.pageY) / 30;
    container.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call