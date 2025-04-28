import Rectangle from "../../shape/rectangle/Rectangle";
import Shape from "../../shape/Shape";
import Text from "../Text";

export default class Button extends Shape {
  constructor({
    startX,
    startY,
    width = 240,
    height = 60,
    onPress = () => {},
    onRelease = () => {},
    color = "blue",
    text = "BUTTON",
  }) {
    super({ startX, startY });
    this.width = width;
    this.height = height;
    this.onPress = onPress;
    this.onRelease = onRelease;
    this.text = new Text({
      text: text,
      startX: this.startX + this.width * 0.5,
      startY: this.startY + this.height * 0.5,
      alignment: "center",
      baseline: "middle",
      color: "white",
    });
    this.rectangle = new Rectangle({ startX, startY, color, width, height });
    // this.buttonState = new ButtonIdleState();
    this.isPressed = false;
    this.init();
  }
  init() {}
  update() {
    //Not Pressed
    if (!this.isPressed) {
      if (this.game.touchController.isPressed) {
        if (this.rectangle.inBounds(this.game.touchController.startCords)) {
          this.isPressed = true;
          this.onPress();
        }
      }
    }
    // Pressed
    else {
      if (!this.game.touchController.isPressed) {
        this.isPressed = false;
        this.onRelease();
      }
    }
  }
  draw(ctx) {
    this.rectangle.draw(ctx);
    this.text.draw(ctx);
  }
}

// class ButtonIdleState {
//   constructor(onExit) {
//     this.onExit = onExit;
//   }
//   udpate(buttonState) {
//     // check to see if touch controller is pressed,
//     //check to see if touch location is overlapping
//   }

//   draw(ctx) {}
// }

// class ButtonPressedState {
//   constructor(onExit) {
//     this.onExit = onExit;
//   }
//   udpate(ctx) {
//     // check touch controller to see if touch is no longer pressed
//   }

//   draw(ctx) {}
// }
