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
  }) {
    super({
      startX,
      startY,
      width,
      height,
      onPress,
      onRelease,
      color,
    });
    this.active = active;
    this.onRelease = () => {
      this.active = !this.active;
      onRelease();
    };
    this.init();
  }
  init() {}
  update(deltaTime) {
    super.update(deltaTime);
    if (this.active) {
    } else {
    }
  }
  draw(ctx) {
    super.draw(ctx);
  }
}
