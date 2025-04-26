export default class Object {
  constructor({ startX = 0, startY = 0 }) {
    this.startX = startX;
    this.startY = startY;
  }
  update(deltaTime) {}
  draw() {}
}
