// Data Model //
var game = {
  players: [],
};

// Query Selectors //
var playerInfo = document.querySelector(".player-1");
var computerInfo = document.querySelector(".computer-player");
var classicChoice = document.querySelector(".classic");
var advancedChoice = document.querySelector(".advanced");
var gameArea = document.querySelector(".game-area");
var playerAvatar = document.querySelector(".player-1");
var selectGame = document.querySelector(".screen-title");
var classicGame = document.querySelector(".classic-game");
var advancedGame = document.querySelector(".advanced-game");
var chooseWeapon = document.querySelector(".choose-your-weapon");
var choiceDisplay = document.querySelector(".choice-display");
var changeGame = document.querySelector(".change-game");

// Event Listeners //
window.addEventListener("load", function () {
  createPlayer("Human", "./assets/straightface.png");
  createPlayer("Computer", "./assets/computer.png");
  playerInfo.innerHTML = `<img src='${game.players[0].avatar}' alt="Player Avatar" class="avatar" />
  <h2>${game.players[0].name}</h2>
  <p class="player-wins">Wins: ${game.players[0].wins}</p>`;
  computerInfo.innerHTML = `<img src='${game.players[1].avatar}' alt="Player Avatar" class="avatar" />
  <h2>${game.players[1].name}</h2>
  <p class="player-wins">Wins: ${game.players[1].wins}</p>`;
  console.log(game);
});

classicChoice.addEventListener("click", function () {
  hide(advancedChoice);
  hide(classicChoice);
  hide(selectGame);
  show(chooseWeapon);
  show(classicGame);
  show(choiceDisplay);
  show(changeGame);
  createGame("classic");
  console.log(game);
});

advancedChoice.addEventListener("click", function () {
  hide(advancedChoice);
  hide(classicChoice);
  hide(selectGame);
  show(chooseWeapon);
  show(advancedGame);
  show(choiceDisplay);
  show(changeGame);
  createGame("advanced");
});

classicGame.addEventListener("click", function (event) {
  if (event.target.classList.contains("boulder")) {
    console.log("clicked boulder");
  }
});

// Conjunction Junction, What's Your... //

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

function createPlayer(name, token) {
  game.players.push({
    name: name,
    avatar: token,
    wins: 0,
  });
}

function createGame(gameChoice) {
  game.gameChoice = gameChoice;
  if (game.gameChoice === "classic") {
    game.options = ["shears", "parchment", "boulder"];
  } else if (game.gameChoice === "advanced") {
    game.options = ["boulder", "shears", "dragon", "parchment", "wizard"];
  }
}

function computerChoice() {
  var choice = game.options[Math.floor(Math.random() * game.options.length)];
  return choice;
}

function takeTurn(playerChoice) {
  var compChoice = computerChoice();
  if (checkForDraw(playerChoice, compChoice)) {
    return `It's a tie!`;
  } else {
    return checkWhoWon(playerChoice, compChoice);
  }
}

function checkForDraw(playerChoice, computerChoice) {
  return playerChoice === computerChoice;
}

function checkWhoWon(playerChoice, computerChoice) {
  var playerIndex = game.options.indexOf(playerChoice);
  var computerIndex = game.options.indexOf(computerChoice);
  var decider = (game.options.length - 1) / 2;
  if (
    (playerIndex < computerIndex && playerIndex + decider >= computerIndex) ||
    (playerIndex > computerIndex && playerIndex > computerIndex + decider)
  ) {
    game.players[0].wins++;
    return `You win, ${playerChoice} beats ${computerChoice}!`;
  } else {
    game.players[1].wins++;
    return `You lose, ${computerChoice} beats ${playerChoice}.`;
  }
}

function changeAvatar() {
  if (game.players[0].wins === game.players[1].wins) {
  }
}
