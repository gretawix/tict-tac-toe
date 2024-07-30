const isBoardFull = (allCells) => {
    const filledCells = Array.from(allCells).filter(
        (cell) => cell.classList.contains("icon-x") || cell.classList.contains("icon-o")
    );
    return filledCells.length === 9;
};

const createGameArray = (rowsCount, colsCount) => {
    return new Array(rowsCount).fill("").map(() => new Array(colsCount).fill(""));
};

export { isBoardFull, createGameArray };
