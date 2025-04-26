import Game from "../Game";

export default class State {
  constructor() {
    this.game = new Game();
  }
  update(deltaTime) {}
  draw(ctx) {}
}
