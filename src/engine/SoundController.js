import { Howl } from "howler";

export default class SoundController {
  constructor() {
    this.sfx = {};
    this.muted = false;
  }

  toggleMute() {
    this.muted = !this.muted;
    this.sfx.forEach((sound) => {
      console.log("muting: ", sound);
      sound.mute(this.muted);
    });
  }
}
