
const grid = document.getElementById('grid');
const messageDisplay = document.getElementById('message-display');
const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('reset-btn');
const pingSound = document.getElementById('ping');
const impactSound = document.getElementById('impact');
const winSound = document.getElementById('win');  // Fixed line

// Generate 9x9 grid
function generateGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = i;
        grid.appendChild(square);
    }
}

generateGrid();

// Battleship position
let head, tail, battleship;
function placeBattleship() {
    head = Math.floor(Math.random() * 81);
    tail = head + 1;
    while (head % 9 === 8) {
        head = Math.floor(Math.random() * 81);
        tail = head + 1;
    }
    battleship = [head, tail];
}
placeBattleship();

let hits = 0;

grid.addEventListener('click', function(e) {
    const square = e.target;
    if (!square.classList.contains('square') || square.classList.contains('correct') || square.classList.contains('incorrect')) return;

    const index = parseInt(square.dataset.index);

    if (battleship.includes(index)) {
        square.classList.add('correct');
        impactSound.currentTime = 0;
        impactSound.play();
        hits++;

        if (hits === battleship.length) {
            messageDisplay.textContent = "🔥 Target neutralized. Mission complete!";
            statusText.textContent = "ENEMY SHIP SUNK";
            statusText.style.color = "#0f0";
            winSound?.play();
        } else {
            messageDisplay.textContent = "💥 Direct hit!";
            statusText.textContent = "HIT CONFIRMED";
        }
    } else {
        square.classList.add('incorrect');
        messageDisplay.textContent = "❌ Miss. Recalibrating sensors...";
        statusText.textContent = "MISS";
    }
});

// Reset handler
resetBtn.addEventListener("click" , function() {
    console.log('Reset button clicked');
    hits = 0;
    gameOver = false;
    console.log('Hits and gameOver reset');
    generateGrid();
    console.log('Grid regenerated');
    placeBattleship();
    console.log('Battleship repositioned');
    messageDisplay.textContent = '';
    statusText.textContent = 'Awaiting launch orders...';
    statusText.style.color = '#ff0';
});
