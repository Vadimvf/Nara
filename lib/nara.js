import { start } from './gameView';
import { Game } from './game';

document.addEventListener("DOMContentLoaded", e => {

const background = document.getElementById('nara-background');
const middleground = document.getElementById('nara-middleground');
const foreground = document.getElementById('nara-foreground');
const totalWidth = background.clientWidth;
const totalHeight = background.clientHeight;
const playerWidth = foreground.clientWidth;
const playerHeight = foreground.clientHeight;
const dim = [playerWidth, playerHeight];
const ctx = foreground.getContext("2d");
const Nara = window.Nara || {};

background.width = totalWidth;
background.height = totalHeight;
middleground.width = totalWidth;
middleground.height = totalHeight;
foreground.width = playerWidth;
foreground.height = playerHeight;

Game.createEnemies(dim);
start(ctx, dim);


});
