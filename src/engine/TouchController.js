export default class TouchController {
  constructor(canvas) {
    this.isPressed = false;
    this.startCords = null;
    this.currentCords = null;
    this.init(canvas);
    this.debug = true;
  }
  init(canvas) {
    canvas.addEventListener("touchstart", this.handleStart);
    canvas.addEventListener("touchmove", this.handleMove);
    canvas.addEventListener("touchend", this.handleEnd);
    canvas.addEventListener("touchcancel", this.handleCancel);
  }

  handleStart = (e) => {
    e.preventDefault();
    this.isPressed = true;
    this.startCords = {
      x: e.targetTouches[0].pageX,
      y: e.targetTouches[0].pageY,
    };
    this.currentCords = {
      x: e.targetTouches[0].pageX,
      y: e.targetTouches[0].pageY,
    };
  };
  handleMove = (e) => {
    e.preventDefault();
    this.currentCords = {
      x: e.targetTouches[0].pageX,
      y: e.targetTouches[0].pageY,
    };
  };
  handleEnd = (e) => {
    e.preventDefault();
    this.isPressed = false;
    this.startCords = null;
    this.currentCords = null;
  };
  handleCancel = (e) => {
    e.preventDefault();
  };

  reset() {
    this.isPressed = false;
    this.startCords = null;
    this.currentCords = null;
  }

  update(deltaTime) {}

  draw(ctx) {
    if (this.debug) {
      if (this.isPressed === true) {
        ctx.globalAlpha = 0.4;

        ctx.lineWidth = 2;

        // Start target
        //X
        ctx.strokeStyle = "purple";
        ctx.beginPath();
        ctx.moveTo(this.startCords.x, 0);
        ctx.lineTo(this.startCords.x, ctx.canvas.height);
        ctx.stroke();
        //Y
        ctx.beginPath();
        ctx.moveTo(0, this.startCords.y);
        ctx.lineTo(ctx.canvas.height, this.startCords.y);
        ctx.stroke();

        ctx.strokeStyle = "red";

        // Current Target
        //X
        ctx.beginPath();
        ctx.moveTo(this.currentCords.x, 0);
        ctx.lineTo(this.currentCords.x, ctx.canvas.height);
        ctx.stroke();
        //Y
        ctx.beginPath();
        ctx.moveTo(0, this.currentCords.y);
        ctx.lineTo(ctx.canvas.height, this.currentCords.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}
