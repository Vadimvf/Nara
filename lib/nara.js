import { Game } from './game';
import { start, run, gameLost } from './gameView';

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
const Nara = window.Nara || {};
const startButton = document.getElementsByClassName('right-size')[0];
const startModal = document.getElementsByClassName('modal-container')[0];
const lostModal = document.getElementsByClassName('modal-lost')[0];

background.width = totalWidth;
background.height = totalHeight;
middleground.width = totalWidth;
middleground.height = totalHeight;
foreground.width = playerWidth;
foreground.height = playerHeight;

const startGame = () => {
  startModal.className = "hidden";
  run(ctx, totalDim);
  Game.reset(ctx, totalDim);
  Game.createElements(dim, healthBarCtx, totalDim);
  setLostCall(animation, lostModal);
};

Game.createElements(dim, healthBarCtx, totalDim);
let animation = start(ctx, dim);
startButton.addEventListener("click", startGame);


});
