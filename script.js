'use strict';

const socket = io("http://localhost:3000");


const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// UI RESET 

const initUI = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  document.getElementById('name--0').textContent = "PLAYER 1";
  document.getElementById('name--1').textContent = "PLAYER 2";
};

initUI();

// 🎲 Dice roll result
socket.on("dice", (dice) => {
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
});

// Full game state
socket.on("state", (state) => {
  // Scores
  score0El.textContent = state.scores[0];
  score1El.textContent = state.scores[1];

  // Current scores
  current0El.textContent =
    state.currentPlayer === 0 ? state.currentScore : 0;
  current1El.textContent =
    state.currentPlayer === 1 ? state.currentScore : 0;

  // Active player UI
  player0El.classList.toggle('player--active', state.currentPlayer === 0);
  player1El.classList.toggle('player--active', state.currentPlayer === 1);

  // Winner
  if (!state.playing) {
    const winner = document.querySelector(`.player--${state.currentPlayer}`);
    winner.classList.add('player--winner');
    document.getElementById(`name--${state.currentPlayer}`).textContent =
      "The Winner";
  }
});

rollBtn.addEventListener('click', () => {
  socket.emit("rollDice");
});

holdBtn.addEventListener('click', () => {
  socket.emit("hold");
});

newBtn.addEventListener('click', () => {
  socket.emit("newGame");
  initUI();
});
