import { assets } from "../../engine/assetLoader";
import Circle from "../../engine/object/shape/circle/Circle";
import Rectangle from "../../engine/object/shape/rectangle/Rectangle";
import State from "./State";

export default class LevelOne extends State {
  constructor() {
    super();
    this.image = assets.get("albumCover");
    this.rectangle = new Rectangle({});
    this.circle = new Circle({ startY: 100 });
    console.log(this.image);
  }
  update(deltaTime) {
    this.rectangle.update(deltaTime);
  }
  draw(ctx) {
    // ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
    this.rectangle.draw(ctx);
    this.circle.draw(ctx);
  }
}
