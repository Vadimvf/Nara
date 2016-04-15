import { MovingObject } from './movingObject';

const ENEMY_TYPE_A_CONSTANTS = {
  rad: 20,
  vel: [0, 6],
};

class EnemyTypeA extends MovingObject {
  constructor(color){
    super(ENEMY_TYPE_A_CONSTANTS);
    this.pos = [Math.floor(Math.random() * 800), -10];
    if (color) {this.color = color;}
  }

  move(){
    let pos = this.pos;
    let vel = this.vel;

    this.pos = [(pos[0] + vel[0]), (pos[1] + vel[1])];
  }
}

export { EnemyTypeA };
