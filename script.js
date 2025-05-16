const grid = document.getElementById('grid');
const gridSize = 9;

// Clear grid in case of re-run
grid.innerHTML = "";

// Create column labels (A, B, C, ...)
const columnLabels = document.createElement('div');
columnLabels.classList.add('row');
columnLabels.appendChild(document.createElement('div')); // Empty corner
for (let x = 0; x < gridSize; x++) {
    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = String.fromCharCode(65 + x); // 65 = 'A'
    columnLabels.appendChild(label);
}
grid.appendChild(columnLabels);

// Create grid with row labels
for (let y = 0; y < gridSize; y++) {
    const row = document.createElement('div');
    row.classList.add('row');
    // Row label
    const rowLabel = document.createElement('div');
    rowLabel.classList.add('label');
    rowLabel.textContent = y + 1;
    row.appendChild(rowLabel);

    for (let x = 0; x < gridSize; x++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = y * gridSize + x;
        row.appendChild(square);
    }
    grid.appendChild(row);
}

// Choose a random index for the battleship //
const battleshipIndex = Math.floor(Math.random() * 81) + 1; //9x9=81, if grid changes, this does too!//




// Add click event to each square //
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
