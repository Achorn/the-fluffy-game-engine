import Object from "../Object";

export default class Shape extends Object {
  constructor({ startX = 0, startY = 0 }) {
    super();
    this.startX = startX;
    this.startY = startY;
  }
  update(deltaTime) {}
  draw() {}
}
