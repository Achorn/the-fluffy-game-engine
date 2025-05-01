import Object from "../../engine/object/Object";
import Game from "../Game";

export default class State extends Object {
  constructor() {
    super();
    this.game = new Game();
  }
  update(deltaTime) {}
  draw(ctx) {}
}
