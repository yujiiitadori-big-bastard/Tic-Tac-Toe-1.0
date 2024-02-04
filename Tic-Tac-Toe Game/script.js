document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const overlay = document.querySelector('.overlay');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const newGameBtn = document.getElementById('new-game-btn');
    const resetBtn = document.getElementById('resetBtn');
    const clickSound = new Audio('click.mp3'); // Replace with the path to your sound file
    const winSound = new Audio('win.mp3');     // Replace with the path to your sound file
    const drawSound = new Audio('draw.mp3');   // Replace with the path to your sound file

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the Tic-Tac-Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    // Handle cell click event
    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            clickSound.play(); // Play click sound
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            checkWinner();
            togglePlayer();
        }
    }

    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                displayResult(`${currentPlayer} wins!`);
                winSound.play(); // Play win sound
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            displayResult('It\'s a draw!');
            drawSound.play(); // Play draw sound
        }
    }

    // Toggle between X and O
    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Display result in a new screen
    function displayResult(message) {
        resultMessage.textContent = message;
        overlay.style.display = 'flex';
    }

    // Reset the game
    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        resultMessage.textContent = '';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
        overlay.style.display = 'none';
    }

    // New Game button click event
    newGameBtn.addEventListener('click', resetGame);

    // Reset button click event (for non-modal reset)
    resetBtn.addEventListener('click', resetGame);
});
