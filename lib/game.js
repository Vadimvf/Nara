import { Enemy } from './enemy';
import { EnemyTypeA } from './enemyTypeA';
import { EnemyTypeB } from './enemyTypeB';
import { EnemyTypeC } from './enemyTypeC';
import { Ship } from './playerShip';

const Game = {
  GAME_CONSTANTS: {
    NUM_ENEMIES: 50,
  },

  ships: {},
  bullets: [],
  playerBullets: [],
  toDelete: [],
  ship: {},

  createEnemies: (dim, healthBarCtx, totalDim) => {
    let _randomPos = () => {
      return [
        Math.floor(Math.random() * dim[0]),
        Math.floor(Math.random() * dim[1])
      ];
    };
    let { NUM_ENEMIES } = Game.GAME_CONSTANTS;

    Game.ship = new Ship(dim, healthBarCtx, totalDim);
    for (let i = 0; i < NUM_ENEMIES; i++){
      Game.ships[i] = new EnemyTypeB(true);
      // Game.ships[-i-1] = new EnemyTypeA();
    }
  },

  draw: (ctx, dim) => {
    ctx.clearRect(0,0, dim[0], dim[1]);
    Game.ship.draw(ctx);
    for (let key in Game.ships){
      Game.ships[key].draw(ctx);
    }

    Game.bullets.forEach((bullet, idx) => bullet.draw(ctx));
    Game.playerBullets.forEach((bullet, idx) => bullet.draw(ctx));
  },

  moveObjects: function (ctx, dim){

    for (let key in Game.ships){
      let enemy = Game.ships[key];
      Game._checkCollision(enemy, key);
      Game._checkPlayerBulletCollision(enemy, key);
      if (enemy.pos[1] > dim[1] || enemy.pos[1] < -20){
        delete Game.ships[key];
        continue;
      }
      enemy.move();
    }

    for (let i = 0; i < Game.bullets.length; i++){
      if (Game._checkBulletCollision(Game.bullets[i], i)){
        continue;
      }
      if (Game.bullets[i].pos[1] > dim[1]){
        Game.bullets.splice(i, 1);
        continue;
      }
      Game.bullets[i].move();
    }

    for (let i = 0; i < Game.playerBullets.length; i++){

      if (Game.playerBullets[i].pos[1] > dim[1]){
        Game.playerBullets.splice(i, 1);
        continue;
      }
      Game.playerBullets[i].move();
    }

    Game.ship.move();
  },


  _checkCollision: function (enemy, key){
    let posShip = Game.ship.pos;
    let enemyPos = enemy.pos;
    let dx = posShip[0] - enemyPos[0];
    let dy = posShip[1] - enemyPos[1];
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < Game.ship.rad + enemy.rad){
      if (Game.ship.color === enemy.color){
        delete Game.ships[key];
      }else{
        delete Game.ships[key];
      }
    }
  },

  _checkBulletCollision: function (enemy, idx){
    let posShip = Game.ship.pos;
    let enemyPos = enemy.pos;
    let dx = posShip[0] - enemyPos[0];
    let dy = posShip[1] - enemyPos[1];
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < Game.ship.rad + enemy.rad){
      if (Game.ship.color === enemy.color){
        Game.ship.heal();
        Game.bullets.splice(idx, 1);
        return true;
      }else{
        Game.ship.hit();
        Game.bullets.splice(idx, 1);
        return true;
      }
    }
  },

  _checkPlayerBulletCollision:function (enemy, key){
    let bullets = Game.playerBullets;
    let enemyPos = enemy.pos;

    for (let i = 0; i< bullets.length; i++){
      let bullet = bullets[i];
      let dx = bullet.pos[0] - enemyPos[0];
      let dy = bullet.pos[1] - enemyPos[1];
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < bullet.rad + enemy.rad){
        if (Game.ship.color === enemy.color){
          Game.playerBullets.splice(i, 1);
          i--;
          delete Game.ships[key];
          continue;
        }else{
          Game.playerBullets.splice(i, 1);
          i--;
          delete Game.ships[key];
          continue;
        }
      }
    }
  }


};

export { Game };
