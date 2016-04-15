import { Game } from './game';

function start(ctx, dim) {
    // let now = Date.now();
    // let dt = (now - lastTime) / 1000.0;

    // update(dt);
    // render();
    //
    // let lastTime = now;
    const T1 = Date.now();
    Game.draw(ctx, dim);
    Game.moveObjects(ctx, dim);
    // console.log(Date.now() - T1);
    let gameAnimation = requestAnimationFrame( () => start(ctx, dim));
};

export { start };
