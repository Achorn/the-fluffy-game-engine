import { assets } from "../../engine/assetLoader";
import Circle from "../../engine/object/shape/circle/Circle";
import Rectangle from "../../engine/object/shape/rectangle/Rectangle";
import CheckBoxButton from "../../engine/object/component/button/check-box-button/CheckBoxButton";
import Text from "../../engine/object/text/Text";
import State from "./State";
import TextButton from "../../engine/object/component/button/text-button/TextButton";
import Icon from "../../engine/object/shape/icon/Icon";
import IconButton from "../../engine/object/component/button/icon-button/IconButton";

export default class GameEngineExamplesState extends State {
  constructor() {
    super();
    this.image = assets.get("albumCover");
    this.text = new Text({
      startX: 20,
      startY: 15,
      text: "Game Engine Sandbox",
    });
    this.rectangle = new Rectangle({ startX: 20, startY: 50 });
    this.circle = new Circle({ startX: 20, startY: 160 });

    this.button = new TextButton({
      startX: 20,
      startY: 270,
      text: "Press Me",
      onPress: () => {
        this.button.text.text = "PRESSED";
        assets.get("switch").play();
      },
      onRelease: () => {
        this.button.text.text = "Press Me";
      },
    });
    this.checkBox = new CheckBoxButton({
      startX: 20,
      startY: 350,
      active: false,
      onRelease: () => {
        assets.get("switch").play();
      },
    });
    this.icon = new Icon({
      startX: 200,
      startY: 450,
      image: assets.get("volumeUpIconSVG"),
      color: "orange",
    });
    this.iconTwo = new Icon({
      startX: 100,
      startY: 450,
      image: assets.get("volumeUpIconSVG"),
      color: "black",
    });
    this.iconButton = new IconButton({
      startX: 20,
      startY: 450,
      image: assets.get("volumeUpIconSVG"),
    });
  }
  update(deltaTime) {
    this.rectangle.update(deltaTime);
    this.button.update(deltaTime);
    this.checkBox.update(deltaTime);
    this.icon.update(deltaTime);
    this.iconTwo.update(deltaTime);
  }
  draw(ctx) {
    // ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
    this.rectangle.draw(ctx);
    this.circle.draw(ctx);
    this.text.draw(ctx);
    this.button.draw(ctx);
    this.checkBox.draw(ctx);
    this.icon.draw(ctx);
    this.iconTwo.draw(ctx);
    this.iconButton.draw(ctx);
  }
}
