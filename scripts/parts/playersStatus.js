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

const getPlayerCard = (playerTurn) => {
    return document.querySelector(`#player-${playerTurn}-card`);
};

const displayPlayersNames = (playerXname, playerOname) => {
    document.querySelector("#player-x-card .player-name").innerText = playerXname;
    document.querySelector("#player-o-card .player-name").innerText = playerOname;
};

const toggleResultView = (showResultView) => {
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

export { updatePlayerCard, toggleActivePlayerCard, getPlayerCard, displayPlayersNames, toggleResultView };
