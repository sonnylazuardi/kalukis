/**
 * Provides a mixin for getting the instance of canvas.
 */
define(function(){

  return withCanvas;

  function withCanvas(){
    this.defaultAttrs({
      canvas: "", // canvas instance
      canvasEl: "" // canvas id
    });

    this.after("initialize", function(){
      this.on(document, "canvasReady", this.onCanvasReady);

      // I want to have a reference to the canvas
      this.trigger(document, "canvasRequested");
    });

    this.onCanvasReady = function(e, eObj){
      this.attr.canvas = eObj.canvas;
      this.attr.canvasEl = eObj.canvasEl;
    };
  }
});