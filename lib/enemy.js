import { MovingObject } from './movingObject';

const BULLET_CONSTANTS = {
  vel: [0,3],
  rad: 5
};

class Bullet extends MovingObject {
  constructor(objWithPos){
    super(BULLET_CONSTANTS);
    let { pos, vel, rad, color } = objWithPos;
    this.pos = pos;
    this.color = color;
    this.resetPattern();
    if (vel) {this.vel = vel;}
    if (rad) {this.rad = rad;}
  }
}

export { Bullet };
