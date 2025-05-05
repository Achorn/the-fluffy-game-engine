import Rectangle from "../../shape/rectangle/Rectangle";
import Shape from "../../shape/Shape";

export default class Menu extends Shape {
  constructor({
    startX,
    startY,
    children = [],
    color = "purple",
    background = new Rectangle({ color }),
    padding = 10,
    gap = 10,
  }) {
    super({ startX, startY });
    this.children = children;
    this.background = background;
    this.padding = padding;
    this.width = window.innerWidth * 0.8;
    this.height = 300;
  }
  init() {
    // initialize background size
    // width and height
    this.startX = window.innerWidth * 0.5 - this.width * 0.5;
    this.startY = window.innerHeight * 0.5 - this.height * 0.5;
    // position based on width and height
    this.background.startX = this.startX;
    this.background.startY = this.startY;
    this.background.width = this.width;
    this.background.height = this.height;
    // calcualte childrens posiiton

    this.children.forEach((row, index) => {
      row.startX = this.startX + this.padding;
      row.startY = this.startY + this.padding + 90 * index;
      row.width = this.width - this.padding - this.padding;
      row.init();
    });
    // initialize children passing rows their respective
    // this.children.forEach((child) => child.init());
  }
  update(deltaTime) {
    this.background.update(deltaTime);
    this.children.forEach((child) => child.update(deltaTime));
  }
  draw(ctx) {
    this.background.draw(ctx);
    this.children.forEach((child) => child.draw(ctx));
  }
}
