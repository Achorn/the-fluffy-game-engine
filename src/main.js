import Game from "./game/Game";
let canvas = document.querySelector("#my-canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

let game = new Game();
var lastTime = 16;

let gameLoop = (currentTime) => {
  const deltaTime = currentTime - lastTime;
  game.update(deltaTime);
  game.draw(ctx);
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
};

gameLoop(16);
