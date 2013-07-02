/**
 * Provides a mixin for getting the instance of canvas.
 */
define(function(){

  return withCanvas;

  function withCanvas(){
    this.defaultAttrs({
      canvas: "",
      canvasEl: ""
    });

    this.after("initialize", function(){
      this.on(document, "canvasReady", this.setCanvas);

      // I want to have a reference to the canvas
      this.trigger(document, "canvasRequested");
    });

    this.setCanvas = function(e, eObj){
      this.attr.canvas = eObj.canvas;
    };
  }
});