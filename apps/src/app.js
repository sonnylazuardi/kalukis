/**
 * I'm alive
 */
define(function(require){

  var lukis = require("painters/lukis"),
      brushManager = require("brushManager");

  function boots(){
    brushManager.attachTo(document);
    lukis.attachTo(document, {
      canvasEl: "#lukis"
    });
  }

  return {
    boots: boots
  };
});