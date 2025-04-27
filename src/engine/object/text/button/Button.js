import Rectangle from "../../shape/rectangle/Rectangle";
import Shape from "../../shape/Shape";
import Text from "../Text";

export default class Button extends Shape {
  constructor({
    startX,
    startY,
    width = 240,
    height = 60,
    onClick = () => {},
    color = "blue",
  }) {
    super({ startX, startY });
    this.width = width;
    this.height = height;
    this.onClick = onClick();
    this.text = new Text({
      text: "BUTTON",
      startX: this.startX + this.width * 0.5,
      startY: this.startY + this.height * 0.5,
      alignment: "center",
      baseline: "middle",
      color: "white",
    });
    this.rectangle = new Rectangle({ startX, startY, color, width, height });
    this.init();
  }
  init() {}
  update(deltaTime) {}
  draw(ctx) {
    this.rectangle.draw(ctx);
    this.text.draw(ctx);
  }
}
