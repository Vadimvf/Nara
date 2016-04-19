import { Game } from './game';

let shouldGameRun = true;
let lostModal;

function start(ctx, dim) {
    Game.draw(ctx, dim);
    Game.moveObjects(ctx, dim);
    let gameAnimationId;

    if (shouldGameRun === true){
      gameAnimationId = requestAnimationFrame( () => start(ctx, dim));
    }
};

function run(){
  shouldGameRun = true;
};

function stop(finalScore){
  shouldGameRun = false;
};

export { start, stop, run };
