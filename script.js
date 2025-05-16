
const grid = document.getElementById('grid');

// Generate the grid
for (let i = 0; i < 81; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i;
    grid.appendChild(square);
}

// Choose a random index for the battleship
const battleshipIndex = Math.floor(Math.random() * 81);

// Add click event to each square
grid.addEventListener('click', function(e) {
    const target = e.target;
    if (!target.classList.contains('square') || target.classList.contains('correct') || target.classList.contains('incorrect')) return;

    const index = parseInt(target.dataset.index);

    if (index === battleshipIndex) {
        target.classList.add('correct');
        alert("Hit! You found the battleship!");
    } else {
        target.classList.add('incorrect');
    }
});
