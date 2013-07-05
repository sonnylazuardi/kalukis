define(function(require){
  var circleOutline = require("utils/circleOutline"),
      circleBrush = require("brushes/circleBrush");

  function createCircularCircle(canvas, cfg){
    var cc = circleBrush.create(canvas),
        outline = circleOutline(cc, cfg.x, cfg.y, cfg.radius),
        outlineLength = outline.length;

    cc.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      cc.addPoint(outline[i]);
    }

    cc.onMouseUp();
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