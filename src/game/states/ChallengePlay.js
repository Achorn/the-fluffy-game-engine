import CirclePhysicsObject from "../../engine/object/physics/CirclePhysicsObject";
import Text from "../../engine/object/text/Text";
import State from "./State";
import RAPIER from "@dimforge/rapier2d-compat";

export default class ChallengePlay extends State {
  constructor({ onEnter, onExit }) {
    super({ onEnter, onExit });
    this.init();

    // INSTRUCTIONS, COUNTDOWN, PLAYING
    this.state = "COUNTDOWN";
  }
  init() {
    // create balls
    this.interactiveBodyObjects = [];
    this.createBalls();
    // create boundaries
    this.barrierBodies = [];
    this.createBoundaries();

    //create touch events for tapping balls
    //create touch events for when balls collide with ground (game over)
    //create initial instructions for game dont let balls touch ground
    // create count down timer for start of game
    this.start = Date.now();
    this.countDown = 3;
    this.countDownText = new Text({
      text: this.countDown,
      startX: window.innerWidth * 0.5,
      size: 50,
      color: "lightgrey",
      startY: window.innerHeight * 0.5 - 100,
      alignment: "center",
    });
    this.play = false;

    //create timer for gameplay
  }
  update(deltaTime) {
    if (this.state === "COUNTDOWN") {
      let timeElapsed = this.getTimeElapsed(this.start, Date.now());
      this.countDown = 3 - Math.floor(timeElapsed);
      this.countDownText.text = this.countDown;
      if (this.countDown < 0) {
        this.state = "PLAYING";
        this.start = Date.now();
        this.countDownText.text = 0;
      }
    } else if (this.state === "PLAYING") {
      this.game.physicsController.update(deltaTime);
      let timeElapsed = this.getTimeElapsed(this.start, Date.now());
      this.countDown = timeElapsed.toFixed(2);
      this.countDownText.text = this.countDown;
    }

    // is game over?
    //reset and replay or exit state
  }
  draw(ctx) {
    if (this.state === "PLAYING") {
      this.countDownText.draw(ctx);
    }
    // draw shit
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

    if (this.state === "COUNTDOWN") {
      this.countDownText.draw(ctx);
    }
  }

  createBalls() {
    for (let i = 0; i < 3; i++) {
      this.interactiveBodyObjects.push(
        new CirclePhysicsObject({
          rigidDesc: RAPIER.RigidBodyDesc.dynamic().setTranslation(
            window.innerWidth * 0.5,
            window.innerHeight * 0.5
          ),
          width: 40,
          height: 40,
          // colliderDesc: RAPIER.ColliderDesc.cuboid(50, 50).setRestitution(0.5),
        })
      );
    }
  }
  createBoundaries() {
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
  }
  getTimeElapsed(start, end) {
    const elapsedMilliseconds = end - start;
    const elapsedSeconds = elapsedMilliseconds / 1000;
    return elapsedSeconds;
  }
}
