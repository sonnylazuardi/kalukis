define(function(){

  return withCanvas;

  function withCanvas(){
    this.defaultAttrs({
      canvas: "",
      canvasEl: ""
    });

    this.setCanvasEl = function(e, eObj){
      this.attr.canvasEl = eObj.canvasEl;
      this.on(this.attr.canvasEl, "canvasReady", this.setCanvas);

      this.trigger(this.attr.canvasEl, "canvasRequested");
    };

    this.setCanvas = function(e, eObj){
      this.attr.canvas = eObj.canvas;
    };
  }
});