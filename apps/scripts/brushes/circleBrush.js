define(function(require){
  var fabric = require("fabric"),
      rectOutlinePts = require("utils/rectOutlinePoints"),
      circleOutlinePts = require("utils/circleOutlinePoints"),
      lineOutlinePts = require("utils/lineOutlinePoints"),
      circleBrushHelper = require("brushes/circleBrushHelper");

  return {
    // for freedraw
    create: function(canvas){
      return new fabric.CircleBrush(canvas);
    },
    // create outline for the specified shape
    createOutline: function(brush, shape, cfg){
      // TODO can we simplify this?
      // TODO parameter checking
      if (shape === "rect") {
        return rectOutlinePts(brush, cfg.x, cfg.y, cfg.width, cfg.height);
      } else if (shape === "circle") {
        return circleOutlinePts(brush, cfg.x, cfg.y, cfg.radius);
      } else if (shape === "line") {
        return lineOutlinePts(brush, cfg.x1, cfg.y1, cfg.x2, cfg.y2);
      }

      return;
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
});