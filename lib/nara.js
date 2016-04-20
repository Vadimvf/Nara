import { Game } from './game';
import { start, run, setLostCall } from './gameView';

document.addEventListener("DOMContentLoaded", e => {

const background = document.getElementById('nara-background');
const middleground = document.getElementById('nara-middleground');
const foreground = document.getElementById('nara-foreground');
const totalWidth = background.clientWidth;
const totalHeight = background.clientHeight;
const playerWidth = foreground.clientWidth;
const playerHeight = foreground.clientHeight;
const dim = [playerWidth, playerHeight];
const totalDim = [totalWidth, totalHeight];
const ctx = foreground.getContext("2d");
const healthBarCtx = middleground.getContext("2d");
const backgroundCtx = background.getContext("2d");
const Nara = window.Nara || {};
const startButton = document.getElementsByClassName('right-size')[0];
const restartButton = document.getElementsByClassName('restart')[0];
const startModal = document.getElementsByClassName('modal-container')[0];
const lostModal = document.getElementsByClassName('modal-lost')[0];
const train = document.getElementsByClassName('train')[0];
const exitTrain = document.getElementsByClassName('exit-train')[0];

background.width = totalWidth;
background.height = totalHeight;
middleground.width = totalWidth;
middleground.height = totalHeight;
foreground.width = playerWidth;
foreground.height = playerHeight;


let isFirstRender = true;
Game.createElements(dim, healthBarCtx, totalDim, isFirstRender);
let gameAnimation = start(ctx, dim);

const startGame = () => {
  startModal.className = "hidden";
  lostModal.className = "hidden";
  run(ctx, totalDim);
  Game.reset(ctx, totalDim);
  Game.createElements(dim, healthBarCtx, totalDim);
  setLostCall(lostModal, restartButton, startGame);
  if (!isFirstRender){
    gameAnimation = start(ctx, dim, backgroundCtx);
  }
  isFirstRender = false;
};

startButton.addEventListener("click", startGame);

train.addEventListener("click", () =>{
  startModal.className = "hidden";
  train.className = "hidden";
  exitTrain.className = "exit-train";

});

exitTrain.addEventListener("click", () =>{
  startModal.className = "modal-container";
  train.className = "train";
  exitTrain.className = "hidden";
});


});
