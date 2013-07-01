({
  appDir: "../",
  baseUrl: "scripts",
  dir: "../../build",
  name: "main",
  mainConfigFile: "main.js",
  paths: {
    requireLib: "vendor/requirejs/require",
    "es5-sham": "vendor/es5-shim/es5-sham",
    "es5-shim": "vendor/es5-shim/es5-shim"
  },
  include: ["requireLib", "es5-sham", "es5-shim"],
  optimize: "uglify2",
  skipDirOptimize: true,
  optimizeCss: "standard"
})