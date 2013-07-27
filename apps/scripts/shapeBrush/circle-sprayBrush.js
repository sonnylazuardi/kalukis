define(function(require){
  var circleOutlinePts = require("utils/circleOutlinePoints"),
      sprayBrush = require("brushes/sprayBrush");

  function createCircularSpray(canvas, cfg){
    var sb = sprayBrush.create(canvas);
    // for performance reason
    sb.width = (cfg.brushWidth < 10 ? 10 : cfg.brushWidth);
    sb.dotWidth = 5;
    
    var outline = circleOutlinePts(sb, cfg.x, cfg.y, cfg.radius),
        outlineLength = outline.length;

    sb.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      sb.addSprayChunk(outline[i]);
    }

    sb.onMouseUp();
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.radius){
        throw new Error("Required params not provided");
      }

      cfg.brushWidth = cfg.brushWidth || 10;

      return createCircularSpray(canvas, cfg);
    }
  };
});