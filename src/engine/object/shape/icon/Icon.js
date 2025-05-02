import Shape from "../Shape";

export default class Icon extends Shape {
  constructor({
    image = image,
    color = "purple",
    startX = 300,
    startY = 100,
    size = 50,
  }) {
    super({ startX, startY });
    this.image = image;
    this.color = color;
    this.size = size;
    // init ()
  }
  // this.init(){
  //update icon
  // }

  update(deltaTime) {}
  draw(ctx) {
    let proCtx = this.game.processingCtx;

    proCtx.globalCompositeOperation = "source-over";
    proCtx.fillRect(this.startX, this.startY, this.size, this.size);
    proCtx.fillStyle = this.color;
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
    // alter iamge with color
    // draw canvas on canvase
    //clear processing canvas
    // ctx.fillRect(this.startX, this.startY, this.size, this.size);

    // ctx.clip();
    // ctx.fillRect(this.startX + 10, this.startY + 10, this.size, this.size);
    proCtx.globalCompositeOperation = "source-over";
    // let p = new Path2D("M10 10 h 80 v 80 h -80 Z");
    // ctx.fill(p);
    // ctx.fill(new Path2D(this.image));
  }
}
