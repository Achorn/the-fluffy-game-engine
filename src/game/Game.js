import LevelOne from "./states/LevelOne";
import LoadingState from "./states/LoadingState";

let instance;

class Game {
  constructor() {
    //SINGLETON PATTERN IMPLEMENTATION
    if (instance) return instance;
    instance = this;

    this.canvas = document.querySelector("#my-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.state = new LoadingState(() => {
      this.state = new LevelOne();
    });
  }
  init() {}
  load() {}
  play() {}
  update(deltaTime) {
    // console.log("game update");
    this.state.update(deltaTime);
  }
  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // console.log("game draw");
    this.state.draw(this.ctx);
    // this.ctx.fillStyle = "red";
    // this.ctx.fillRect(100, 100, 100, 100);
  }
}

export default Game;
