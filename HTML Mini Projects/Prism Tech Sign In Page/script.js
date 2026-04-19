/**
 * 1. PARTICLE BACKGROUND
 */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y;
        this.directionX = directionX; this.directionY = directionY;
        this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#a29bfe';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#a29bfe'));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particlesArray.forEach(p => p.update());
    connect();
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + 
                           ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacity = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(162, 155, 254, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; init(); });
init(); animate();

/**
 * 2. 3D TILT EFFECT
 */
const card = document.getElementById('card');
document.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
document.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.5s ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

/**
 * 3. PASSWORD SHOW/HIDE
 */
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

/**
 * 4. VALIDATION LOGIC
 */
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const feedbackMsg = document.getElementById('feedback-msg');
const mainBtn = document.getElementById('main-btn');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userVal = usernameInput.value.trim();
    const passVal = passwordInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // RULE 1: Check if any field is blank
    if (userVal === "" || passVal === "") {
        feedbackMsg.textContent = "Please fill all fields";
        feedbackMsg.style.color = "#ff7675"; // Error color
        return;
    }

    // RULE 2: Check for valid email format
    if (!emailRegex.test(userVal)) {
        feedbackMsg.textContent = "Enter a valid username (e.g. abc@gmail.com)";
        feedbackMsg.style.color = "#ff7675";
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
    } else {
        // RULE 3: Success
        feedbackMsg.textContent = "Signed in Successfully!";
        feedbackMsg.style.color = "#55efc4"; // Success color
        mainBtn.textContent = "Welcome!";
        mainBtn.disabled = true;
        mainBtn.style.opacity = "0.7";
    }
});

// Reset feedback message when user starts typing
[usernameInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => feedbackMsg.textContent = "");
});

/**
 * 5. SIGN UP TOGGLE (Visual Only)
 */
const toggleBtn = document.getElementById('toggle-btn');
const title = document.getElementById('form-title');

toggleBtn.addEventListener('click', () => {
    if(toggleBtn.innerText === 'Sign Up') {
        title.innerText = "Create Account";
        toggleBtn.innerText = "Sign In";
        mainBtn.innerText = "Register";
    } else {
        title.innerText = "Welcome Back";
        toggleBtn.innerText = "Sign Up";
        mainBtn.innerText = "Sign In";
    }
});