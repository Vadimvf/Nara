import { Game } from './game';

function start(ctx, dim) {
    // let now = Date.now();
    // let dt = (now - lastTime) / 1000.0;

    // update(dt);
    // render();
    //
    // let lastTime = now;
    // requestAnimFrame(start);
    Game.draw(ctx, dim);
    Game.moveObjects();
    console.log("draw");
    setTimeout(() => start(ctx, dim), 20);
};

export { start };
