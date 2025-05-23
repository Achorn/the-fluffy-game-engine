import Rectangle from "../../shape/rectangle/Rectangle";
import Shape from "../../shape/Shape";
import Text from "../../text/Text";

export default class Button extends Shape {
  constructor({
    startX,
    startY,
    width = 240,
    height = 60,
    onPress = () => {},
    onRelease = () => {},
    color = "blue",
  }) {
    super({ startX, startY });
    this.width = width;
    this.height = height;
    this.onPress = onPress;
    this.onRelease = onRelease;
    this.rectangle = new Rectangle({ startX, startY, color, width, height });
    this.isPressed = false;
  }
  init() {
    this.rectangle = new Rectangle({
      startX: this.startX,
      startY: this.startY,
      color: this.color,
      width: this.width,
      height: this.height,
    });
  }
  update() {
    if (!this.isPressed) {
      if (this.game.touchController.isPressed) {
        if (this.rectangle.inBounds(this.game.touchController.startCords)) {
          this.isPressed = true;
          this.press();
        }
      }
    } else {
      if (!this.game.touchController.isPressed) {
        this.isPressed = false;
        this.release();
      }
    }
  }
  draw(ctx) {
    this.rectangle.draw(ctx);
  }
  press() {
    this.game.soundController.sfx.get("switch").play("switchDown");
    this.onPress();
  }
  release() {
    this.game.soundController.sfx.get("switch").play("switchUp");
    this.onRelease();
  }
}
