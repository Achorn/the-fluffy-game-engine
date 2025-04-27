import Shape from "../Shape";

export default class Rectangle extends Shape {
  constructor({
    startX = 0,
    startY = 0,
    width = 100,
    height = 100,
    color = "red",
  }) {
    super({ startX, startY });
    this.width = width;
    this.height = height;
    this.color = color;
  }
  update(deltaTime) {}
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.startX, this.startY, this.width, this.height);
  }
}
