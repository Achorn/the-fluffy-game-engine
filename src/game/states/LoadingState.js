import { load } from "../../engine/assetLoader";
import State from "./State";

let assetsToLoad = [
  ["albumCover", "./images/blok.jpg"],
  ["music", "./audio/josh-song.mp3"],
];

export default class LoadingState extends State {
  constructor(onLoadComplete) {
    super();
    load(assetsToLoad)
      .catch((error) => {
        throw new TypeError(error);
      })
      .then(() => {
        onLoadComplete();
      });
  }
  update(deltaTime) {}
  draw(ctx) {
    ctx.font = "30px Arial";
    ctx.fillText("Loading...", 100, 100);
  }
}
