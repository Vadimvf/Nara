const COLORS = {
  WHITE: "#e790e7",
  BLACK: "#93e4eb",
};

const PATTERNS = {
  WHITE: null,
  BLACK: null,
};

const _randomColor = function (id){
  if (Math.random() < .5){
    return COLORS.WHITE;
  }else {
    return COLORS.BLACK;
  }
};

const _pattern = function(color){
  let img;
  let pattern;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext('2d');
  if (color === COLORS.WHITE){
    img = document.getElementById("pinkPattern");
    pattern = ctx.createPattern(img, 'repeat');
  }else{
    img = document.getElementById("bluePattern");
    pattern = ctx.createPattern(img, 'repeat');
  }

  return pattern;
};

class MovingObject {
  constructor({pos, vel, rad}, colorOveride=null) {
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;
    this.color =  _randomColor();
    if (colorOveride){ this.color = colorOveride; }
    this.pattern = _pattern(this.color);
  }

  toString() {
    return `(${this.pos}, ${this.vel}, ${this.rad}, ${this.color})`;
  }

  draw(ctx) {
    let { color, pos, rad } = this;
    ctx.fillStyle = this.pattern;
    ctx.beginPath();

    ctx.arc(
      pos[0],
      pos[1],
      rad,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

    if (rad === 14){
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffcd00';
      ctx.stroke();
    }else{
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    }
  }

  move() {
    let pos = this.pos;
    let vel = this.vel;
    this.pos = [(pos[0] + vel[0]), (pos[1] + vel[1])];
  }

  resetPattern() {
    this.pattern = _pattern(this.color);
  }
}

export { MovingObject };
