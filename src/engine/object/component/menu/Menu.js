import Rectangle from "../../shape/rectangle/Rectangle";
import Shape from "../../shape/Shape";

export default class Menu extends Shape {
  constructor({
    startX,
    startY,
    children = [],
    background = new Rectangle({}),
    padding = 10,
  }) {
    super({ startX, startY });
    this.children = children;
    this.background = background;
    this.padding = padding;
  }
  init() {
    // initialize background size
    // width and height
    // position based on width and height
    // calcualte childrens posiiton
    // initialize children passing rows their respective
  }
  update(deltaTime) {
    this.background.update(deltaTime);
    this.children.forEach((child) => {
      child.update(deltaTime);
    });
  }
  draw(ctx) {
    this.background.draw(ctx);
    this.children.forEach((child) => {
      child.draw(ctx);
    });
  }
}
