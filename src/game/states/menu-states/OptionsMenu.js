import TextButton from "../../../engine/object/component/button/text-button/TextButton";
import Menu from "../../../engine/object/component/menu/Menu";
import Row from "../../../engine/object/component/menu/row/Row";
import Text from "../../../engine/object/text/Text";
import State from "../State";

export default class OptionsMenu extends State {
  constructor({ parent, handleEnter = () => {}, handleExit = () => {} }) {
    super({ handleEnter, handleExit });
    this.parent = parent;
    this.menu = new Menu({
      children: [
        new Row({
          children: [new TextButton({ text: "Sound" })],
        }),
        new Row({
          children: [
            new TextButton({
              text: "Back",
              onRelease: () => {
                this.parent.menuStateStack.pop();
              },
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
