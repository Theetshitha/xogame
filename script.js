document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restart-btn");
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.getElementById("close-modal");
    const clickSoundX = document.getElementById("click-sound-X");
    const clickSoundO = document.getElementById("click-sound-O");
    const drawSound = document.getElementById("draw-sound");
    const winSound = document.getElementById("win-sound");
    
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
    closeModal.addEventListener("click", () => modal.style.display = "none");

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = +clickedCell.dataset.index;

        if (board[clickedCellIndex] || !gameActive) return;

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (currentPlayer === "X") {
            clickSoundX.play();
        } else {
            clickSoundO.play();
        }

        if (checkWinner()) {
            gameActive = false;
            showModal(`Player ${currentPlayer} Wins!`);
            winSound.play();
        } else if (!board.includes("")) {
            gameActive = false;
            showModal("It's a Draw!");
            drawSound.play();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    function showModal(message) {
        modalText.textContent = message;
        modal.style.display = "block";
        document.querySelector(".board").style.visibility = "hidden";
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => {
            cell.textContent = "";
        });
        modal.style.display = "none";
        document.querySelector(".board").style.visibility = "visible";
    }
});
