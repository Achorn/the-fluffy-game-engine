import Game from "./game/Game";
let width = window.innerWidth;
let height = window.innerHeight;

let canvas = document.querySelector("#my-canvas");
let ctx = canvas.getContext("2d");
let processingCanvas = document.querySelector("#processing-canvas");
let processingCtx = processingCanvas.getContext("2d");
processingCanvas.style.display = "none";

let canvases = [
  { canvas: canvas, ctx: ctx },
  { canvas: processingCanvas, ctx: processingCtx },
];
const ratio = Math.min(window.devicePixelRatio, 2);
// canvases.forEach((canvasInfo) => {
// let canvas = canvasInfo.canvas;
// let ctx = canvasInfo.ctx;

ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;
ctx.imageSmoothingEnabled = false;

// 1. Multiply the canvas's width and height by the devicePixelRatio
canvas.width = width * ratio;
canvas.height = height * ratio;
// 2. Force it to display at the original (logical) size with CSS or style attributes
canvas.style.width = width + "px";
canvas.style.height = height + "px";
// 3. Scale the context so you can draw on it without considering the ratio.
ctx.scale(ratio, ratio);
// });
// processingCtx.canvas.width = window.innerWidth;
// processingCtx.canvas.height = window.innerHeight;
// processingCtx.imageSmoothingEnabled = false;

processingCtx.canvas.height = window.innerHeight;
processingCtx.canvas.width = window.innerWidth;
processingCtx.imageSmoothingEnabled = false;

// 1. Multiply the canvas's width and height by the devicePixelRatio
processingCanvas.width = width * ratio;
processingCanvas.height = height * ratio;
// 2. Force it to display at the original (logical) size with CSS or style attributes
processingCanvas.style.width = width + "px";
processingCanvas.style.height = height + "px";
// 3. Scale the context so you can draw on it without considering the ratio.
processingCtx.scale(ratio, ratio);

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
