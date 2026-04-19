const world = document.getElementById('world');
const player = document.getElementById('player');
const scoreEl = document.getElementById('score-val');
const speedEl = document.getElementById('speed-val');
const overlay = document.getElementById('overlay');

let score = 0;
let gameActive = true;
let speed = 10; // Pixels per frame
let playerLane = 1; // 0: Left, 1: Center, 2: Right
const lanes = [70, 270, 470]; // Left positions for lanes

function startGame() {
    score = 0;
    speed = 10;
    gameActive = true;
    overlay.style.display = 'none';
    document.querySelectorAll('.obstacle').forEach(o => o.remove());
    scoreEl.innerText = score;
    requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft" && playerLane > 0) playerLane--;
    if (e.key === "ArrowRight" && playerLane < 2) playerLane++;
    player.style.left = lanes[playerLane] + "px";
});

function spawnObstacle() {
    if (!gameActive) return;
    const obs = document.createElement('div');
    const lane = Math.floor(Math.random() * 3);
    obs.className = 'obstacle';
    obs.style.left = (lanes[lane] - 45) + "px"; // Offset to center in lane
    obs.style.top = "-500px"; // Start far away
    obs.dataset.lane = lane;
    obs.dataset.z = -2000; // Track Z distance manually
    world.appendChild(obs);
}

let lastSpawn = 0;
function gameLoop(timestamp) {
    if (!gameActive) return;

    // 1. Move Obstacles
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obs => {
        let top = parseInt(obs.style.top || -500);
        top += speed;
        obs.style.top = top + "px";

        // 2. Collision Detection
        // If obstacle is near the player's bottom Y (approx 800px down)
        if (top > 550 && top < 620) {
            if (parseInt(obs.dataset.lane) === playerLane) {
                gameOver();
            }
        }

        // 3. Cleanup & Score
        if (top > 1000) {
            obs.remove();
            score += 10;
            scoreEl.innerText = score;
            // Speed up every 100 points
            if (score % 100 === 0) {
                speed += 0.5;
                speedEl.innerText = (speed/10).toFixed(1) + "x";
            }
        }
    });

    // 4. Spawn Frequency
    if (timestamp - lastSpawn > 1500 - (speed * 20)) {
        spawnObstacle();
        lastSpawn = timestamp;
    }

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameActive = false;
    overlay.style.display = 'flex';
}

// Initial Start
startGame();