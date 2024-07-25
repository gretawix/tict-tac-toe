const getCells = () => {
    const gameGrid = document.querySelector("#game-grid");
    return gameGrid.querySelectorAll(".cell");
};

const isBoardFull = () => {
    const allCells = getCells();
    const filledCells = Array.from(allCells).filter(
        (cell) => cell.classList.contains("icon-x") || cell.classList.contains("icon-o")
    );
    return filledCells.length === 9;
};

const createGameArray = (number) => {
    return new Array(number).fill("").map(() => new Array(number).fill(""));
};

export { getCells, isBoardFull, createGameArray };
