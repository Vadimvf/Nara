import { MovingObject } from './movingObject';

const ENEMY_TYPE_A_CONSTANTS = {
  rad: 20,
  vel: [0, 2],
};

class EnemyTypeA extends MovingObject {
  constructor(color){
    super(ENEMY_TYPE_A_CONSTANTS);
    this.pos = [Math.floor(Math.random() * 800), -10];
    this.dir = Math.random();
    if (color) {this.color = color;}
  }

  move(){
    let pos = this.pos;
    let vel = this.vel;
    this.pos = [(pos[0] + vel[0]), (pos[1] + vel[1])];
    if (pos[1] > 100 && this.dir > .5) {
      this.vel = [3, 6];
    }
    if (pos[1] > 100 && this.dir < .5) {
      this.vel = [-3, 6];
    }
  }
}

export { EnemyTypeA };
