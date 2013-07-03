define(function(require){
  var rectOutline = require("utils/rectOutline"),
      circleBrush = require("brushes/circleBrush");

  function createCircleSpray(canvas, cfg){
    var cb = circleBrush.create(canvas),
        outline = rectOutline(cb, cfg.x, cfg.y, cfg.width, cfg.height),
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
        throw new Error("Required params not supplide");
      }

      return createCircleSpray(canvas, cfg);
    }
  };
});