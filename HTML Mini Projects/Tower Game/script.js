// Physics Engine Setup
const { Engine, Render, Runner, Bodies, Composite, Events } = Matter;

const engine = Engine.create();
const world = engine.world;
const render = Render.create({
    element: document.getElementById('game-canvas'),
    engine: engine,
    options: {
        width: 450,
        height: 700,
        wireframes: false,
        background: 'transparent'
    }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Game Variables
let currentBlock;
let blocks = [];
let isGameOver = false;
let score = 0;
let best = localStorage.getItem('stack-best') || 0;
document.getElementById('best').innerText = best + 'm';

// Create Ground
const ground = Bodies.rectangle(225, 690, 450, 20, { 
    isStatic: true, 
    render: { fillStyle: '#00eaff' } 
});
Composite.add(world, ground);

// Function to Spawn "Preview" Block at Top
function spawnBlock() {
    if (isGameOver) return;
    
    const width = 60 + Math.random() * 60;
    const height = 30 + Math.random() * 20;
    
    currentBlock = {
        x: 225,
        y: 80,
        w: width,
        h: height,
        dir: 1,
        speed: 3 + (score * 0.1) // Speed increases as you go
    };
}

// Draw the moving preview block
Events.on(render, 'afterRender', () => {
    if (!currentBlock || isGameOver) return;

    // Move Left/Right
    currentBlock.x += currentBlock.dir * currentBlock.speed;
    if (currentBlock.x > 400 || currentBlock.x < 50) currentBlock.dir *= -1;

    const ctx = render.context;
    ctx.fillStyle = 'rgba(0, 234, 255, 0.5)';
    ctx.strokeStyle = '#00eaff';
    ctx.lineWidth = 2;
    ctx.strokeRect(currentBlock.x - currentBlock.w/2, currentBlock.y - currentBlock.h/2, currentBlock.w, currentBlock.h);
    ctx.fillRect(currentBlock.x - currentBlock.w/2, currentBlock.y - currentBlock.h/2, currentBlock.w, currentBlock.h);
});

// Click to Drop
window.addEventListener('click', () => {
    if (!currentBlock || isGameOver) return;

    const block = Bodies.rectangle(currentBlock.x, currentBlock.y, currentBlock.w, currentBlock.h, {
        restitution: 0.2, // Small bounce
        friction: 0.5,
        render: {
            fillStyle: '#fff',
            strokeStyle: '#00eaff',
            lineWidth: 3
        }
    });

    Composite.add(world, block);
    blocks.push(block);
    currentBlock = null;

    // Spawn next after a short delay
    setTimeout(spawnBlock, 1000);
});

// Update Score & Check Game Over
Events.on(engine, 'afterUpdate', () => {
    if (isGameOver) return;

    let highestPoint = 700;
    blocks.forEach(b => {
        // If a block falls off the stage
        if (b.position.y > 750 || b.position.x < -50 || b.position.x > 500) {
            endGame();
        }
        if (b.position.y < highestPoint) highestPoint = b.position.y;
    });

    // Score is distance from ground to highest block
    score = Math.floor((680 - highestPoint) / 10);
    if (score < 0) score = 0;
    document.getElementById('score').innerText = score + 'm';
});

function endGame() {
    isGameOver = true;
    document.getElementById('overlay').style.display = 'flex';
    if (score > best) {
        best = score;
        localStorage.setItem('stack-best', best);
        document.getElementById('best').innerText = best + 'm';
    }
}

function resetGame() {
    location.reload(); // Simplest way to reset physics world
}

spawnBlock();