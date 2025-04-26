import Object from "../../Object";

export default class Circle extends Object {
  constructor({ startX = 0, startY = 0, radius = 50, color = "red" }) {
    super({ startX, startY });
    this.radius = radius;
    this.color = color;
  }
  update(deltaTime) {}
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.startX + this.radius,
      this.startY + this.radius,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
