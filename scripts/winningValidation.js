const winningRow = (board) => {
    const rowIndex = board.findIndex((row) => row.every((cell) => cell === row[0] && cell));
    if (rowIndex >= 0) {
        return {
            rowWinner: board[rowIndex][0],
            coordinates: board[rowIndex].map((_, colIndex) => [rowIndex, colIndex]),
        };
    }

    return { rowWinner: null, coordinates: null };
};

const winningColumn = (board) => {
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
        const firstCell = board[0][colIndex];
        if (firstCell && board.every((row) => row[colIndex] === firstCell)) {
            return { colWinner: firstCell, coordinates: board.map((_, rowIndex) => [rowIndex, colIndex]) };
        }
    }

    return { colWinner: null, coordinates: null };
};

const winningDiagonal = (board) => {
    const lastColIndex = board[0].length - 1;
    const topRightCell = board[0][lastColIndex];
    const topLeftCell = board[0][0];

    if (topLeftCell && board.every((row, index) => row[index] === topLeftCell)) {
        return { diagonalWinner: topLeftCell, coordinates: board.map((_, rowIndex) => [rowIndex, rowIndex]) };
    } else if (topRightCell && board.every((row, index) => row[lastColIndex - index] === topRightCell)) {
        return {
            diagonalWinner: topRightCell,
            coordinates: board.map((_, rowIndex) => [rowIndex, lastColIndex - rowIndex]),
        };
    }

    return { diagonalWinner: null, coordinates: null };
};

const isWinner = (playerTurn, board) => {
    const { rowWinner } = winningRow(board);
    const { colWinner } = winningColumn(board);
    const { diagonalWinner } = winningDiagonal(board);

    return rowWinner === playerTurn || colWinner === playerTurn || diagonalWinner === playerTurn;
};

const highlightWinningCells = (board, allCells) => {
    const rowResult = winningRow(board);
    const columnResult = winningColumn(board);
    const diagonalResult = winningDiagonal(board);
    const winningCoordinates = rowResult.coordinates || columnResult.coordinates || diagonalResult.coordinates || [];

    winningCoordinates.forEach(([row, col]) => {
        Array.from(allCells).forEach((cell) => {
            if (cell.getAttribute("data-row") == row && cell.getAttribute("data-col") == col) {
                cell.classList.add("winning-cell");
            }
        });
    });
};

export { isWinner, highlightWinningCells };
