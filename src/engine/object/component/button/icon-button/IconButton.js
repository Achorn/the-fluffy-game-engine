import Icon from "../../../shape/icon/Icon";
import Button from "../Button";

export default class IconButton extends Button {
  constructor({
    startX,
    startY,
    width = 60,
    height = 60,
    onPress = () => {},
    onRelease = () => {},
    color = "purple",
    image = null,
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
    this.icon = new Icon({
      startX: startX + 5,
      startY: startY + 5,
      image,
      color: "white",
    });
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
  draw(ctx) {
    super.draw(ctx);
    this.icon.draw(ctx);
  }
}
