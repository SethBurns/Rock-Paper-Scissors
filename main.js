// Data Model //
var game = {
  players: [],
};

// Query Selectors //
var playerInfo = document.querySelector('.player-1');
var computerInfo = document.querySelector('.computer-player');
var classicChoice = document.querySelector('.classic');
var advancedChoice = document.querySelector('.advanced');
var gameArea = document.querySelector('.game-area');
var selectGame = document.querySelector('.screen-title');
var gameBoard = document.querySelector('.game-board');
var chooseWeapon = document.querySelector('.choose-your-weapon');
var choiceDisplay = document.querySelector('.choice-display');
var changeGame = document.querySelector('.change-game');
var gameResult = document.querySelector('.game-result');
var choices = document.querySelector('.current-match');

// Event Listeners //
window.addEventListener('load', function () {
  createPlayer('Human', './assets/straightface.png');
  createPlayer('Computer', './assets/computer.png');
  playerInfo.innerHTML = `
  <img src='${game.players[0].avatar}' alt="Player Avatar" class="avatar" />
  <h2>${game.players[0].name}</h2>
  <p class="player-wins">Wins: ${game.players[0].wins}</p>`;
  computerInfo.innerHTML = `
  <img src='${game.players[1].avatar}' alt="Player Avatar" class="avatar" />
  <h2>${game.players[1].name}</h2>
  <p class="player-wins">Wins: ${game.players[1].wins}</p>`;
});

classicChoice.addEventListener('click', function () {
  createGame('classic');
  setClassicGame();
  hide(advancedChoice);
  hide(classicChoice);
  hide(selectGame);
  show(chooseWeapon);
  show(gameBoard);
  show(choiceDisplay);
  show(changeGame);
});

advancedChoice.addEventListener('click', function () {
  createGame('advanced');
  setAdvancedGame();
  hide(advancedChoice);
  hide(classicChoice);
  hide(selectGame);
  show(chooseWeapon);
  show(gameBoard);
  show(choiceDisplay);
  show(changeGame);
});

changeGame.addEventListener('click', function () {
  hide(gameBoard);
  hide(chooseWeapon);
  hide(choiceDisplay);
  hide(changeGame);
  show(advancedChoice);
  show(classicChoice);
  show(selectGame);
});

gameBoard.addEventListener('click', function (event) {
  for (var i = 0; i < game.options.length; i++) {
    if (event.target.classList.contains(game.options[i])) {
      game.playerChoice = game.options[i];
    }
  }
  takeTurn(game.playerChoice);
  updatePlayers();
  hide(gameBoard);
  hide(changeGame);
  setTimeout(resetGameBoard, 5000);
});

// Conjunction Junction, What's Your... //

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function resetGameBoard() {
  gameResult.innerText = `Who Will Win?`;
  choices.innerHTML = ``;
  show(gameBoard);
  show(changeGame);
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
  if (game.gameChoice === 'classic') {
    game.options = ['shears', 'parchment', 'boulder'];
  } else if (game.gameChoice === 'advanced') {
    game.options = ['boulder', 'shears', 'dragon', 'parchment', 'wizard'];
  }
}

function computerChoice() {
  var choice = game.options[Math.floor(Math.random() * game.options.length)];
  return choice;
}

function takeTurn(playerChoice) {
  game.compChoice = computerChoice();
  // game.playerChoice = playerChoice;
  choices.innerHTML = `<img src="./assets/${game.playerChoice}.png" class="${game.playerChoice}" />
  <img src="./assets/vs.png">
  <img src="./assets/${game.compChoice}.png" class="${game.compChoice}" />`;
  if (checkForDraw(playerChoice, game.compChoice)) {
    gameResult.innerText = `IT'S A TIE!`;
  } else {
    return checkWhoWon(playerChoice, game.compChoice);
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
    gameResult.innerText = `YOU WIN! ${playerChoice} beats ${computerChoice}!`;
  } else {
    game.players[1].wins++;
    gameResult.innerText = `You lost... ${computerChoice} beats ${playerChoice}.`;
  }
}

function updatePlayers() {
  if (game.players[0].wins === game.players[1].wins) {
    game.players[0].avatar = './assets/straightface.png';
  } else if (game.players[0].wins < game.players[1].wins) {
    game.players[0].avatar = './assets/sadface.png';
  } else {
    game.players[0].avatar = './assets/smileyface.png';
  }
  playerInfo.innerHTML = `
  <img src='${game.players[0].avatar}' alt="Player Avatar" class="avatar" />
  <h2>${game.players[0].name}</h2>
  <p class="player-wins">Wins: ${game.players[0].wins}</p>`;
  computerInfo.innerHTML = `
  <img src='${game.players[1].avatar}' alt="Player Avatar" class="avatar" />
  <h2>${game.players[1].name}</h2>
  <p class="player-wins">Wins: ${game.players[1].wins}</p>`;
}

function setAdvancedGame() {
  gameBoard.innerHTML = `<section class="advanced-game">
    <img src="./assets/boulder.png" alt="Big Boulder" class="boulder hover" />
    <img src="./assets/parchment.png" alt="Parchment Paper" class="parchment hover" />
    <img src="./assets/shears.png" alt="Cutting Shears" class="shears hover" />
    <img src="./assets/dragon.png" alt="Dragon" class="dragon hover" />
    <img src="./assets/wizard.png" alt="Wizard" class="wizard hover" />
  </section>`;
}

function setClassicGame() {
  gameBoard.innerHTML = `<section class="classic-game">
    <img src="./assets/boulder.png" alt="Big Boulder" class="boulder hover" />
    <img src="./assets/parchment.png" alt="Parchment Paper" class="parchment hover" />
    <img src="./assets/shears.png" alt="Cutting Shears" class="shears hover" />
    </section>`;
}
