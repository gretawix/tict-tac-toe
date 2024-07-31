import { getPlayerCard } from "./selectors.js";
import { toggleDiv } from "./utils.js";

const togglePlayerTurn = (playerTurn, players) =>
    playerTurn === players.player1.symbol ? players.player2.symbol : players.player1.symbol;

const updatePlayerCard = (playerCard, isActive, titleText) => {
    const playerCardClasses = playerCard.classList;
    isActive ? playerCardClasses.add("active") : playerCardClasses.remove("active");
    playerCard.querySelector(".turn-title").innerText = titleText;
};

const toggleActivePlayerCard = (currentPlayer, players) => {
    Object.entries(players).forEach(([_, value]) => {
        const playerCard = getPlayerCard(value.symbol);
        const isActive = currentPlayer === value.symbol;
        updatePlayerCard(playerCard, isActive, isActive ? "Your turn" : "Next up");
    });
};

const displayPlayersNames = (players) => {
    Object.entries(players).forEach(
        ([_, value]) => (document.querySelector(`#player-${value.symbol}-card .player-name`).innerText = value.name)
    );
};

const showResultView = (isGameFinished) => {
    toggleDiv(document, "#players-status-wrapper", isGameFinished);
    toggleDiv(document, "#winning-player", !isGameFinished);
};

const updateWinningCard = (playerTurn, players, winnerCard) => {
    winnerCard.classList.add(`player-${playerTurn}`);
    Object.entries(players).forEach(([_, value]) => {
        const isWinner = playerTurn === value.symbol;
        if (isWinner) {
            winnerCard.querySelector(".player-name").innerText = `${value.name} wins!`;
            toggleDiv(winnerCard, "#winning-title", !isWinner);
            toggleDiv(winnerCard, `.player-icon`, !isWinner);
        }
        toggleDiv(winnerCard, `.player-${value.symbol}-icon`, !isWinner);
    });
};

const displayTieGameCard = (winnerCard) => {
    toggleDiv(winnerCard, "#winning-title");
    toggleDiv(winnerCard, ".player-icon");
    winnerCard.querySelector(".player-name").innerText = "It's a tie!";
};

export {
    updatePlayerCard,
    toggleActivePlayerCard,
    displayPlayersNames,
    showResultView,
    updateWinningCard,
    displayTieGameCard,
    togglePlayerTurn,
};
