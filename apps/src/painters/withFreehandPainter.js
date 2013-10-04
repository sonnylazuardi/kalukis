/**
 * I know whats needed to draw a free hand
 */
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
      this.on("brushServed", function(e, data){
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
      var usedBrush = brush || this.attr.activeBrush;

      if (usedBrush) {
        this.attr.mixinCanvas = canvas;
        this.attr.mixinCanvas.isDrawingMode = true;
        this.attr.mixinCanvas.freeDrawingBrush = usedBrush.getBrush();
        this.attr.mixinCanvas.freeDrawingBrush.color = usedBrush.get("fillColor");
        this.attr.mixinCanvas.freeDrawingBrush.width = usedBrush.get("width");  
      }
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
        this.attr.mixinCanvas.freeDrawingBrush.color = brush.get("fillColor");
        this.attr.mixinCanvas.freeDrawingBrush.width = brush.get("width");
      }
    };

    this.setBrushWidth = function(width){
      // this.attr.brushWidth = width;
      this.attr.activeBrush.set("width", width);

      if (this.attr.mixinCanvas && this.attr.mixinCanvas.isDrawingMode) {
        this.attr.mixinCanvas.freeDrawingBrush.width = width;
      }
    };

    this.setBrushColor = function(color){
      this.attr.activeBrush.set("fillColor", color);

      if (this.attr.mixinCanvas && this.attr.mixinCanvas.isDrawingMode) {
        this.attr.mixinCanvas.freeDrawingBrush.color = color;
      }
    };

  }

});