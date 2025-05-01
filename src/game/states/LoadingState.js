import { load } from "../../engine/assetLoader";
import Text from "../../engine/object/text/Text";
import State from "./State";

import blockImage from "/images/blok.jpg";
import boomSOund from "/audio/sfx_exp_short_soft1.wav";
import songSound from "/audio/josh-song.mp3";

let assetsToLoad = [
  ["albumCover", blockImage],
  ["boom", boomSOund],
  ["music", songSound],
];

export default class LoadingState extends State {
  constructor(onLoadComplete, onFail) {
    super();
    this.loadingText = new Text({ text: "Loading..." });

    load(assetsToLoad)
      .catch((error) => {
        onFail(error);
        throw new TypeError(error);
      })
      .then(() => {
        onLoadComplete();
      });
  }
  update(deltaTime) {}
  draw(ctx) {
    this.loadingText.draw(ctx);
  }
}
