import IconButton from "../../../engine/object/component/button/icon-button/IconButton";
import TextButton from "../../../engine/object/component/button/text-button/TextButton";
import Menu from "../../../engine/object/component/menu/Menu";
import Row from "../../../engine/object/component/menu/row/Row";
import Text from "../../../engine/object/text/Text";
import ChallengePlay from "../ChallengePlay";
import PhysicsTester from "../PhysicsTester";
import State from "../State";

export default class GameModeMenu extends State {
  constructor({ parent, handleEnter = () => {}, handleExit = () => {} }) {
    super({ handleEnter, handleExit });
    this.parent = parent;
    this.menu = new Menu({
      color: "purple",
      children: [
        new Row({
          children: [
            new TextButton({
              text: "Physics Tester",
              onRelease: () => (this.game.state = new PhysicsTester({})),
            }),
          ],
        }),
        new Row({
          children: [
            new TextButton({
              text: "Challenge Mode",
              onRelease: () => (this.game.state = new ChallengePlay({})),
            }),
          ],
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
