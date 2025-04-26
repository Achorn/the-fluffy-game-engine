//asset loader from this guy
// https://www.youtube.com/watch?v=47yNIKlTAro

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
    const sound = new Audio();

    sound.addEventListener(
      "canplay",
      () => {
        resolve({ key, asset: sound });
        if (typeof onComplete === "function") onComplete({ fileName, sound });
      },
      { once: true }
    );
    sound.addEventListener("error", (event) => reject({ fileName, event }));
    sound.src = fileName;
  });
}

export async function load(assetArray, onComplete) {
  const promises = assetArray.map(([key, fileName]) => {
    const extention = fileName
      .substring(fileName.lastIndexOf(".") + 1)
      .toLowerCase();
    console.log(fileName);
    const type = AssetTypeLookup[extention];
    console.log(type);
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
// ---------------------------------------------------//
// ASSETS V3

// export const assets = new Map(); // holds potential asset elements

// // each asset has a key which we can reference in the game

// export function loadImage(key, fileName, onComplete) {
//   return new Promise((resolve, reject) => {
//     const image = new Image();

//     image.addEventListener(
//       "load",
//       () => {
//         assets.set(key, image);

//         // for clarity but not neccesary
//         resolve({ fileName, image });

//         // insuring callback is actually a cuntion before calling
//         if (typeof onComplete === "function") onComplete({ fileName, image });
//       },
//       { once: true } // event listener will run only once and then be discarded. great for loading an aset once
//     );
//     image.src = fileName;
//   });
// }

// export function loadSound(key, fileName, onComplete) {
//   return new Promise((resolve, reject) => {
//     const sound = new Audio();

//     sound.addEventListener(
//       "canplay",
//       () => {
//         assets.set(key, sound);
//         resolve({ fileName, sound });
//         if (typeof onComplete === "function") onComplete({ fileName, sound });
//       },
//       { once: true }
//     );
//     sound.src = fileName;
//   });
// // }

//--------------------------------------------------- //

// ASSET LOADER V1

// let imageReady = false;
// export function init() {
//   image.addEventListener("load", () => (imageReady = true), { once: true });
//   image.addEventListener("canplay", () => sound.play(), { once: true });

//   image.src = "./assets/blok.jpg";
//   sound.src = "./assets/josh-song.mp3";

//   sound.play();
//   sound.volume = 0.2;
// }

// export function main(ctx, deltaTime) {
//   if (!imageReady) return;
//   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//   ctx.drawImage(image, 0, 0, image.width, image.height);
// }
