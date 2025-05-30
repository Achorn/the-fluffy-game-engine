import TextButton from "../../../engine/object/component/button/text-button/TextButton";
import Menu from "../../../engine/object/component/menu/Menu";
import Row from "../../../engine/object/component/menu/row/Row";
import HomeScreen from "../HomeScreen";
import State from "../State";
import GameModeMenu from "./GameModeMenu";
import OptionsMenu from "./OptionsMenu";

export default class PauseMenu extends State {
  constructor({ parent, onExit = () => {}, onResume = () => {} }) {
    super({});
    this.parent = parent;
    this.menu = new Menu({
      color: "purple",
      children: [
        new Row({
          children: [
            new TextButton({
              text: "Resume",
              onRelease: () => {
                onResume();
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
          ],
        }),
        new Row({
          children: [
            new TextButton({
              text: "Exit To Home",
              onRelease: () => {
                onExit();
                this.game.state = new HomeScreen({});
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
