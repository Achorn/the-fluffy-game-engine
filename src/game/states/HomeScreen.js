import Text from "../../engine/object/text/Text";
import HomeMenu from "./menu-states/HomeMenu";
import State from "./State";

export default class HomeScreen extends State {
  constructor({}) {
    super({});
    this.title = new Text({
      startX: window.innerWidth * 0.5,
      startY: 50,
      text: "Home screen",
      alignment: "center",
    });
    this.menuState = [new HomeMenu({})];
  }
  update(deltaTime) {
    this.menuState[this.menuState.length - 1].update(deltaTime);
  }
  draw(ctx) {
    this.title.draw(ctx);
    this.menuState[this.menuState.length - 1].draw(ctx);
  }
}
