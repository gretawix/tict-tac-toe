document.addEventListener("DOMContentLoaded", () => {
    playGame();
});

const playGame = () => {
    let playerTurn = "x";
    let gameFinished = false;
    let playersPositions = Array.from({ length: 3 }, () => Array(3).fill(""));
    const allCells = getCells();

    const switchPlayers = (cell) => {
        const cellClasses = cell.classList;
        const row = cell.getAttribute("data-row");
        const col = cell.getAttribute("data-col");

        if (playerTurn === "x") {
            cellClasses.add("filled", "icon-x");
            playersPositions[row][col] = playerTurn;
            if (isWinner(playerTurn, playersPositions)) {
                console.log(playerTurn + " wins!");
                endGame();
            } else {
                playerTurn = "o";
            }
        } else if (playerTurn === "o") {
            cellClasses.add("filled", "icon-o");
            playersPositions[row][col] = playerTurn;
            if (isWinner(playerTurn, playersPositions)) {
                console.log(playerTurn + " wins!");
                endGame();
            } else {
                playerTurn = "x";
            }
        }
        toggleActivePlayerCard(playerTurn);
    };

    const handleCellClick = (cell) => {
        if (!gameFinished) {
            switchPlayers(cell);
            cell.removeEventListener("click", () => handleCellClick(cell));

            if (isBoardFull()) {
                gameFinished = true;
                endGame();
            }
        }
    };

    allCells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    const endGame = () => {
        gameFinished = true;
        allCells.forEach((cell) => {
            cell.removeEventListener("click", () => handleCellClick(cell));
            cell.classList.add("filled");
        });
        document.querySelector("#players-status-wrapper").style.display = "none";
        document.querySelector("#winning-player").style.display = "flex";
    };
};

const getCells = () => {
    const gameGrid = document.querySelector("#game-grid");
    return gameGrid.querySelectorAll(".cell");
};

const getPlayerCard = (playerSymbol) => {
    return document.querySelector(`#player-${playerSymbol}-card`);
};

const changeCardTitle = (playerCard, text) => {
    playerCard.querySelector(".turn-title").innerText = text;
};

const toggleActivePlayerCard = (playerTurn) => {
    const nextUpText = "Next up";
    const yourTurnText = "Your turn";
    const playerXcard = getPlayerCard("x");
    const playerOcard = getPlayerCard("o");
    if (playerTurn === "x") {
        playerOcard.classList.remove("active");
        playerXcard.classList.add("active");
        changeCardTitle(playerOcard, nextUpText);
        changeCardTitle(playerXcard, yourTurnText);
    } else if (playerTurn === "o") {
        playerXcard.classList.remove("active");
        playerOcard.classList.add("active");
        changeCardTitle(playerXcard, nextUpText);
        changeCardTitle(playerOcard, yourTurnText);
    }
};

const isBoardFull = () => {
    const allCells = getCells();
    const filledCells = Array.from(allCells).filter((cell) => cell.classList.contains("filled"));
    return filledCells.length === 9;
};

const isWinner = (playerTurn, playersPositions) => {
    // Check rows
    for (let row of playersPositions) {
        if (row.every((cell) => cell === playerTurn)) {
            return true;
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (
            playersPositions[0][col] === playerTurn &&
            playersPositions[1][col] === playerTurn &&
            playersPositions[2][col] === playerTurn
        ) {
            return true;
        }
    }

    // Check diagonals
    if (
        (playersPositions[0][0] === playerTurn &&
            playersPositions[1][1] === playerTurn &&
            playersPositions[2][2] === playerTurn) ||
        (playersPositions[0][2] === playerTurn &&
            playersPositions[1][1] === playerTurn &&
            playersPositions[2][0] === playerTurn)
    ) {
        return true;
    }

    return false;
};
