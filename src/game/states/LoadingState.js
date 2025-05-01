import { load } from "../../engine/assetLoader";
import Text from "../../engine/object/text/Text";
import State from "./State";

import blockImage from "/images/blok.jpg";
import boomSOund from "/audio/sfx_exp_short_soft1.wav";
import songSound from "/audio/josh-song.mp3";
import fartSound from "/audio/fart-hearty-bwomp-locran-1-00-00.mp3";
import switchSound from "/audio/switch_002.wav";

let assetsToLoad = [
  ["albumCover", blockImage],
  ["boom", boomSOund],
  ["music", songSound],
  ["fart", fartSound],
  ["switch", switchSound],
];

export default class LoadingState extends State {
  constructor(onLoadComplete, onFail) {
    super();
    this.count = 0;
    this.intervalId = setInterval(() => {
      this.count++;
    }, 800);

    this.loadingTextStates = ["Loading.", "Loading..", "Loading..."];
    this.loadingText = new Text({
      text: this.loadingTextStates[0],
      alignment: "center",
      baseline: "middle",
      startX: this.game.ctx.canvas.width * 0.5,
      startY: this.game.ctx.canvas.height * 0.5,
    });

    load(assetsToLoad)
      .catch((error) => {
        onFail(error);
        throw new TypeError(error);
      })
      .then(() => {
        onLoadComplete();
        clearInterval(this.intervalId);
      });
  }
  update(deltaTime) {
    this.loadingText.text = this.loadingTextStates[this.count % 3];
  }
  draw(ctx) {
    this.loadingText.draw(ctx);
  }
}
