/**
 * This sandbox abstracts the canvas API
 */
define(function(require){

  var canvas = require("canvasProvider");

  return withCanvasRendering; 

  function withCanvasRendering(){

    this.render = function(){
      canvas.render();
    };

    this.renderAll = function(){
      canvas.renderAll();
    };

  }

});