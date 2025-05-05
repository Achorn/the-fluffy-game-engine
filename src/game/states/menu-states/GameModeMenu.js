import IconButton from "../../../engine/object/component/button/icon-button/IconButton";
import TextButton from "../../../engine/object/component/button/text-button/TextButton";
import Menu from "../../../engine/object/component/menu/Menu";
import Row from "../../../engine/object/component/menu/row/Row";
import Text from "../../../engine/object/text/Text";
import State from "../State";

export default class GameModeMenu extends State {
  constructor({ parent, handleEnter = () => {}, handleExit = () => {} }) {
    super({ handleEnter, handleExit });
    this.parent = parent;
    this.menu = new Menu({
      color: "purple",
      children: [
        new Row({
          children: [new TextButton({ text: "Free Play" })],
        }),
        new Row({
          children: [new TextButton({ text: "Challenge Mode" })],
        }),
        new Row({
          children: [
            new TextButton({
              text: "Back",
              onPress: () => this.parent.menuState.pop(),
            }),
          ],
        }),
      ],
    });
    this.menu.init();
  }
  update(deltaTime) {
    this.menu.update(deltaTime);
  }
  draw(ctx) {
    this.menu.draw(ctx);
  }
}
