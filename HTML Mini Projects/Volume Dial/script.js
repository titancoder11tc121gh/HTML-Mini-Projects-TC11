const dial = document.getElementById('dial');
const ledRing = document.getElementById('led-ring');
const volText = document.getElementById('vol-text');
const coreGlow = document.getElementById('core-glow');
const indicator = document.getElementById('indicator');

// 1. Generate the LED Ring
const numLeds = 45;
const leds = [];

for (let i = 0; i < numLeds; i++) {
    const led = document.createElement('div');
    led.classList.add('led');
    const angle = -135 + (i * (270 / (numLeds - 1)));
    led.style.transform = `rotate(${angle}deg)`;
    ledRing.appendChild(led);
    leds.push({ element: led, index: i });
}

// 2. The Dragging Logic
let isDragging = false;

dial.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    let deg = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (deg > 180) deg -= 360;
    if (deg > 135) deg = 135;
    if (deg < -135) deg = -135;

    dial.style.transform = `rotate(${deg}deg)`;

    let percentage = Math.round(((deg + 135) / 270) * 100);
    volText.innerText = percentage;

    // --- THE COLOR WIZARDRY ---
    // Shift from Cyan (Hue 180) to Red (Hue 0) based on volume
    const currentHue = 180 - (percentage * 1.8); 
    const currentColor = `hsl(${currentHue}, 100%, 50%)`;

    // 1. Update text color and glow
    volText.style.color = currentColor;
    volText.style.textShadow = `0 0 25px ${currentColor}`;

    // 2. Update the ambient core glow
    coreGlow.style.boxShadow = `0 0 ${percentage}px ${currentColor}`;
    
    // 3. Update the dot on the dial
    indicator.style.background = currentColor;
    indicator.style.boxShadow = `0 0 10px ${currentColor}, inset 0 0 5px #fff`;

    // 4. Light up the LED gradient
    const activeCount = Math.round((percentage / 100) * numLeds);
    
    leds.forEach(led => {
        if (led.index < activeCount) {
            // Calculate a fixed color for this specific LED's position to form a beautiful gradient curve
            const ledPercent = (led.index / numLeds) * 100;
            const ledHue = 180 - (ledPercent * 1.8);
            led.element.style.background = `hsl(${ledHue}, 100%, 50%)`;
            led.element.style.boxShadow = `0 0 10px hsl(${ledHue}, 100%, 50%)`;
        } else {
            led.element.style.background = '#1c1d26';
            led.element.style.boxShadow = 'none';
        }
    });
});