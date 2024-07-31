const isBoardFull = (allCells) => {
    const filledCells = Array.from(allCells).filter((cell) => cell.hasAttribute("data-player"));

    return filledCells.length === allCells.length;
};

const createGameArray = (rowsCount, colsCount) =>
    new Array(rowsCount).fill("").map(() => new Array(colsCount).fill(""));

const toggleDiv = (parent, divSelector, isHidden = true) =>
    (parent.querySelector(divSelector).style.display = isHidden ? "none" : "flex");

export { isBoardFull, createGameArray, toggleDiv };
