import { Howl } from "howler";

export default class SoundController {
  constructor() {
    this.sfx = {};
    this.muted = false;
  }

  addSound(title, src, onload) {
    this.sfx[title] = new Howl({ src, preload: true, onload });
    let sound = this.sfx[title];
    // this.sfx[title].onLoad(() => {
    //   console.log("loaded");
    // });

    return sound;
  }

  // let volume = 0.3;
  // let muted = true;
  // var sfx = {
  //   impact: new Howl({ src: beepSound, volume: volume, mute: muted }),
  //   explosion: new Howl({ src: boopSound, volume: volume, mute: muted }),
  // };

  // export default sfx;
}
