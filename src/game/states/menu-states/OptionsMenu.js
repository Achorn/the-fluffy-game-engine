import TextButton from "../../../engine/object/component/button/text-button/TextButton";
import Menu from "../../../engine/object/component/menu/Menu";
import Row from "../../../engine/object/component/menu/row/Row";
import Text from "../../../engine/object/text/Text";
import State from "../State";

export default class HomeMenu extends State {
  constructor({ handleEnter = () => {}, handleExit = () => {} }) {
    super({ handleEnter, handleExit });
    this.menu = new Menu({
      children: [
        new Row({
          children: [new TextButton({ text: "Play" })],
        }),
        new Row({
          children: [new TextButton({ text: "Options" })],
        }),
        new Row({
          children: [new TextButton({ text: "Exit" })],
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
