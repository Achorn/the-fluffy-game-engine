import Shape from "../Shape";

export default class Icon extends Shape {
  constructor({ startX = 0, startY = 0, size = 50, color = "purple", image }) {
    super({ startX, startY });
    this.image = image;
    this.color = color;
    this.size = size;
  }

  update(deltaTime) {}
  draw(ctx) {
    let proCtx = this.game.processingCtx;
    proCtx.globalCompositeOperation = "source-over";
    proCtx.fillStyle = this.color;
    proCtx.fillRect(this.startX, this.startY, this.size, this.size);
    proCtx.globalCompositeOperation = "destination-in";
    proCtx.drawImage(
      this.image,
      this.startX,
      this.startY,
      this.size,
      this.size
    );
    ctx.drawImage(
      this.game.processingCanvas,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
      0,
      0,
      ctx.canvas.width / this.game.ratio,
      ctx.canvas.height / this.game.ratio
    );
    proCtx.globalCompositeOperation = "source-over";
  }
}
