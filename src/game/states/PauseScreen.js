import Text from "../../engine/object/text/Text";
import PauseMenu from "./menu-states/PauseMenu";
import State from "./State";

export default class PauseScreen extends State {
  constructor({ onExit = () => {}, onResume = () => {} }) {
    super({});
    this.title = new Text({
      startX: window.innerWidth * 0.5,
      startY: 50,
      text: "Paused",
      alignment: "center",
    });
    this.menuStateStack = [];
    this.menuStateStack.push(new PauseMenu({ parent: this, onResume, onExit }));
  }
  update(deltaTime) {
    this.menuStateStack[this.menuStateStack.length - 1].update(deltaTime);
  }
  draw(ctx) {
    this.title.draw(ctx);
    this.menuStateStack[this.menuStateStack.length - 1].draw(ctx);
  }
}
