import Shape from "../../../shape/Shape";

export default class Row extends Shape {
  constructor({ children = [] }) {
    super({});
    this.children = children;
  }
  update(deltaTime) {
    this.children.forEach((child) => {
      child.update(deltaTime);
    });
  }
  draw(ctx) {
    this.children.forEach((child) => {
      child.draw(ctx);
    });
  }
}
