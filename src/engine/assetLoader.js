//asset loader from this guy
// https://www.youtube.com/watch?v=47yNIKlTAro

// Event listener for user interaction to unlock audio
// document.addEventListener('click', function() {
//   unlockAudio();
//   document.removeEventListener('click', arguments.callee); // Remove the listener after first click
// });

// THE THORN
import { Howl } from "howler";
const AssetType = {
  IMAGE: "image",
  SOUND: "sound",
  SVG: "svg",
};

const AssetTypeLookup = {
  png: AssetType.IMAGE,
  jpg: AssetType.IMAGE,
  webp: AssetType.IMAGE,
  svg: AssetType.IMAGE,
  mp3: AssetType.SOUND,
  wav: AssetType.SOUND,
  // ogg: AssetType.SOUND,
  // OGG files cause updload issues as of now
  // //not dealing with svgs right now
  // svg: AssetType.SVG,
};

export const assets = new Map(); // holds potential asset elements

function loadImage(key, fileName, onComplete) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(
      "load",
      () => {
        resolve({ key, asset: image });
        if (typeof onComplete === "function") onComplete({ fileName, image });
      },
      { once: true }
    );
    image.addEventListener("error", (event) => reject({ fileName, event }));
    image.src = fileName;
  });
}

function loadSound(key, fileName, sprite, onComplete) {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: fileName,
      preload: true,
      sprite,
    });
    sound.on(
      "load",
      () => {
        resolve({ key, asset: sound });
        if (typeof onComplete === "function") onComplete({ fileName, sound });
      },
      { once: true }
    );
    sound.on("loaderror", (event) => reject({ fileName, event }));
  });
}

export async function load(assetArray, onComplete) {
  const promises = assetArray.map(([key, fileName, sprite]) => {
    const extention = fileName
      .substring(fileName.lastIndexOf(".") + 1)
      .toLowerCase();
    const type = AssetTypeLookup[extention];
    if (type === AssetType.IMAGE) {
      return loadImage(key, fileName, onComplete);
    } else if (type === AssetType.SOUND) {
      return loadSound(key, fileName, sprite, onComplete);
    } else {
      throw new TypeError("Error unknown Asset type: ", type);
    }
  });

  return Promise.all(promises).then((loadedAssets) => {
    for (const { key, asset } of loadedAssets) {
      assets.set(key, asset);
    }
  });
}
