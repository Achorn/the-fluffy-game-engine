// dunamic rigid body
import Text from "../../engine/object/text/Text";
import State from "./State";

export default class PhysicsTester extends State {
  constructor({ handleExit }) {
    super({ handleExit });
    this.title = new Text({
      startX: window.innerWidth * 0.5,
      startY: window.innerHeight * 0.5 - 50,
      text: "Physics Test Screen",
      alignment: "center",
      baseline: "middle",
    });

    // this.init();
  }
  update(deltaTime) {
    this.game.physicsController.update(deltaTime);
  }
  draw(ctx) {
    ctx.save();

    //Convert degrees to radian
    var rad = this.game.physicsController.rotation;

    //Set the origin to the center of the image
    ctx.translate(
      window.innerWidth * 0.5,
      // 200,
      // 0
      window.innerHeight * 0.5 - 50
    );

    //Rotate the canvas around the origin
    ctx.rotate(rad);
    ctx.translate(
      -(window.innerWidth * 0.5),
      // 200,
      // 0
      -(window.innerHeight * 0.5 - 50)
    );

    // Restore canvas state as saved from above

    this.title.draw(ctx);
    ctx.restore();
    this.game.physicsController.draw(ctx);
  }
}
