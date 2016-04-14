import { MovingObject } from './movingObject';

const ENEMY_CONSTANTS = {
  //enemy type to toggle
  COLORS: {
    WHITE: "#e790e7",
    BLACK: "#93e4eb"
  },

  //enemy defaults
  rad: 10,
  vel: [2, 2],
  color: "#e790e7"

};

class Enemy extends MovingObject {
  constructor(pos){
    super(ENEMY_CONSTANTS);
    this.pos = pos;
  }
  static switchType(){
    let currentColor = ENEMY_CONSTANTS.color;
    let white = ENEMY_CONSTANTS.COLORS.WHITE;
    let black = ENEMY_CONSTANTS.COLORS.BLACK;

    currentColor = (currentColor === black)? white : black;
  }

}

export { Enemy };
