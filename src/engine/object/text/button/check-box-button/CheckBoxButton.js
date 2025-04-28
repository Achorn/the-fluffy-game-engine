import Button from "../Button";

export default class CheckBoxButton extends Button {
  constructor({
    startX,
    startY,
    width = 240,
    height = 60,
    onPress = () => {},
    onRelease = () => {},
    color = "purple",
    active = true,
    text = "ON",
  }) {
    super({
      startX,
      startY,
      width,
      height,
      onPress,
      onRelease,
      color,
      text,
    });
    this.active = active;
    this.init();
  }
  init() {
    this.onRelease = () => {
      if (this.active) {
        this.text.text = "OFF";
      } else {
        this.text.text = "ON";
      }
      this.active = !this.active;
    };
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
  draw(ctx) {
    super.draw(ctx);
  }
}
