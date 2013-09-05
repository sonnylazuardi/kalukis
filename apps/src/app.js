/**
 * I'm alive
 */
define(function(require){

  var lukis = require("painters/lukis"),
      brushManager = require("brushManager");

  function boots(){
    lukis.attachTo(document, {
      canvasEl: "#lukis"
    });
    brushManager.attachTo(document);
  }

  return {
    boots: boots
  };
});