document.addEventListener("DOMContentLoaded", () => {
    playGame();
});

const playGame = () => {
    let playerTurn = "x";
    let gameFinished = false;
    const allCells = getCells();

    allCells.forEach((cell) => {
        const switchPlayers = () => {
            const cellClasses = cell.classList;
            if (playerTurn === "x") {
                cellClasses.add("filled");
                cellClasses.add("icon-x");
                playerTurn = "o";
            } else if (playerTurn === "o") {
                cellClasses.add("filled");
                cellClasses.add("icon-o");
                playerTurn = "x";
            }

            toggleActivePlayerCard(playerTurn);
        };

        const handleCellClick = () => {
            switchPlayers();
            cell.removeEventListener("click", handleCellClick);
            if (isBoardFull()) {
                gameFinished = true;
                endGame(playerTurn);
            }
        };
        cell.addEventListener("click", handleCellClick);
    });
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

const endGame = (playerTurn) => {
    const winningScreen = document.querySelector("#winning-player");
    document.querySelector("#players-status-wrapper").style.display = "none";
    winningScreen.style.display = "flex";
    winningScreen.innerText = `the winner is player ${playerTurn}`;
};
