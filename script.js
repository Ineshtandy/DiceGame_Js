'use strict';

//Selecting elements
// let sectionP0 = document.querySelector('.player--0');
// let sectionP1 = document.querySelector('.player--1');
let scoreP0 = document.querySelector('#score--0');
let scoreP1 = document.getElementById('score--1');
let currP0 = document.getElementById('current--0');
let currP1 = document.getElementById('current--1');
let diceElm = document.querySelector('.dice');
let newBtn = document.querySelector('.btn--new');
let rollBtn = document.querySelector('.btn--roll');
let holdBtn = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreP0.textContent = 0;
  scoreP1.textContent = 0;
  currP0.textContent = 0;
  currP1.textContent = 1;

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  diceElm.classList.add('hidden');
};
init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //method 1 of shifting bg clr for active player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  //method 2 of shifting bg clr for active player; toggle removes or adds depending on curr state
  // secP0.classList.toggle('player--active');
  // secP1.classList.toggle('player--active');

  currentScore = 0;
};

//dice roll functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    // 1. generate random no.
    let randomNum = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNum);

    // 2. display dice
    diceElm.classList.remove('hidden');
    diceElm.src = `dice-${randomNum}.png`;

    // 3. check for 1
    if (randomNum !== 1) {
      //add to current
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player; set curr score to 0; display of cur to be 0 ;shift background colour of activePlayer
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. adding curr score to total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check <= 100    // 3. switch player
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceElm.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
