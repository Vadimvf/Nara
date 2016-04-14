class MovingObject {
  constructor({pos, vel, rad, color}) {
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;
    this.color = color;
  }

  toString() {
    return `(${this.pos}, ${this.vel}, ${this.rad}, ${this.color})`;
  }

  draw(ctx) {
    let { color, pos, rad } = this;
    ctx.fillStyle = color;
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
  }

  move() {
    let pos = this.pos;
    let vel = this.vel;
    this.pos = [(pos[0] + vel[0]), (pos[1] + vel[1])];
  }
}

export { MovingObject };
