({
  baseUrl: "apps",
  paths: {
    requireLib: "../components/requirejs/require"
  },
  name: "../main",
  mainConfigFile: "main.js",
  include: ["requireLib"],
  out: "main-built.js"
})