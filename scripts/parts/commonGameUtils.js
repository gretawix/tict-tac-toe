const getCells = () => {
    const gameGrid = document.querySelector("#game-grid");
    return gameGrid.querySelectorAll(".cell");
};

const isBoardFull = () => {
    const allCells = getCells();
    const filledCells = Array.from(allCells).filter((cell) => cell.classList.contains("filled"));
    return filledCells.length === 9;
};

export { getCells, isBoardFull };
