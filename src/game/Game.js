import ErrorState from "./states/ErrorState";
import GameEngineExamplesState from "./states/GameEngineExamplesState.js";
import LoadingState from "./states/LoadingState";
import TouchController from "../engine/TouchController.js";
import SoundController from "../engine/SoundController.js";
import TitleScreen from "./states/TitleScreen.js";
import { assets } from "../engine/assetLoader.js";
import HomeScreen from "./states/HomeScreen.js";

let instance;

class Game {
  constructor() {
    //SINGLETON PATTERN IMPLEMENTATION
    if (instance) return instance;
    instance = this;

    // Ccanvas Setup
    this.canvas = document.querySelector("#my-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.processingCanvas = document.querySelector("#processing-canvas");
    this.processingCtx = this.processingCanvas.getContext("2d");
    this.ratio = Math.min(window.devicePixelRatio, 2);

    //assets
    this.assets = assets;
    // Controllers
    this.touchController = new TouchController(this.canvas);
    this.soundController = new SoundController();
    // this.state = new HomeScreen({});
    this.state = new LoadingState({
      onLoadComplete: () => {
        this.state = new TitleScreen({
          handleExit: () => {
            this.state = new HomeScreen({});
            // this.state = new GameEngineExamplesState({});
          },
        });
      },
      onFail: (err) => (this.state = new ErrorState(err)),
    });
  }
  init() {}
  load() {}
  play() {}
  update(deltaTime) {
    this.state.update(deltaTime);
  }
  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.processingCtx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    this.state.draw(this.ctx);
    this.touchController.draw(this.ctx);
  }
}

export default Game;
