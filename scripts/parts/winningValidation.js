import { getCells } from "./commonGameUtils.js";

const isWinner = (playerTurn, board) => {
    const rowResult = winningRow(playerTurn, board);
    if (rowResult.isWinning) return rowResult.isWinning;

    const columnResult = winningColumn(playerTurn, board);
    if (columnResult.isWinning) return columnResult.isWinning;

    const diagonalResult = winningDiagonal(playerTurn, board);
    if (diagonalResult.isWinning) return diagonalResult.isWinning;

    return false;
};

const winningRow = (playerTurn, board) => {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        if (board[rowIndex].every((cell) => cell === playerTurn)) {
            return { isWinning: true, coordinates: board[rowIndex].map((_, colIndex) => [rowIndex, colIndex]) };
        }
    }
    return { isWinning: false, coordinates: [] };
};

const winningColumn = (playerTurn, board) => {
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === playerTurn && board[1][col] === playerTurn && board[2][col] === playerTurn) {
            return {
                isWinning: true,
                coordinates: [
                    [0, col],
                    [1, col],
                    [2, col],
                ],
            };
        }
    }
    return { isWinning: false, coordinates: [] };
};

const winningDiagonal = (playerTurn, board) => {
    if (board[0][0] === playerTurn && board[1][1] === playerTurn && board[2][2] === playerTurn) {
        return {
            isWinning: true,
            coordinates: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        };
    }
    if (board[0][2] === playerTurn && board[1][1] === playerTurn && board[2][0] === playerTurn) {
        return {
            isWinning: true,
            coordinates: [
                [0, 2],
                [1, 1],
                [2, 0],
            ],
        };
    }
    return { isWinning: false, coordinates: [] };
};

const highlightWinningCells = (playerTurn, board) => {
    let winningCoordinates = [];
    const allCells = getCells();
    const rowResult = winningRow(playerTurn, board);
    const columnResult = winningColumn(playerTurn, board);
    const diagonalResult = winningDiagonal(playerTurn, board);

    if (rowResult.isWinning) winningCoordinates = rowResult.coordinates;
    if (columnResult.isWinning) winningCoordinates = columnResult.coordinates;
    if (diagonalResult.isWinning) winningCoordinates = diagonalResult.coordinates;

    winningCoordinates.forEach(([row, col]) => {
        Array.from(allCells).forEach((cell) => {
            if (cell.getAttribute("data-row") == row && cell.getAttribute("data-col") == col) {
                cell.classList.add("winning-cell");
            }
        });
    });
};

export { isWinner, winningRow, winningColumn, winningDiagonal, highlightWinningCells };
