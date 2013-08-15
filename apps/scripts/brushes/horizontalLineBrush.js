define(function(require){
  var fabric = require("fabric"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("mixins/with_outline_helper");

  var horizontalLineBrush = {
    create: function(canvas){
      var vLine = new fabric.PatternBrush(canvas);

      /**
       * This method will be used to create a pattern
       */
      vLine.getPatternSrc = function(){
        // create a canvas for the pattern
        var patternCanvas = fabric.document.createElement("canvas");
        patternCanvas.width = patternCanvas.height = 10;

        var ctx = patternCanvas.getContext("2d");
        // create the pattern
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();
        // return this canvas pattern
        return patternCanvas;
      };

      return vLine;
    },
    
    createShapeBrush: function(canvas, cfg){
      var brush = this.create(canvas);
      brush.width = cfg.brushWidth || 10;
      brush.color = cfg.color;

      var outline = this.createOutline(brush, cfg.shape, cfg);

      for (var i = outline.length - 1; i >= 0; i--) {
        brush._points.push(new fabric.Point(outline[i].x, outline[i].y));
      }
      // use fabric.PatternBrush internal method
      brush._finalizeAndAddPath();
    }
  };

  compose.mixin(horizontalLineBrush, [withOutlineHelper]);

  return horizontalLineBrush;
});