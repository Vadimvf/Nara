import { MovingObject } from './movingObject';

const COLORS = {
  WHITE: "#e790e7",
  BLACK: "#93e4eb"
};

const PLAYER_CONSTANTS = {
  rad: 15,
  vel: [0,0],
  pos: [400, 600]
};


class Ship extends MovingObject {
  constructor(){
    super(PLAYER_CONSTANTS);
  }
}

export { Ship };
