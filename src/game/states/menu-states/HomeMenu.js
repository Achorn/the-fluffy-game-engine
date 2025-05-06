import TextButton from "../../../engine/object/component/button/text-button/TextButton";
import Menu from "../../../engine/object/component/menu/Menu";
import Row from "../../../engine/object/component/menu/row/Row";
import State from "../State";
import GameModeMenu from "./GameModeMenu";
import OptionsMenu from "./OptionsMenu";

export default class HomeMenu extends State {
  constructor({ parent }) {
    super({});
    this.parent = parent;
    this.menu = new Menu({
      color: "purple",
      children: [
        new Row({
          children: [
            new TextButton({
              text: "Play",
              onRelease: () => {
                this.exit();
                this.parent.menuStateStack.push(
                  new GameModeMenu({ parent: this.parent })
                );
              },
            }),
          ],
        }),
        new Row({
          children: [
            new TextButton({
              text: "Options",
              onRelease: () => {
                this.exit();
                this.parent.menuStateStack.push(
                  new OptionsMenu({ parent: this.parent })
                );
              },
            }),
            new TextButton({
              text: "About",
            }),
          ],
        }),
        new Row({
          children: [
            new TextButton({
              text: "Exit",
              onRelease: () => {
                // console.log("exit is pressed");
                // window.close();
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
