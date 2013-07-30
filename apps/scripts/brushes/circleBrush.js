define(function(require){
  var fabric = require("fabric"),
      circleBrushHelper = require("brushes/circleBrushHelper"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("brushes/with_outline_helper");

  var circleBrush = {
    create: function(canvas){
      return new fabric.CircleBrush(canvas);
    },
    
    createShapeBrush: function(canvas, cfg){
      var brush = this.create(canvas);
      brush.width = cfg.brushWidth || 10;

      var outline = this.createOutline(brush, cfg.shape, cfg),
          outlineLength = outline.length;

      brush.color = cfg.color || "#000000";

      for (var i = 0; i < outlineLength; i++){
        brush.addPoint(outline[i]);
      }

      circleBrushHelper.drawCircles(canvas, {
        points: brush.points
      });
    }
  };

  compose.mixin(circleBrush, [withOutlineHelper]);
  
  return circleBrush;
});