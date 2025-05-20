// dunamic rigid body
import RAPIER from "@dimforge/rapier2d-compat";
import Text from "../../engine/object/text/Text";
import State from "./State";

export default class PhysicsTester extends State {
  constructor({ handleExit }) {
    super({ handleExit });
    this.justPressed = false;

    this.title = new Text({
      startX: window.innerWidth * 0.5,
      startY: window.innerHeight * 0.5 - 50,
      text: "Physics Test Screen",
      alignment: "center",
      baseline: "middle",
    });
    this.init();
  }
  init() {
    let world = this.game.physicsController.world;
    //floor
    this.groundColliderDesc = RAPIER.ColliderDesc.cuboid(window.innerWidth, 80)
      .setFriction(0)
      .setRestitution(0.7);
    this.groundColliderDesc.setTranslation(0.0, window.innerHeight);
    world.createCollider(this.groundColliderDesc);
    //ceiling
    this.ceilingColliderDesc = RAPIER.ColliderDesc.cuboid(window.innerWidth, 80)
      .setFriction(0)
      .setRestitution(0.7);
    this.ceilingColliderDesc.setTranslation(0.0, -80);
    world.createCollider(this.ceilingColliderDesc);

    // left wall
    this.leftWallColliderDesc = RAPIER.ColliderDesc.cuboid(
      80,
      window.innerHeight
    )
      .setFriction(0)
      .setRestitution(0.7);
    this.leftWallColliderDesc.setTranslation(-80, 0);
    world.createCollider(this.leftWallColliderDesc);

    // left wall
    this.rightWallColliderDesc = RAPIER.ColliderDesc.cuboid(
      80,
      window.innerHeight
    ).setFriction(0);
    this.rightWallColliderDesc
      .setTranslation(window.innerWidth + 80, 0)
      .setFriction(0)
      .setRestitution(0.7);
    world.createCollider(this.rightWallColliderDesc);
    // Create a dynamic rigid-body.
    this.rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
      100.0,
      400.0
    );

    this.rigidBody = world.createRigidBody(this.rigidBodyDesc);

    // Create a cuboid collider attached to the dunamic rigid body
    this.colliderDesc = RAPIER.ColliderDesc.cuboid(10, 10).setRestitution(0.5);
    this.collider = world.createCollider(this.colliderDesc, this.rigidBody);
  }
  update(deltaTime) {
    this.game.physicsController.update(deltaTime);
    if (this.justPressed == false && this.game.touchController.isPressed) {
      this.justPressed = true;
      this.rigidBody.applyImpulse({ x: -10000, y: -100000.0 }, true);
    }
    if (this.justPressed && this.game.touchController.isPressed == false) {
      this.justPressed = false;
    }
  }
  draw(ctx) {
    let position = this.rigidBody.translation();
    let cube = this.colliderDesc;
    let cubeShape = cube.shape.halfExtents;
    var rad = this.rigidBody.rotation();
    //Convert degrees to radian
    // var rad = (this.rigidBody.rotation() * Math.PI) / 180;

    ctx.save();
    //Set the origin to the center of the image
    ctx.translate(position.x, position.y);
    //Rotate the canvas around the origin
    ctx.rotate(rad);
    ctx.translate(
      -(position.x + cubeShape.x * 0.5),
      -(position.y + cubeShape.y * 0.5)
    );
    ctx.fillRect(position.x, position.y, cubeShape.x, cubeShape.y); // fill in the pixel at (10,10)
    // Restore canvas state as saved from above
    ctx.restore();

    //TITLE
    ctx.save();
    //Convert degrees to radian
    //Set the origin to the center of the image
    ctx.translate(window.innerWidth * 0.5, window.innerHeight * 0.5 - 50);
    //Rotate the canvas around the origin
    ctx.rotate(rad);
    ctx.translate(-(window.innerWidth * 0.5), -(window.innerHeight * 0.5 - 50));
    // Restore canvas state as saved from above
    this.title.draw(ctx);
    ctx.restore();

    // this.game.physicsController.draw(ctx);

    // draw ground
    let ground = this.groundColliderDesc;
    let groundPos = ground.translation;
    let groundShape = ground.shape.halfExtents;
    ctx.fillRect(
      groundPos.x,
      groundPos.y - groundShape.y,
      groundShape.x,
      groundShape.y
    ); // fill in
  }
}
