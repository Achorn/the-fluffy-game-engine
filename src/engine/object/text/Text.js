import Shape from "../shape/Shape";

export default class Text extends Shape {
  constructor({
    startX = 0,
    startY = 0,
    text = "Text Object",
    size = 30,
    font = "Arial",
    color = "black",
    alignment = "left",
    baseline = "top",
  }) {
    super({ startX, startY });
    this.text = text;
    this.size = size;
    this.font = font;
    this.color = color;
    this.alignment = alignment;
    this.baseline = baseline;
  }

  update(deltaTime) {}
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.textBaseline = this.baseline;
    ctx.textAlign = this.alignment;
    ctx.font = `${this.size}px ${this.font}`;
    ctx.fillText(this.text, this.startX, this.startY);
  }
}
