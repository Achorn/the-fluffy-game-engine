import { assets } from "../../engine/assetLoader";
import Circle from "../../engine/object/shape/circle/Circle";
import Rectangle from "../../engine/object/shape/rectangle/Rectangle";
import Button from "../../engine/object/text/button/Button";
import Text from "../../engine/object/text/Text";
import State from "./State";

export default class GameEngineExamplesState extends State {
  constructor() {
    super();
    this.image = assets.get("albumCover");
    this.text = new Text({ text: "Game Engine Object Examples" });
    this.rectangle = new Rectangle({ startY: 50 });
    this.circle = new Circle({ startY: 150 });
    this.button = new Button({ startY: 250 });
  }
  update(deltaTime) {
    this.rectangle.update(deltaTime);
  }
  draw(ctx) {
    // ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
    this.rectangle.draw(ctx);
    this.circle.draw(ctx);
    this.text.draw(ctx);
    this.button.draw(ctx);
  }
}
