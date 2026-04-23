const toggle = document.getElementById('toggle');
const amounts = document.querySelectorAll('.amount');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    const isYearly = toggle.classList.contains('active');

    amounts.forEach(amount => {
        // We get the numbers from the data attributes we set in HTML
        const monthlyPrice = parseInt(amount.getAttribute('data-monthly'));
        const yearlyPrice = parseInt(amount.getAttribute('data-yearly'));
        
        // Decide which value to animate towards
        const startValue = isYearly ? monthlyPrice : yearlyPrice;
        const endValue = isYearly ? yearlyPrice : monthlyPrice;
        
        animateValue(amount, startValue, endValue, 400);
    });
});

// Smooth Number Counter Animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Calculate current value based on progress
        const currentValue = Math.floor(progress * (end - start) + start);
        obj.innerHTML = currentValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
