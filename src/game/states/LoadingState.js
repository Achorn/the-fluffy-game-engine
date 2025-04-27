import { load } from "../../engine/assetLoader";
import Text from "../../engine/object/text/Text";
import State from "./State";

let assetsToLoad = [
  ["albumCover", "./images/blok.jpg"],
  // ["music", "./audio/josh-song.mp3"],
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
