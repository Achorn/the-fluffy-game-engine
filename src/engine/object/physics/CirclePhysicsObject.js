import RAPIER from "@dimforge/rapier2d-compat";
import Object from "../Object";

export default class CirclePhysicsObject extends Object {
  constructor({ rigidDesc, desc, width = 25, height = 25 }) {
    super({});
    this.world = this.game.physicsController.world;
    this.rigidBody = this.world.createRigidBody(rigidDesc);
    this.colliderDesc = RAPIER.ColliderDesc.ball(width).setRestitution(0.5);
    this.collider = this.world.createCollider(
      this.colliderDesc,
      this.rigidBody
    );
  }
  init() {}
  update(deltaTime) {}
  draw(ctx) {
    let position = this.rigidBody.translation();
    // console.log(this.colliderDesc.shape);
    let radius = this.colliderDesc.shape.radius;

    var rad = this.rigidBody.rotation();

    // ctx.save();
    //Set the origin to the center of the image
    ctx.fillStyle = "blue";

    // ctx.translate(position.x, position.y);
    // ctx.rotate(rad);
    // ctx.translate(-position.x, -position.y);
    //Rotate the canvas around the origin

    // Restore canvas state as saved from above
    // ctx.restore();
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  dispose() {
    this.world.removeCollider(this.collider);
  }
}
