import { assets } from "../../engine/assetLoader";
import Circle from "../../engine/object/shape/circle/Circle";
import Rectangle from "../../engine/object/shape/rectangle/Rectangle";
import Button from "../../engine/object/text/button/Button";
import CheckBoxButton from "../../engine/object/text/button/check-box-button/CheckBoxButton";
import Text from "../../engine/object/text/Text";
import State from "./State";

export default class GameEngineExamplesState extends State {
  constructor() {
    super();
    this.image = assets.get("albumCover");
    this.text = new Text({
      startX: 20,
      startY: 20,
      text: "Game Engine Sandbox",
    });
    this.rectangle = new Rectangle({ startX: 20, startY: 50 });
    this.circle = new Circle({ startX: 20, startY: 160 });

    this.button = new Button({
      startX: 20,
      startY: 270,
      text: "FART",
      onPress: () => {
        this.button.text.text = "PRESSED";
        assets.get("fart").play();
      },
      onRelease: () => {
        this.button.text.text = "Fart";
      },
    });
    this.checkBox = new CheckBoxButton({
      startX: 20,
      startY: 350,
      active: false,
      onRelease: () => {
        assets.get("switch").play();
        // let song = assets.get("boom");
        // if (song.playing()) {
        //   song.pause();
        // } else song.play();
      },
    });
  }
  update(deltaTime) {
    this.rectangle.update(deltaTime);
    this.button.update(deltaTime);
    this.checkBox.update(deltaTime);
  }
  draw(ctx) {
    // ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
    this.rectangle.draw(ctx);
    this.circle.draw(ctx);
    this.text.draw(ctx);
    this.button.draw(ctx);
    this.checkBox.draw(ctx);
  }
}
