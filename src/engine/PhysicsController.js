import RAPIER from "@dimforge/rapier2d-compat";
import Object from "./object/Object";

export default class PhysicsController extends Object {
  constructor() {
    super();
    this.init();
    this.justPressed = false;
    this.inited = false;
  }
  init() {
    RAPIER.init().then(() => {
      // Run the simulation.
      console.log("running!!");

      let gravity = { x: 0.0, y: 519.81 };
      this.world = new RAPIER.World(gravity);

      // create the ground

      //floor
      this.groundColliderDesc = RAPIER.ColliderDesc.cuboid(
        window.innerWidth,
        80
      )
        .setFriction(0)
        .setRestitution(0.7);
      this.groundColliderDesc.setTranslation(0.0, window.innerHeight);
      this.world.createCollider(this.groundColliderDesc);

      //ceiling
      this.ceilingColliderDesc = RAPIER.ColliderDesc.cuboid(
        window.innerWidth,
        80
      )
        .setFriction(0)
        .setRestitution(0.7);
      this.ceilingColliderDesc.setTranslation(0.0, -80);
      this.world.createCollider(this.ceilingColliderDesc);

      // left wall
      this.leftWallColliderDesc = RAPIER.ColliderDesc.cuboid(
        80,
        window.innerHeight
      )
        .setFriction(0)
        .setRestitution(0.7);
      this.leftWallColliderDesc.setTranslation(-80, 0);
      this.world.createCollider(this.leftWallColliderDesc);

      // left wall
      this.rightWallColliderDesc = RAPIER.ColliderDesc.cuboid(
        80,
        window.innerHeight
      ).setFriction(0);
      this.rightWallColliderDesc
        .setTranslation(window.innerWidth + 80, 0)
        .setFriction(0)
        .setRestitution(0.7);
      this.world.createCollider(this.rightWallColliderDesc);

      // Create a dynamic rigid-body.
      this.rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
        100.0,
        400.0
      );

      this.rigidBody = this.world.createRigidBody(this.rigidBodyDesc);

      // Create a cuboid collider attached to the dunamic rigid body
      this.colliderDesc = RAPIER.ColliderDesc.cuboid(10, 10).setRestitution(
        0.5
      );
      this.collider = this.world.createCollider(
        this.colliderDesc,
        this.rigidBody
      );
      this.inited = true;
    });
  }

  update(deltaTime) {
    if (!this.inited) return;
    // console.log(deltaTime * 0.1);
    // this.world.timestep = deltaTime;
    this.world.step();
    let position = this.rigidBody.translation();
    let rotation = this.rigidBody.rotation();
    if (this.justPressed == false && this.game.touchController.isPressed) {
      this.justPressed = true;
      // this.rigidBody.resetTorques(true); // Reset the torques to zero.
      // rigidBody.resetTorques(true); // Reset the torques to zero.

      this.rigidBody.applyImpulse({ x: -10000, y: -100000.0 }, true);
    }
    if (this.justPressed && this.game.touchController.isPressed == false) {
      this.justPressed = false;
    }
  }
  draw(ctx) {
    if (!this.inited) return;
    let scale = 4;
    let position = this.rigidBody.translation();
    let cube = this.colliderDesc;
    let cubePos = cube.translation;
    let cubeShape = cube.shape.halfExtents;
    this.rotation = this.rigidBody.rotation();

    //Convert degrees to radian
    var rad = (this.rigidBody.rotation() * Math.PI) / 180;

    ctx.save();

    //Convert degrees to radian
    var rad = this.game.physicsController.rotation;

    //Set the origin to the center of the image
    ctx.translate(
      position.x,
      // 200,
      // 0
      position.y
    );

    //Rotate the canvas around the origin
    ctx.rotate(rad);
    ctx.translate(
      -(position.x + cubeShape.x * 0.5),
      // 200,
      // 0
      -(position.y + cubeShape.y * 0.5)
    );

    // Restore canvas state as saved from above

    ctx.fillRect(position.x, position.y, cubeShape.x, cubeShape.y); // fill in the pixel at (10,10)
    ctx.restore();

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
  reset() {}
}
