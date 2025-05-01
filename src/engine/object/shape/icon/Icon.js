import Shape from "../Shape";

export default class Icon extends Shape {
  constructor({
    image = image,
    color = "purple",
    startX = 10,
    startY = 10,
    size = 300,
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
    // let selectedImg = audioOn ? audioOnImg : audioOffImg;
    // let size = 130;
    // let startX = canvasWidth - paddingSides - size;
    // let startY = paddingTop * 0.5 - size * 0.5;
    // ctx.globalCompositeOperation = "source-over";

    // // draw color

    // set composite mode
    // // ctx.globalCompositeOperation = "source-over";
    // // ctx.globalCompositeOperation = "source-in";
    // // ctx.globalCompositeOperation = "source-out";
    // // ctx.globalCompositeOperation = "source-atop";
    // // ctx.globalCompositeOperation = "destination-over";

    // // ctx.globalCompositeOperation = "destination-in";
    // // ctx.globalCompositeOperation = "destination-out";
    // ctx.globalCompositeOperation = "destination-atop";
    // // draw image

    // ctx.fillRect(this.startX + 10, this.startY + 10, this.size, this.size);
    // ctx.beginPath();
    // ctx.scale(this.size, this.size);
    ctx.fillStyle = this.color;
    // ctx.translate(this.startX, this.startY);
    // ctx.fillStyle = this.color;
    // this.image.forEach((path) => {
    // let p = new Path2D(path);
    // ctx.fill(p);
    // });

    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.drawImage(this.image, this.startX, this.startY, this.size, this.size);
    // ctx.fillRect(this.startX, this.startY, this.size, this.size);

    // ctx.clip();
    // ctx.fillRect(this.startX + 10, this.startY + 10, this.size, this.size);
    // ctx.globalCompositeOperation = "source-over";
    // let p = new Path2D("M10 10 h 80 v 80 h -80 Z");
    // ctx.fill(p);
    // ctx.fill(new Path2D(this.image));
  }
}
