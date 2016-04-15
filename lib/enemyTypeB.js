import { MovingObject } from './movingObject';
import { Bullet } from './enemy';
import { Game } from './game';

const ENEMY_TYPE_B_CONSTANTS = {
  rad: 15,
  vel: [0,3],

  BULLET_VELOCITIES: [[0,2], [1,2], [-1,2]]

};

class EnemyTypeB extends MovingObject {
  constructor(isSprayOn=false,color=null){
    super(ENEMY_TYPE_B_CONSTANTS);
    this.pos = [Math.floor(Math.random() * 800), 0];
    this.midPos = [Math.floor(Math.random() * 800), 800];
    this.endPos = [Math.floor(Math.random() * 800), 600];
    this.counter = 0;
    this.isSprayOn = isSprayOn;
    if (color){ this.color = color; };
  }

  move(){
    let pos = this.pos;
    let vel = this.vel;
    let goalPos = this.midPos;
    let diffX = pos[0] - goalPos[0];
    let diffY = pos[1] - goalPos[1];
    if (diffX < -20 && this.counter < 10){
      this.vel[0] = 3;
    } else if (diffX > 20 && this.counter < 10) {
      this.vel[0] = -3;
    } else {
      this.vel[0] = 0;
      this.counter += 1;
    }

    if (diffY < -20 && this.counter < 10){
      this.vel[1] = 3;
    } else if (diffY > 20 && this.counter < 10) {
      this.vel[1] = -3;
    } else {
      this.vel[1] = -3;
    }

    if (this.isSprayOn){
      if(this.counter > 30){ this.counter = 0; }
    }

    if (this.counter === 3) {
      this._fire(3);
      this.counter +=1;
    }

    this.pos = [(pos[0] + vel[0]), (pos[1] + vel[1])];
  }

  _fire(numBullets){
    for (let i = 0; i < numBullets; i++){
      Game.bullets.push(new Bullet({
        color: this.color,
        vel: ENEMY_TYPE_B_CONSTANTS.BULLET_VELOCITIES[i],
        pos: this.pos
      }));
    }
  }

}

export { EnemyTypeB };
