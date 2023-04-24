// Data Model //
var game = {
  players: [],
};

// Query Selectors //
var advancedChoice = document.querySelector('.advanced');
var chooseWeapon = document.querySelector('.choose-your-weapon');
var changeGame = document.querySelector('.change-game');
var choiceDisplay = document.querySelector('.choice-display');
var classicChoice = document.querySelector('.classic');
var computerInfo = document.querySelector('.computer-player');
var choices = document.querySelector('.current-match');
var gameArea = document.querySelector('.game-area');
var gameBoard = document.querySelector('.game-board');
var gameResult = document.querySelector('.game-result');
var soundButton = document.querySelector('.mute');
var playerInfo = document.querySelector('.player-1');
var selectGame = document.querySelector('.screen-title');

var dragon = new Audio('./assets/dragonroar.mp3');
var paper = new Audio('./assets/paper.mp3');
var rock = new Audio('./assets/rock.mp3');
var sword = new Audio('./assets/sword.mp3');
var wizard = new Audio('./assets/wizardsound.mp3');

// Event Listeners //
window.addEventListener('load', function () {
  createPlayer('Human', './assets/straightface.png');
  createPlayer('Computer', './assets/computer.png');
  updatePlayerDom();
});

classicChoice.addEventListener('click', function () {
  createGame('classic');
  setClassicGameDom();
  prepareGameBoard();
});

advancedChoice.addEventListener('click', function () {
  createGame('advanced');
  setAdvancedGameDom();
  prepareGameBoard();
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
  updatePlayersDom();
  playAudio();
  hide(gameBoard);
  hide(changeGame);
  setTimeout(resetGameBoard, 4000);
});

soundButton.addEventListener('click', function () {
  soundToggle();
});

// Conjunction Junction, What's Your... //
function updatePlayerDom() {
  playerInfo.innerHTML = `
  <img src='${game.players[0].avatar}' alt="Player Avatar" class="avatar" />
  <h2>${game.players[0].name}</h2>
  <p class="player-wins">Wins: ${game.players[0].wins}</p>`;
  computerInfo.innerHTML = `
  <img src='${game.players[1].avatar}' alt="Player Avatar" class="avatar" />
  <h2>${game.players[1].name}</h2>
  <p class="player-wins">Wins: ${game.players[1].wins}</p>`;
}

function prepareGameBoard() {
  hide(advancedChoice);
  hide(classicChoice);
  hide(selectGame);
  show(chooseWeapon);
  show(gameBoard);
  show(choiceDisplay);
  show(changeGame);
}

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
    game.options = ['sword', 'parchment', 'boulder'];
  } else if (game.gameChoice === 'advanced') {
    game.options = ['boulder', 'sword', 'dragon', 'parchment', 'wizard'];
  }
}

function computerChoice() {
  var choice = game.options[Math.floor(Math.random() * game.options.length)];
  return choice;
}

function takeTurn(playerChoice) {
  game.compChoice = computerChoice();
  displayChoicesDom();
  if (checkForDraw(playerChoice, game.compChoice)) {
    updateTieDom();
  } else {
    return checkWhoWon(playerChoice, game.compChoice);
  }
}

function updateTieDom() {
  gameResult.innerText = `IT'S A TIE!`;
}

function displayChoicesDom() {
  choices.innerHTML = `<img src="./assets/${game.playerChoice}.png" class="${game.playerChoice}" />
  <img src="./assets/vs.png">
  <img src="./assets/${game.compChoice}.png" class="${game.compChoice}" />`;
}

function checkForDraw(playerChoice, computerChoice) {
  return playerChoice === computerChoice;
}

// Explain this function/maybe refactor//
function checkWhoWon(playerChoice, computerChoice) {
  var playerIndex = game.options.indexOf(playerChoice);
  var computerIndex = game.options.indexOf(computerChoice);
  var decider = (game.options.length - 1) / 2;
  if (
    (playerIndex < computerIndex && playerIndex + decider >= computerIndex) ||
    (playerIndex > computerIndex && playerIndex > computerIndex + decider)
  ) {
    game.players[0].wins++;
    game.currentWinner = playerChoice;
    updateWinnerDom(playerChoice, computerChoice);
  } else {
    game.players[1].wins++;
    game.currentWinner = computerChoice;
    updateLoserDom(computerChoice, playerChoice);
  }
}

function updateWinnerDom(playerChoice, computerChoice) {
  gameResult.innerText = `YOU WIN... ${playerChoice} beats ${computerChoice}!`;
}

function updateLoserDom(computerChoice, playerChoice) {
  gameResult.innerText = `You lost... ${computerChoice} beats ${playerChoice}.`;
}

function updatePlayersDom() {
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

function setAdvancedGameDom() {
  gameBoard.innerHTML = `
  <section class="advanced-choice-display">
    <section class="advanced-game">
    <img src="./assets/boulder.png" alt="Big Boulder" class="boulder hover" />
    <img src="./assets/parchment.png" alt="Parchment Paper" class="parchment hover" />
    <img src="./assets/sword.png" alt="Cutting sword" class="sword hover" />
    </section>
    <section class="advanced-game">
    <img src="./assets/dragon.png" alt="Dragon" class="dragon hover" />
    <img src="./assets/wizard.png" alt="Wizard" class="wizard hover" />
    </section>
  </section>`;
}

function setClassicGameDom() {
  gameBoard.innerHTML = `<section class="classic-game">
    <img src="./assets/boulder.png" alt="Big Boulder" class="boulder hover" />
    <img src="./assets/parchment.png" alt="Parchment Paper" class="parchment hover" />
    <img src="./assets/sword.png" alt="Cutting sword" class="sword hover" />
    </section>`;
}

function soundToggle() {
  if (game.sound === 'muted') {
    updateSoundDom();
    game.sound = 'sound on';
  } else {
    updateSoundDom();
    game.sound = 'muted';
  }
}

function updateSoundDom() {
  if (soundButton.innerText === 'SOUND ON') {
    soundButton.innerText = 'MUTED';
  } else {
    soundButton.innerText = 'SOUND ON';
  }
}

function playAudio() {
  if (game.playerChoice === game.compChoice || game.sound === 'muted') {
    return;
  }
  if (game.currentWinner === 'sword') {
    sword.volume = 0.2;
    sword.play();
  } else if (game.currentWinner === 'parchment') {
    paper.volume = 0.1;
    paper.play();
  } else if (game.currentWinner === 'boulder') {
    rock.volume = 0.1;
    rock.play();
  } else if (game.currentWinner === 'dragon') {
    dragon.volume = 0.2;
    dragon.play();
  } else {
    wizard.volume = 0.1;
    wizard.play();
  }
}