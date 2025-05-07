import { load } from "../../engine/assetLoader";
import Text from "../../engine/object/text/Text";
import State from "./State";
import { assets } from "../../engine/assetLoader";
import blockImage from "/images/blok.jpg";
import boomSOund from "/audio/sfx_exp_short_soft1.wav";
import songSound from "/audio/josh-song.mp3";
import fartSound from "/audio/fart-hearty-bwomp-locran-1-00-00.mp3";
import switchSound from "/audio/switch_002.wav";

let assetsToLoad = [
  ["albumCover", blockImage],
  // ["soundOnIcon", "/icons/volume-up.png"],
  // ["volumeUpIconSVG", "/icons/volumeUp.svg"],
  ["boom", boomSOund],
  ["music", songSound],
  ["fart", fartSound],
  [
    "switch",
    switchSound,
    {
      switchDown: [4, 60], // Start at 0ms, duration 1000ms
      switchUp: [64, 200], // Start at 2000ms, duration 1500ms
    },
  ],
];

export default class LoadingState extends State {
  constructor({ onLoadComplete, onFail }) {
    super({});
    this.count = 0;
    this.intervalId = setInterval(() => {
      this.count++;
    }, 800);

    this.loadingTextStates = ["Loading.", "Loading..", "Loading..."];
    this.loadingText = new Text({
      text: this.loadingTextStates[0],
      alignment: "center",
      baseline: "middle",
      startX: window.innerWidth * 0.5,
      startY: window.innerHeight * 0.5,
    });

    load(assetsToLoad)
      .catch((error) => {
        onFail(error);
        throw new TypeError(error);
      })
      .then(() => {
        this.game.soundController.sfx = new Map(
          [...assets].filter(
            ([key, value]) => !(value instanceof HTMLImageElement)
          )
        );
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
