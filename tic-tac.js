const board = document.querySelector('.board');
const status = document.querySelector('.game-status');
const resetButton = document.querySelector('.reset-button');
const cells = Array.from({ length: 9 }, () => null);
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let currentPlayer = 'X';
let gameOver = false;

function getWinner() {
    for (const [a, b, c] of winningConditions) {
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    return null;
}

function render() {
    const buttons = board.querySelectorAll('.cell');

    buttons.forEach((button, index) => {
        const value = cells[index];
        button.textContent = value || '';
        button.setAttribute('aria-label', `Cell ${index + 1}${value ? `, ${value}` : ', empty'}`);
        button.disabled = Boolean(value) || gameOver;
    });

    const winner = getWinner();
    if (winner) {
        status.textContent = `Player ${winner} wins!`;
    } else if (cells.every(Boolean)) {
        status.textContent = "It's a draw!";
    } else {
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function handleCellClick(event) {
    const button = event.target.closest('.cell');
    if (!button || gameOver) return;

    const index = Number(button.dataset.index);
    if (!Number.isInteger(index) || index < 0 || index >= cells.length || cells[index]) return;

    cells[index] = currentPlayer;

    if (getWinner() || cells.every(Boolean)) {
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    render();
}

function resetGame() {
    cells.fill(null);
    currentPlayer = 'X';
    gameOver = false;
    render();
}

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
render();
