import IconButton from "../../../engine/object/component/button/icon-button/IconButton";
import TextButton from "../../../engine/object/component/button/text-button/TextButton";
import Menu from "../../../engine/object/component/menu/Menu";
import Row from "../../../engine/object/component/menu/row/Row";
import Text from "../../../engine/object/text/Text";
import State from "../State";

export default class HomeMenu extends State {
  constructor({ state = [], handleEnter = () => {}, handleExit = () => {} }) {
    super({ handleEnter, handleExit });
    this.state = state;
    this.menu = new Menu({
      color: "purple",
      children: [
        new Row({
          children: [new TextButton({ text: "Play" })],
          // children: [new TextButton({ text: "Options" })],
          // children: [new IconButton({})],
        }),
        new Row({
          // children: [new TextButton({ text: "Play" })],
          // children: [new TextButton({ text: "Options" })],
          children: [
            new TextButton({ text: "Sound" }),
            new TextButton({ text: "Option" }),
          ],
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
