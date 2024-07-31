const getCells = () => {
    const gameGrid = document.querySelector("#game-grid");
    return gameGrid.querySelectorAll(".cell");
};

const getPlayerCard = (player) => document.querySelector(`#player-${player}-card`);

const getWinnerCard = () => document.querySelector("#winning-player");

export { getCells, getPlayerCard, getWinnerCard };
