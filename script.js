'use strict';
//Selecting Elements
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

let scores, currentScore, currentPlayer, playing;

//Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  score0El.innerHTML = 0;
  score1El.innerHTML = 0;
  current0El.innerHTML = 0;
  current1El.innerHTML = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.getElementById('name--0').innerHTML = "PLAYER 1"
  document.getElementById('name--1').innerHTML = "PLAYER 2"
}
init();
const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).innerHTML = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;// if the current player = 0 it will switch to 1 and the oposite
  console.log(`now it's player ${currentPlayer + 1} turn`);
  player0El.classList.toggle('player--active');//toggle will add a class if it's not there and if it is it will remove it
  player1El.classList.toggle('player--active');
}

//Rolling Dice Functionality
rollBtn.addEventListener('click', function(){
  if (playing){
    //generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //showing the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
  
    if(dice !== 1){
      //add dice in current score
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).innerHTML = currentScore;
    } else {
      //swicth to next player
      switchPlayer()
    }
  }
})

//Holding Mechanism
holdBtn.addEventListener('click', function(){
  if(playing){
    //add the current score to the active player's score
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).innerHTML = scores[currentPlayer];
    //checking if the players score is >= 100
    if(scores[currentPlayer] >= 20){
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      
      document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
      document.getElementById(`name--${currentPlayer}`).innerHTML = "The Winner"
    } else {
        switchPlayer();
    }
  }
})

//Resetting the game
newBtn.addEventListener('click', init)