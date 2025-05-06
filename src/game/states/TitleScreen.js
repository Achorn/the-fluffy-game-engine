import Text from "../../engine/object/text/Text";
import State from "./State";

export default class TitleScreen extends State {
  constructor({ handleExit }) {
    super({ handleExit });
    this.title = new Text({
      startX: window.innerWidth * 0.5,
      startY: window.innerHeight * 0.5 - 50,
      text: "Title screen",
      alignment: "center",
    });
    this.copy = new Text({
      startX: window.innerWidth * 0.5,
      startY: window.innerHeight * 0.5 + 10,
      text: "touch anywhere to begin",
      alignment: "center",
      size: 20,
    });
  }
  update(deltaTime) {
    if (this.game.touchController.isPressed) {
      // warm up howler js so it doesnt lag during gameplay!!
      let initSound = this.game.assets.get("switch");
      initSound.volume = 0;
      initSound.play("switchDown");
      initSound.stop();
      initSound.volume = 1;
      this.exit();
    }
  }
  draw(ctx) {
    this.title.draw(ctx);
    this.copy.draw(ctx);
  }
}
