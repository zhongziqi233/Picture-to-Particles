/* eslint-disable no-unused-vars, no-empty */
export default class Particle {
  constructor(color, pos, range, time, inten, radius) {
    this.color = color;
    this.pos = pos;
    this.range = range;
    this.time = time;
    this.inten = inten;
    this.radius = radius;
    let rx = Math.random() * this.range[0];
    let ry = Math.random() * this.range[1];
    this.randomDistance = [this.pos[0] - rx, this.pos[1] - ry];
    this.randomPos = [rx, ry];
    this.currentPos = [rx, ry];
  }

  update(mouseX, mouseY) {
    this.randomDistance[0] = this.pos[0] - this.currentPos[0];
    this.randomDistance[1] = this.pos[1] - this.currentPos[1];
    this.speedX = this.randomDistance[0] / this.time;
    this.speedY = this.randomDistance[1] / this.time;
    if (mouseX && mouseY) {
      let dx = mouseX - this.currentPos[0];
      let dy = mouseY - this.currentPos[1];
      let distance = Math.sqrt(dx ** 2 + dy ** 2);
      let disPercent = this.radius / distance;
      disPercent = disPercent > 3 ? 3 : disPercent;
      if(distance < this.radius) {
        let angle = Math.atan2(dy, dx);
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let repX = cos * disPercent * -this.inten;
        let repY = sin * disPercent * -this.inten;
        this.speedX += repX;
        this.speedY += repY;
      }
    }
    this.currentPos = [this.currentPos[0] + this.speedX, this.currentPos[1] + this.speedY];
    return this.currentPos;
  }
}