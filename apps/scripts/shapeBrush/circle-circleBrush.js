define(function(require){
  var circleOutlinePts = require("utils/circleOutlinePoints"),
      circleBrush = require("brushes/circleBrush"),
      circleBrushHelper = require("brushes/circleBrushHelper");

  function createCircularCircle(canvas, cfg){
    var cb = circleBrush.create(canvas);
    cb.width = cfg.brushWidth || 10;

    var outline = circleOutlinePts(cb, cfg.x, cfg.y, cfg.radius),
        outlineLength = outline.length;

    cb.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      cb.addPoint(outline[i]);
    }

    circleBrushHelper.drawCircles(canvas, {
      points: cb.points
    });
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.radius){
        throw new Error("Required params not provided");
      }

      return createCircularCircle(canvas, cfg);
    }
  };
});