const blob = document.getElementById('blob');
const btn = document.querySelector('.magic-btn');

// Track the mouse and move the blob
document.addEventListener('mousemove', (e) => {
    blob.style.left = e.clientX + 'px';
    blob.style.top = e.clientY + 'px';
});

// When hovering over the button, make the cursor blob expand to merge fully
btn.addEventListener('mouseenter', () => {
    blob.style.width = '120px';
    blob.style.height = '120px';
});

// When the mouse leaves, shrink it back down to a normal cursor size
btn.addEventListener('mouseleave', () => {
    blob.style.width = '30px';
    blob.style.height = '30px';
});