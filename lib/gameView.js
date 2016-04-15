import { Game } from './game';

function start(ctx, dim, healthBarCtx, totalDim) {
    Game.draw(ctx, dim, healthBarCtx, totalDim);
    Game.moveObjects(ctx, dim);

    let gameAnimation = requestAnimationFrame( () => start(ctx, dim));
};

export { start };
