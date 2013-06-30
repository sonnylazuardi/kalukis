({
  appDir: "../",
  baseUrl: "scripts",
  dir: "../../build",
  name: "main",
  mainConfigFile: "main.js",
  paths: {
    requireLib: "vendor/requirejs/require"
  },
  include: ["requireLib"],
  optimize: "uglify2",
  skipDirOptimize: true
})