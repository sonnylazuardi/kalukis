define(function(require){
  var fabric = require("fabric"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("brushes/with_outline_helper");

  var circularPatternBrush = {
    create: function(canvas){
      return new fabric.PatternBrush(canvas);
    },
    
    createShapeBrush: function(canvas, cfg) {
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

  compose.mixin(circularPatternBrush, [withOutlineHelper]);

  return circularPatternBrush;
});