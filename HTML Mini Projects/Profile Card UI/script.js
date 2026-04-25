const card = document.getElementById('card');

// 1. 3D Tilt Effect
document.addEventListener('mousemove', (e) => {
    let x = (window.innerWidth / 2 - e.pageX) / 20;
    let y = (window.innerHeight / 2 - e.pageY) / 20;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// 2. Follow Button Toggle
function toggleFollow() {
    const btn = document.querySelector('.follow-btn');
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        btn.innerText = "Following";
    } else {
        btn.innerText = "Follow";
    }
}

// 3. Hover Image Interaction
card.addEventListener('mouseenter', () => {
    document.getElementById('profile-img').style.transform = "scale(1.1) rotate(5deg)";
});
card.addEventListener('mouseleave', () => {
    document.getElementById('profile-img').style.transform = "scale(1) rotate(0deg)";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
