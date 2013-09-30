define(function(require){

  var fabric = require("fabric");

  return withFreeHandPainter;

  function withFreeHandPainter(){

    this.defaultAttrs({

      mixinCanvas: undefined,

      activeBrush: undefined,

      brushWidth: 10,

      brushColor: "#000000"

    });

    this.after("initialize", function(){
      this.on("activeBrushUpdated", function(e, data){
        this.setBrush(data.brush);
      }.bind(this));

      this.on("brushPropertyUpdated", function(e, data){
        if (data.key === "width") {
          this.setBrushWidth(data.newValue);  
        } else if (data.key === "fillColor" || data.key === "strokeColor") {
          this.setBrushColor(data.newValue);
        }
      }.bind(this));
    });

    this.startFreehandPainting = function(canvas, brush){
      this.attr.mixinCanvas = canvas;
      this.attr.mixinCanvas.isDrawingMode = true;
      this.attr.mixinCanvas.freeDrawingBrush = brush.getBrush();
      this.attr.mixinCanvas.freeDrawingBrush.color = this.attr.brushColor;
      this.attr.mixinCanvas.freeDrawingBrush.width = this.attr.brushWidth;
    };

    this.stopFreehandPainting = function(){
      if (this.attr.mixinCanvas) {
        this.attr.mixinCanvas.isDrawingMode = false;  
      }
    };

    this.setBrush = function(brush){
      this.attr.activeBrush = brush;
      
      if (this.attr.mixinCanvas && this.attr.mixinCanvas.isDrawingMode) {
        this.attr.mixinCanvas.freeDrawingBrush = brush.getBrush();
      }
    };

    this.setBrushWidth = function(width){
      this.attr.brushWidth = width;

      if (this.attr.mixinCanvas && this.attr.mixinCanvas.isDrawingMode) {
        this.attr.mixinCanvas.freeDrawingBrush.width = this.attr.brushWidth;
      }
    };

    this.setBrushColor = function(color){
      this.attr.brushColor = color;

      if (this.attr.mixinCanvas && this.attr.mixinCanvas.isDrawingMode) {
        this.attr.mixinCanvas.freeDrawingBrush.color = this.attr.brushColor;
      }
    };

  }

});