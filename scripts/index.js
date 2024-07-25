import { toggleActivePlayerCard, displayPlayersNames, toggleResultView, getPlayerCard } from "./parts/playersStatus.js";
import { isWinner, highlightWinningCells } from "./parts/winningValidation.js";
import { getCells, isBoardFull } from "./parts/commonGameUtils.js";

document.addEventListener("DOMContentLoaded", () => {
    drawBoard();
    playGame("x");
});

const playGame = (player) => {
    let playerTurn = player;
    const playerXname = "Player X";
    const playerOname = "Player O";
    let gameFinished = false;
    let board = new Array(3).fill("").map(() => new Array(3).fill(""));
    const allCells = getCells();
    getPlayerCard(playerTurn).classList.add("active");
    displayPlayersNames(playerXname, playerOname);

    const updateBoard = (cell) => {
        const cellClasses = cell.classList;
        const row = cell.getAttribute("data-row");
        const col = cell.getAttribute("data-col");
        cellClasses.add("filled", `icon-${playerTurn}`);
        board[row][col] = playerTurn;

        if (isWinner(playerTurn, board)) {
            const winnerCard = document.querySelector("#winning-player");
            winnerCard.classList.add(`player-${playerTurn}`);
            winnerCard.querySelector(".player-name").innerText = `${
                playerTurn === "x" ? playerXname : playerOname
            } wins!`;
            highlightWinningCells(playerTurn, board);
            endGame();
        } else {
            toggelPlayerTurn();
        }
        toggleActivePlayerCard(playerTurn);
    };

    const toggelPlayerTurn = () => {
        playerTurn = playerTurn === "x" ? "o" : "x";
    };
    const handleCellClick = (cell) => {
        if (!gameFinished) {
            updateBoard(cell);
            cell.removeEventListener("click", () => handleCellClick(cell));
        } else if (isBoardFull()) {
            //implement tie view
            endGame();
        }
    };

    const endGame = () => {
        gameFinished = true;
        allCells.forEach((cell) => {
            cell.removeEventListener("click", () => handleCellClick(cell));
            cell.classList.add("filled");
        });
        toggleResultView(true);
    };

    allCells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    document.querySelector("#rematch-btn").addEventListener("click", () => {
        drawBoard();
        document.querySelector("#winning-player").classList.remove(`player-${playerTurn}`);
        toggelPlayerTurn();
        toggleActivePlayerCard(playerTurn);
        toggleResultView(false);
        playGame(playerTurn);
    });
};

const drawBoard = () => {
    const gameGrid = document.querySelector("#game-grid");
    gameGrid.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        gameGrid.appendChild(row);
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            row.appendChild(cell);
        }
    }
};
