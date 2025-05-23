// import wasm from "vite-plugin-wasm";

export default {
  root: "src/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    // target: "esnext", //browsers can handle the latest ES features
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
  // plugins: [wasm()],
};
