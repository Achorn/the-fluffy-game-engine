import RAPIER from "@dimforge/rapier2d-compat";
import Object from "../Object";

export default class RectanglePhysicsObject extends Object {
  constructor({ rigidDesc, desc, width = 25, height = 25 }) {
    super({});
    this.world = this.game.physicsController.world;
    this.rigidBody = this.world.createRigidBody(rigidDesc);
    this.colliderDesc = RAPIER.ColliderDesc.cuboid(
      width,
      height
    ).setRestitution(0.5);
    this.collider = this.world.createCollider(
      this.colliderDesc,
      this.rigidBody
    );
  }
  init() {}
  update(deltaTime) {}
  draw(ctx) {
    let position = this.rigidBody.translation();
    let { x: width, y: height } = this.colliderDesc.shape.halfExtents;

    var rad = this.rigidBody.rotation();

    ctx.save();
    //Set the origin to the center of the image
    ctx.fillStyle = "Orange";

    ctx.translate(position.x, position.y);
    ctx.rotate(rad);
    ctx.translate(-position.x, -position.y);
    //Rotate the canvas around the origin
    ctx.fillRect(
      position.x - width,
      position.y - height,
      width * 2,
      height * 2
    ); // fill in the pixel at (10,10)
    // Restore canvas state as saved from above
    ctx.restore();
  }
  dispose() {
    this.world.removeCollider(this.collider);
  }
}
