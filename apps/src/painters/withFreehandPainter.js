define(function(require){

  var fabric = require("fabric");

  return withFreeHandPainter;

  function withFreeHandPainter(){

    var mixinCanvas;

    this.after("initialize", function(){
      this.on("activeBrushUpdated", function(e, data){
        this.setBrush(data.newActiveBrush.brush);
      }.bind(this));
    });

    this.startFreehandPainting = function(canvas, brush){
      mixinCanvas = canvas;
      mixinCanvas.isDrawingMode = true;
      mixinCanvas.freeDrawingBrush = brush.getBrush();
    };

    this.setBrush = function(brush){
      if (mixinCanvas && mixinCanvas.isDrawingMode) {
        mixinCanvas.freeDrawingBrush = brush.getBrush();
      }
    };

  }

});