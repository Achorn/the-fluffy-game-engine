import TextButton from "../../../engine/object/component/button/text-button/TextButton";
import Menu from "../../../engine/object/component/menu/Menu";
import Row from "../../../engine/object/component/menu/row/Row";
import Text from "../../../engine/object/text/Text";
import State from "../State";

export default class OptionsMenu extends State {
  constructor({ parent, handleEnter = () => {}, handleExit = () => {} }) {
    super({ handleEnter, handleExit });
    this.parent = parent;

    let toggleSoundButton = new TextButton({
      text: this.game.soundController.muted ? "Sound: OFF" : "Sound: ON",
    });
    toggleSoundButton.onRelease = () => {
      this.game.soundController.toggleMute();
      console.log(this);
      if (this.game.soundController.muted) {
        toggleSoundButton.updateText("Sound: OFF");
      } else toggleSoundButton.updateText("Sound: ON");
    };

    this.menu = new Menu({
      children: [
        new Row({
          children: [toggleSoundButton],
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
