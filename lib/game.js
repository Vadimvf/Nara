import { Enemy } from './enemy';
import { EnemyTypeA } from './enemyTypeA';
import { EnemyTypeB } from './enemyTypeB';
import { Ship } from './ship';

const Game = {
  GAME_CONSTANTS: {
    NUM_ENEMIES: 2,
  },

  enemies: {},
  bullets: [],
  toDelete: [],
  ship: {},

  createEnemies: (dim) => {
    let _randomPos = () => {
      return [
        Math.floor(Math.random() * dim[0]),
        Math.floor(Math.random() * dim[1])
      ];
    };
    let { NUM_ENEMIES } = Game.GAME_CONSTANTS;

    Game.ship = new Ship();

    for (let i = 0; i < NUM_ENEMIES; i++){
      Game.enemies[i] = new EnemyTypeB(true);
      Game.enemies[-i-1] = new EnemyTypeA();
    }
  },

  draw: (ctx, dim) => {
    ctx.clearRect(0,0, dim[0], dim[1]);

    for (let key in Game.enemies){
      Game.enemies[key].draw(ctx);
    }

    Game.bullets.forEach((bullet, idx) => bullet.draw(ctx));
  },

  moveObjects: function (ctx, dim){
    for (let key in Game.enemies){
      let enemy = Game.enemies[key];
      if (enemy.pos[1] > dim[1] || enemy.pos[1] < -20){
        delete Game.enemies[key];
        continue;
      }
      enemy.move();
    }

    for (let i = 0; i < Game.bullets.length; i++){
      if (Game.bullets[i].pos[1] > dim[1]){
        Game.bullets.splice(i, 1);
        continue;
      }
      Game.bullets[i].move();
    }
  }

};

export { Game };
