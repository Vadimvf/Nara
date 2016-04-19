class HealthBar {
  constructor(ctx, dim){
    this.width = 50;
    this.health = 50;
    this.power = 0;
    const x = ((dim[0] - 800) / 2) - 50;
    const y = dim[1];
    this.pos = [x,y];
    this.ctx = ctx;
    this.dim = dim;
    this.score = 0;
  }
  draw(){
    this.ctx.clearRect(0,0, this.dim[0], this.dim[1]);
    this.ctx.fillStyle = "#7f4c87";
    this.ctx.font = "18px adventor-regular";
    this.ctx.fillText(`${this.score}`, this.pos[0]+855, 50);
    this.ctx.fillStyle = "#a4ff49";
    this.ctx.strokeStyle = "#708e52";
    this.ctx.fillRect(this.pos[0],
                      this.pos[1],
                      this.width,
                      this.health * -10);
    this.ctx.strokeRect(this.pos[0],
                      this.pos[1],
                      this.width,
                      -500);
    this.ctx.fillRect(this.pos[0]+850,
                      this.pos[1],
                      this.width,
                      this.power * -10);
    this.ctx.strokeRect(this.pos[0]+850,
                      this.pos[1],
                      this.width,
                      -500);
  }
  addPoints(points){
    this.score += points;
  }
}


export { HealthBar };
