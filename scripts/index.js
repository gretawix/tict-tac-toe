import {
    toggleActivePlayerCard,
    displayPlayersNames,
    showResultView,
    updateWinningCard,
    displayTieGameCard,
} from "./playersStatus.js";
import { isWinner, highlightWinningCells } from "./winningValidation.js";
import { isBoardFull, createGameArray } from "./commonGameUtils.js";
import { getCells, getPlayerCard } from "./selectors.js";

const players = {
    player1: {
        name: "Player X",
        symbol: "x",
    },
    player2: {
        name: "Player O",
        symbol: "o",
    },
};

const playGame = (startingPlayer) => {
    let playerTurn = startingPlayer;
    const playerXname = "Player X";
    const playerOname = "Player O";
    let gameFinished = false;
    let board = createGameArray(3, 3);
    const allCells = getCells();
    getPlayerCard(playerTurn).classList.add("active");
    displayPlayersNames(players);

    const updateBoard = (cell) => {
        const cellClasses = cell.classList;
        const row = cell.getAttribute("data-row");
        const col = cell.getAttribute("data-col");
        cellClasses.add("filled", `icon-${playerTurn}`);
        board[row][col] = playerTurn;

        if (isWinner(playerTurn, board)) {
            updateWinningCard(playerTurn, playerXname, playerOname);
            highlightWinningCells(board, allCells);
            endGame();
        } else {
            toggelPlayerTurn();
        }
        toggleActivePlayerCard(playerTurn);
    };

    const toggelPlayerTurn = () => {
        playerTurn = playerTurn === "x" ? "o" : "x";
    };

    const handleCellClick = (event) => {
        const cell = event.target;
        if (!gameFinished) {
            updateBoard(cell);
            cell.removeEventListener("click", handleCellClick);
        }
        if (isBoardFull(allCells)) {
            displayTieGameCard();
            toggelPlayerTurn();
            endGame();
        }
    };

    const endGame = () => {
        gameFinished = true;
        allCells.forEach((cell) => {
            cell.removeEventListener("click", handleCellClick);
            cell.classList.add("filled");
        });
        showResultView(true);
    };

    allCells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
    });

    document.querySelector("#rematch-btn").addEventListener("click", () => {
        drawBoard();
        document.querySelector("#winning-player").classList.remove(`player-${playerTurn}`);
        toggelPlayerTurn();
        toggleActivePlayerCard(playerTurn);
        showResultView(false);
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

document.addEventListener("DOMContentLoaded", () => {
    drawBoard();
    playGame(players.player1.symbol);
});
