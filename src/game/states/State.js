import Object from "../../engine/object/Object";

export default class State extends Object {
  constructor({ handleEnter = () => {}, handleExit = () => {} }) {
    super({});
    this.handleEnter = handleEnter;
    this.handleExit = handleExit;
  }
  enter() {
    this.handleEnter();
  }
  exit() {
    this.game.touchController.reset();
    this.handleExit();
  }
  update(deltaTime) {}
  draw(ctx) {}
}
