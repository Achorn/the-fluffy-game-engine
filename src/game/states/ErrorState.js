import State from "./State";

export default class ErrorState extends State {
  constructor(err) {
    super();
    this.errMessage = err;
  }
  update(deltaTime) {}
  draw(ctx) {
    ctx.font = "30px Arial";
    ctx.fillText(`Error: ${this.errMessage}`, 100, 100);
  }
}
