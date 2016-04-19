import { Game } from './game';

let shouldGameRun = true;
let lostModal;
let restartButton;
let restartGame;
let gameAnimationId;
let scores = [];
let scoreNodeEl;

function setLostCall(modal, start, startGame){
  lostModal = modal;
  restartButton = start;
  restartGame = startGame;
};

function start(ctx, dim) {
    Game.draw(ctx, dim);
    Game.moveObjects(ctx, dim);

    if (shouldGameRun === true){
      gameAnimationId = requestAnimationFrame( () => start(ctx, dim));
    }

    return gameAnimationId;
};

function run(){
  shouldGameRun = true;
  cancelAnimationFrame(gameAnimationId);
};

function stop(finalScore){
  scores.push(` ${finalScore}`);
  scores.sort((a,b) => b - a);
  if (scores.length > 5){ scores.length = 5; }
  shouldGameRun = false;
  lostModal.className = "modal-container modal-lost";

  if (scoreNodeEl){
    let newScores = document.createElement('ul');
    let temp = newScores;

    newScores.innerHTML = `
     <li><h1 class="final-score">${finalScore}</h1></li>
     <li><h3>Your Top Five:  ${scores}</h3></li>`;

    lostModal.children[0].replaceChild(newScores, scoreNodeEl);
    scoreNodeEl = temp;
  }else{
    lostModal.children[0].insertAdjacentHTML('afterbegin',
      `<ul>
       <li><h1 class="final-score">${finalScore}</h1></li>
       <li><h3>Your Top 5:  ${scores}</h3></li>
       </ul>`);
       scoreNodeEl = lostModal.children[0].children[0];
  }

  restartButton.addEventListener("click", restartGame);
};


export { start, run, setLostCall, stop };
