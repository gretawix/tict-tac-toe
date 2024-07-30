const getCells = () => {
    const gameGrid = document.querySelector("#game-grid");
    return gameGrid.querySelectorAll(".cell");
};

const getPlayerCard = (playerTurn) => {
    return document.querySelector(`#player-${playerTurn}-card`);
};

export { getCells, getPlayerCard };
