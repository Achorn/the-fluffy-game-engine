import Object from "../../engine/object/Object";

export default class State extends Object {
  constructor({ handleEnter = () => {}, handleExit = () => {} }) {
    super({});
    this.handleEnter = handleEnter;
    this.handleExit = handleExit;
  }
  update(deltaTime) {}
  draw(ctx) {}
}
