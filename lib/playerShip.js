import { MovingObject } from './movingObject';
import { Bullet } from './enemy';
import { Game } from './game';

const COLORS = {
  WHITE: "#e790e7",
  BLACK: "#93e4eb"
};

const PLAYER_CONSTANTS = {
  rad: 15,
  vel: [0,0],
  pos: [400, 600],
  BULLET_VELOCITIES: [[0, -10], [1.5, -10], [-1.5, -10]]
};


class Ship extends MovingObject {
  constructor(dim, healthBarCtx, totalDim){
    super(PLAYER_CONSTANTS);
    this._keyListeners();
    this.pressedKeys = {};
    this.health = 50;
    this.power = 0;
    this.lastFired = 0;
    this.lastColorSwitch = 0;
    this.bounds = dim;
  }

  move() {
    let pos = this.pos;
    let vel = this.vel;

    if (this.pressedKeys['DOWN']){
      this.vel[1] = 5;
    } else if (this.pressedKeys['UP']){
      this.vel[1] = -5;
    } else if (this.vel[1] > 0){
        this.vel[1] -= .25;
    } else if (this.vel[1] < 0){
        this.vel[1] += .25;
    }

    if (this.pressedKeys['RIGHT']){
      this.vel[0] = 5;
    } else if (this.pressedKeys['LEFT']){
        this.vel[0] = -5;
    } else if (this.vel[0] > 0){
        this.vel[0] -= .25;
    } else if (this.vel[0] < 0){
        this.vel[0] += .25;
    }

    let newPos = [(pos[0] + vel[0]), (pos[1] + vel[1])];
    this._updatePosWithinBounds(newPos);

    if (this.pressedKeys['SPACE']) { this.fire(); }
    if (this.pressedKeys['F']) { this.colorSwitch(); }
  }

  fire(numBullets=3){
    const _initialFire = numBullets => {
      for (let i = 0; i < numBullets; i++){
        Game.playerBullets.push(new Bullet({
          color: this.color,
          vel: PLAYER_CONSTANTS.BULLET_VELOCITIES[i],
          pos: this.pos
        }));
      }
      this.lastFired = Date.now();
    };

    if (Date.now() - this.lastFired > 100) { _initialFire(3); }
  }

  colorSwitch(){
    const _initialSwitch = () => {
      if (this.color === COLORS.WHITE){
        this.color = COLORS.BLACK;
      }else{
        this.color = COLORS.WHITE;
      }
      this.lastColorSwitch = Date.now();
    };

    if (Date.now() - this.lastColorSwitch > 750) { _initialSwitch(); }
  }

  hit(){
    this.health -= 3;
  }

  heal(){
    if (this.health < 50) {
      this.health += 1;
    }else if (this.power < 10) {
      this.power += 1;
    }else{
      for (let key in Game.ships){
        delete Game.ships[key];
      }
      this.power = 0;
    }

  }

  _updatePosWithinBounds(newPos){
    if (newPos[0] < this.bounds[0]-15 && newPos[0] > 15){
      this.pos[0] = newPos[0];
    }
    if (newPos[1] < this.bounds[1]-15 && newPos[1] > 15){
      this.pos[1] = newPos[1];
    }
  }

  _keyActions(e, status){
    let code = event.keyCode;
    let key;

    switch(code) {
      case 32:
      key = 'SPACE';
      break;
      case 37:
      key = 'LEFT';
      break;
      case 38:
      key = 'UP';
      break;
      case 39:
      key = 'RIGHT';
      break;
      case 40:
      key = 'DOWN';
      break;
      case 70:
      key = 'F';
      break;
    }

    this.pressedKeys[key] = status;
  }

  _keyListeners() {
    const self = this;
    document.addEventListener('keydown', function(e) {
      self._keyActions(e, true);
    });
    document.addEventListener('keyup', function(e) {
      self._keyActions(e, false);
    });
  }
}



export { Ship };
