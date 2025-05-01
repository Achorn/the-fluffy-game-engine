//asset loader from this guy
// https://www.youtube.com/watch?v=47yNIKlTAro

// THE THORN
import { Howl } from "howler";
const AssetType = {
  IMAGE: "image",
  SOUND: "sound",
};
const AssetTypeLookup = {
  png: AssetType.IMAGE,
  jpg: AssetType.IMAGE,
  webp: AssetType.IMAGE,
  mp3: AssetType.SOUND,
  ogg: AssetType.SOUND,
  wav: AssetType.SOUND,
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

function loadSound(key, fileName, onComplete) {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: fileName,
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
  const promises = assetArray.map(([key, fileName]) => {
    const extention = fileName
      .substring(fileName.lastIndexOf(".") + 1)
      .toLowerCase();
    const type = AssetTypeLookup[extention];
    if (type === AssetType.IMAGE) {
      return loadImage(key, fileName, onComplete);
    } else if (type === AssetType.SOUND) {
      return loadSound(key, fileName, onComplete);
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
