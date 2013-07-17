define(function(require){
  var rectOutlinePts = require("utils/rectOutlinePoints"),
      circleBrush = require("brushes/circleBrush");

  function createRectCircle(canvas, cfg){
    var cb = circleBrush.create(canvas),
        outline = rectOutlinePts(cb, cfg.x, cfg.y, cfg.width, cfg.height),
        outlineLength = outline.length;

    cb.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      cb.addPoint(outline[i]);
    }

    // cb.render();
    cb.onMouseUp();
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.width || !cfg.height){
        throw new Error("Required params not supplied");
      }

      return createRectCircle(canvas, cfg);
    }
  };
});