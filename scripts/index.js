import {
    toggleActivePlayerCard,
    displayPlayersNames,
    showResultView,
    updateWinningCard,
    displayTieGameCard,
    togglePlayerTurn,
} from "./players.js";
import { isWinner, highlightWinningCells } from "./winningValidation.js";
import { isBoardFull, createGameArray } from "./utils.js";
import { getCells, getPlayerCard, getWinnerCard } from "./selectors.js";
import { players, gameGridSize } from "./gameSettings.js";

let board = createGameArray(...gameGridSize);
let gameFinished = false;
let playerTurn;

const winnerCard = getWinnerCard();
const rematchBtn = document.querySelector("#rematch-btn");

const drawBoard = (boardArray) => {
    const gameGrid = document.querySelector("#game-grid");
    gameGrid.innerHTML = "";
    gameGrid.style.gridTemplateRows = `repeat(${boardArray.length}, 1fr)`;
    for (let i = 0; i < boardArray.length; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.style.gridTemplateColumns = `repeat(${boardArray[i].length}, 1fr)`;
        gameGrid.appendChild(row);

        for (let j = 0; j < boardArray[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            row.appendChild(cell);
        }
    }
};

const updateBoard = (cell, allCells) => {
    const cellClasses = cell.classList;
    const row = cell.getAttribute("data-row");
    const col = cell.getAttribute("data-col");
    cell.setAttribute("data-player", playerTurn);
    cellClasses.add("filled", `icon-${playerTurn}`);
    board[row][col] = playerTurn;

    if (isWinner(playerTurn, board)) {
        updateWinningCard(playerTurn, players, winnerCard);
        highlightWinningCells(board, allCells);
        gameFinished = true;
        showResultView(gameFinished);
    } else {
        playerTurn = togglePlayerTurn(playerTurn, players);
    }
    toggleActivePlayerCard(playerTurn, players);
};

const endGame = (allCells) => {
    allCells.forEach((cell) => {
        cell.removeEventListener("click", (event) => {
            handleCellClick(event, allCells);
        });
        cell.classList.add("filled");
    });
};

const tieGame = () => {
    displayTieGameCard(winnerCard);
    playerTurn = togglePlayerTurn(playerTurn, players);
    showResultView(gameFinished);
};

const handleCellClick = (event, allCells) => {
    const cell = event.target;
    if (!gameFinished) {
        updateBoard(cell, allCells);
        cell.removeEventListener("click", (event) => {
            handleCellClick(event, allCells);
        });
    }
    if (isBoardFull(allCells) && !gameFinished) {
        gameFinished = true;
        tieGame();
    }
    if (gameFinished) {
        endGame(allCells);
    }
};

const handleRematchClick = (playerTurn) => {
    board = createGameArray(...gameGridSize);
    drawBoard(board);
    document.querySelector("#winning-player").classList.remove(`player-${playerTurn}`);
    showResultView(!gameFinished);
};

const playGame = (startingPlayer) => {
    playerTurn = startingPlayer;
    gameFinished = false;
    const allCells = getCells();

    const restartGame = () => {
        handleRematchClick(playerTurn);
        playerTurn = togglePlayerTurn(playerTurn, players);
        toggleActivePlayerCard(playerTurn, players);
        rematchBtn.removeEventListener("click", restartGame);
        playGame(playerTurn);
    };

    getPlayerCard(playerTurn).classList.add("active");
    displayPlayersNames(players);

    allCells.forEach((cell) => {
        cell.addEventListener("click", (event) => {
            handleCellClick(event, allCells);
        });
    });

    rematchBtn.addEventListener("click", restartGame);
};

document.addEventListener("DOMContentLoaded", () => {
    drawBoard(board);
    playGame(players.player1.symbol);
});
