import Rectangle from "../../../shape/rectangle/Rectangle";
import Shape from "../../../shape/Shape";

export default class Row extends Shape {
  constructor({ children = [] }) {
    super({});
    this.children = children;
    this.debugSquare = new Rectangle({ color: "pink" });
    this.gap = 10;
  }
  init() {
    //debug
    this.debugSquare.startX = this.startX;
    this.debugSquare.startY = this.startY;
    this.debugSquare.width = this.width;
    this.length = this.children.length;

    this.children.forEach((child, index) => {
      child.width = this.width / this.length;
      child.startX = this.startX + child.width * index;
      child.startY = this.startY;
      child.init();
    });
  }
  update(deltaTime) {
    this.children.forEach((child) => {
      child.update(deltaTime);
    });
  }
  draw(ctx) {
    this.debugSquare.draw(ctx);

    this.children.forEach((child) => {
      child.draw(ctx);
    });
  }
}
