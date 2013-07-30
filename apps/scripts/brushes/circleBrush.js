define(function(require){
  var fabric = require("fabric"),
      circleBrushHelper = require("brushes/circleBrushHelper"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("brushes/with_outline_helper");

  var circleBrush = {
    create: function(canvas){
      return new fabric.CircleBrush(canvas);
    },
    // for drawing shaped object
    createShapeBrush: function(canvas, cfg){
      var cb = this.create(canvas);
      cb.width = cfg.brushWidth || 10;

      var outline = this.createOutline(cb, cfg.shape, cfg),
          outlineLength = outline.length;

      cb.color = cfg.color || "#000000";

      for (var i = 0; i < outlineLength; i++){
        cb.addPoint(outline[i]);
      }

      circleBrushHelper.drawCircles(canvas, {
        points: cb.points
      });
    }
  };

  compose.mixin(circleBrush, [withOutlineHelper]);
  
  return circleBrush;
});