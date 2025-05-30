// dunamic rigid body
import RAPIER from "@dimforge/rapier2d-compat";
import Text from "../../engine/object/text/Text";
import State from "./State";
import TextButton from "../../engine/object/component/button/text-button/TextButton";
import PauseScreen from "./PauseScreen";
import Object from "../../engine/object/Object";

export default class PhysicsTester extends State {
  constructor({ handleExit }) {
    super({ handleExit });
    this.justPressed = false;
    this.barrierBodies = [];
    this.interactiveBodyObjects = [];

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

    //Floor
    this.groundColliderDesc = RAPIER.ColliderDesc.cuboid(window.innerWidth, 80)
      .setFriction(0)
      .setRestitution(0.7)
      .setTranslation(0.0, window.innerHeight);
    world.createCollider(this.groundColliderDesc);
    this.barrierBodies.push({
      id: "floor",
      desc: this.groundColliderDesc,
      color: "green",
    });

    //ceiling
    this.ceilingColliderDesc = RAPIER.ColliderDesc.cuboid(window.innerWidth, 80)
      .setFriction(0)
      .setRestitution(0.7)
      .setTranslation(0.0, -80);
    world.createCollider(this.ceilingColliderDesc);
    this.barrierBodies.push({
      id: "ceiling",
      desc: this.groundColliderDesc,
      color: "green",
    });

    // left wall
    this.leftWallColliderDesc = RAPIER.ColliderDesc.cuboid(
      80,
      window.innerHeight
    )
      .setFriction(0)
      .setRestitution(0.7)
      .setTranslation(-80, 0);
    world.createCollider(this.leftWallColliderDesc);
    this.barrierBodies.push({
      id: "left-wall",
      desc: this.groundColliderDesc,
      color: "green",
    });

    // left wall
    this.rightWallColliderDesc = RAPIER.ColliderDesc.cuboid(
      80,
      window.innerHeight
    )
      .setFriction(0)
      .setTranslation(window.innerWidth + 80, 0)
      .setRestitution(0.7);

    world.createCollider(this.rightWallColliderDesc);

    this.barrierBodies.push({
      id: "right-wall",
      desc: this.groundColliderDesc,
      color: "green",
    });

    for (let i = 0; i < 3; i++) {
      this.interactiveBodyObjects.push(
        new CirclePhysicsObject({
          rigidDesc: RAPIER.RigidBodyDesc.dynamic().setTranslation(
            window.innerWidth * 0.5,
            window.innerHeight * 0.5
          ),
          width: 20,
          height: 20,
          // colliderDesc: RAPIER.ColliderDesc.cuboid(50, 50).setRestitution(0.5),
        })
      );
    }

    // add pause button and menu
    this.isPaused = false;
    this.pauseButton = new TextButton({
      startX: 10,
      startY: 10,
      width: 95,
      text: "pause",
      onPress: () => {
        this.isPaused = true;
      },
    });
    this.pauseMenu = new PauseScreen({
      onResume: () => (this.isPaused = false),
      onExit: () => this.dispose(),
    });
  }

  update(deltaTime) {
    this.pauseButton.update(deltaTime);
    if (this.isPaused) {
      this.pauseMenu.update(deltaTime);
      return;
    }
    this.game.physicsController.update(deltaTime);
    if (this.justPressed == false && this.game.touchController.isPressed) {
      this.justPressed = true;
      this.interactiveBodyObjects.forEach((body) => {
        // if (body.rigidBody) {
        body.rigidBody.applyImpulse({ x: -10000, y: -700000.0 }, true);
        // }
      });
      // this.rigidBody.applyImpulse({ x: -100, y: -1000000.0 }, true);
    }
    if (this.justPressed && this.game.touchController.isPressed == false) {
      this.justPressed = false;
    }
  }
  draw(ctx) {
    this.barrierBodies.forEach((body) => {
      let position = body.rigidBody
        ? body.rigidBody.translation()
        : body.desc.translation;
      let { x: width, y: height } = body.desc.shape.halfExtents;

      var rad = body.rigidBody ? body.rigidBody.rotation() : 0;

      ctx.save();
      //Set the origin to the center of the image
      ctx.fillStyle = body.color || "black";

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
    });
    this.interactiveBodyObjects.forEach((body) => {
      body.draw(ctx);
    });
    // this.physicsSquareObject.draw(ctx);

    //TITLE
    this.title.draw(ctx);

    if (this.isPaused) {
      this.pauseMenu.draw(ctx);
    } else {
      this.pauseButton.draw(ctx);
    }
  }
  dispose() {
    this.interactiveBodyObjects.forEach((body) => {
      body.dispose();
    });
  }
}

class PhysicsObject extends Object {
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

class CirclePhysicsObject extends Object {
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
    // ctx.fillRect(
    //   position.x - width,
    //   position.y - height,
    //   width * 2,
    //   height * 2
    // ); // fill in the pixel at (10,10)
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
