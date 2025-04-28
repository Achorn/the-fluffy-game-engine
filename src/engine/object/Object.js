import Game from "../../game/Game";

export default class Object {
  constructor() {
    this.game = new Game();
  }
  update(deltaTime) {}
  draw() {}
}
