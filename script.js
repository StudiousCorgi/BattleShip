const hitSound = new Audio("./audio/WeGotHim.mp3");
hitSound.volume = 1;

const missSound = new Audio("./audio/Sonar.mp3");
missSound.volume = .4;


const grid = document.getElementById('grid');

// Generate grid //
for (let i = 0; i < 81; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i;
    grid.appendChild(square);
}

// Generate three-square battleship (horizontal or vertical) //
let head = Math.floor(Math.random() * 81);
let middle, tail;
let isHorizontal = Math.random() < 0.5; // 50% chance for horizontal

// Keep generating until valid position is found
while (true) {
    head = Math.floor(Math.random() * 81);
    
    if (isHorizontal) {  // Check horizontal wrap and bounds
        if (head % 9 >= 7) continue;
        middle = head + 1;
        tail = head + 2;
    } else {  // Check vertical bounds
        if (head >= 63) continue; // Prevents going below grid
        middle = head + 9;  // Next row
        tail = head + 18;   // Two rows down
    }
    
    // Valid position found
    break;
}

const battleship = [head, middle, tail];

// Handle click events //
const messageDisplay = document.getElementById('message-display');

grid.addEventListener('click', function(e) {
    const target = e.target;
    if (!target.classList.contains('square') || target.classList.contains('correct') || target.classList.contains('incorrect')) {
        return;
    }
    
    const index = parseInt(target.dataset.index);

    if (battleship.includes(index)) {
        target.classList.add('correct');
        battleship.forEach(i => {
            document.querySelector(`[data-index='${i}']`).classList.add('correct');
        });
        messageDisplay.textContent = "Hit! You Sank their battleship!";
        hitSound.play();
    } else {  
        target.classList.add('incorrect');
        messageDisplay.textContent = "C'mon, Chief! You missed!";
        missSound.play(); 
    }
});