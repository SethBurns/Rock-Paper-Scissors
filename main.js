// Data Model //
var game = {};

// Event Listeners //
var classic = document.querySelector('.classic')
var advanced = document.querySelector('.advanced')



function createPlayer(name, token) {
  var player = {
    name: name,
    token: token,
    // wins: 0,
  };
  return player;
}

function createGame(gameChoice) {
  game.players = [
    createPlayer("Human", "./assets/straightface.png"),
    createPlayer("Computer", "./assets/computer.png"),
  ];
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
