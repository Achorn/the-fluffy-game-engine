import RAPIER from "@dimforge/rapier2d-compat";
import Object from "./object/Object";

export default class PhysicsController extends Object {
  constructor() {
    super();
    this.init();
    this.inited = false;
  }
  init() {
    RAPIER.init().then(() => {
      let gravity = { x: 0.0, y: 519.81 };
      this.world = new RAPIER.World(gravity);
      this.inited = true;
    });
  }

  update(deltaTime) {
    if (!this.inited) return;
    //TODO adjust world stepping to delta time
    // console.log(deltaTime * 0.1);
    this.world.timestep = deltaTime * 0.001;
    this.world.step();
  }

  reset() {}
}
