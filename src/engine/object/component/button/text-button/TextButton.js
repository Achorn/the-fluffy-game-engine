import Text from "../../../text/Text";
import Button from "../Button";

export default class TextButton extends Button {
  constructor({
    startX,
    startY,
    width = 240,
    height = 60,
    onPress = () => {},
    onRelease = () => {},
    color,
    text = "BUTTON",
  }) {
    super({ startX, startY, width, height, onPress, onRelease, color });
    this.text = new Text({
      text: text,
      startX: this.startX + this.width * 0.5,
      startY: this.startY + this.height * 0.5,
      alignment: "center",
      baseline: "middle",
      color: "white",
    });
  }
  init() {
    super.init();
    this.text.startX = this.startX + this.width * 0.5;
    this.text.startY = this.startY + this.height * 0.5;
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
  draw(ctx) {
    super.draw(ctx);
    this.text.draw(ctx);
  }
  updateText(string) {
    this.text.text = string;
  }
}
