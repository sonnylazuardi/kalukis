define(function(require){
  var fabric = require("fabric"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("brushes/with_outline_helper");

  var circularPatternBrush = {
    create: function(canvas){
      return new fabric.PatternBrush(canvas);
    },
    
    createShapeBrush: function(canvas, cfg) {
      var b = this.create(canvas);
      b.width = cfg.brushWidth || 10;
      b.color = cfg.color;

      var outline = this.createOutline(b, cfg.shape, cfg);

      for (var i = outline.length - 1; i >= 0; i--) {
        b._points.push(new fabric.Point(outline[i].x, outline[i].y));
      }

      b._finalizeAndAddPath();
    }
  };

  compose.mixin(circularPatternBrush, [withOutlineHelper]);

  return circularPatternBrush;
});