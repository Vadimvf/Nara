import { Enemy } from './enemy';

const Game = {
  GAME_CONSTANTS: {
    NUM_ENEMIES: 10,
  },

  enemies: [],

  createEnemies: (dim) => {
    let _randomPos = () => {
      return [
        Math.floor(Math.random() * dim[0]),
        Math.floor(Math.random() * dim[1])
      ];
    };
    let { NUM_ENEMIES } = Game.GAME_CONSTANTS;

    for (let i = 0; i < NUM_ENEMIES; i++){
      Game.enemies[i] = new Enemy([0,0]);
    }
  },

  draw: (ctx, dim) => {
    ctx.clearRect(0,0, dim[0], dim[1]);
    Game.enemies.map(enemy => enemy.draw(ctx));
  },

  moveObjects: objects => Game.enemies.map(enemy => enemy.move())

};

export { Game };
