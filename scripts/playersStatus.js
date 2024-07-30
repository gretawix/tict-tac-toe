import { getPlayerCard } from "./selectors.js";

const updatePlayerCard = (playerCard, isActive, titleText) => {
    if (isActive) {
        playerCard.classList.add("active");
    } else {
        playerCard.classList.remove("active");
    }
    playerCard.querySelector(".turn-title").innerText = titleText;
};

const toggleActivePlayerCard = (playerTurn) => {
    const nextUpText = "Next up";
    const yourTurnText = "Your turn";
    const playerXcard = getPlayerCard("x");
    const playerOcard = getPlayerCard("o");
    if (playerTurn === "x") {
        updatePlayerCard(playerXcard, true, yourTurnText);
        updatePlayerCard(playerOcard, false, nextUpText);
    } else if (playerTurn === "o") {
        updatePlayerCard(playerOcard, true, yourTurnText);
        updatePlayerCard(playerXcard, false, nextUpText);
    }
};

const displayPlayersNames = (players) => {
    Object.entries(players).forEach(([_, value]) => {
        document.querySelector(`#player-${value.symbol}-card .player-name`).innerText = value.name;
    });
};

const showResultView = (showResultView) => {
    const winningPlayerView = document.querySelector("#winning-player");
    const palyersTurnView = document.querySelector("#players-status-wrapper");

    if (showResultView) {
        palyersTurnView.style.display = "none";
        winningPlayerView.style.display = "flex";
    } else {
        palyersTurnView.style.display = "flex";
        winningPlayerView.style.display = "none";
    }
};

const updateWinningCard = (playerTurn, playerXname, playerOname) => {
    const winnerCard = document.querySelector("#winning-player");
    winnerCard.classList.add(`player-${playerTurn}`);
    winnerCard.querySelector(".player-name").innerText = `${playerTurn === "x" ? playerXname : playerOname} wins!`;
    winnerCard.querySelector("#winning-title").style.display = "flex";
    winnerCard.querySelector(`.player-icon`).style.display = "flex";

    if (playerTurn === "x") {
        winnerCard.querySelector(`.player-x-icon`).style.display = "flex";
        winnerCard.querySelector(`.player-o-icon`).style.display = "none";
    } else {
        winnerCard.querySelector(`.player-x-icon`).style.display = "none";
        winnerCard.querySelector(`.player-o-icon`).style.display = "flex";
    }
};

const displayTieGameCard = () => {
    const winnerCard = document.querySelector("#winning-player");
    winnerCard.querySelector("#winning-title").style.display = "none";
    winnerCard.querySelector(`.player-icon`).style.display = "none";
    winnerCard.querySelector(".player-name").innerText = "It's a tie!";
};

export {
    updatePlayerCard,
    toggleActivePlayerCard,
    displayPlayersNames,
    showResultView,
    updateWinningCard,
    displayTieGameCard,
};
