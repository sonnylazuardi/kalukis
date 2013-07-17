define(function(require){
  var sprayBrush = require("brushes/sprayBrush"),
      lineOutliner = require("utils/lineOutline");

  function createLineCircleBrush(canvas, cfg){
    var sb = sprayBrush.create(canvas),
        outline = lineOutliner(sb, cfg.x1, cfg.y1, cfg.x2, cfg.y2),
        outlineLength = outline.length;

    sb.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      sb.addSprayChunk(outline[i]);
    }

    sb.onMouseUp();
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x1 || !cfg.x2 || !cfg.y1 || !cfg.y2){
        throw new Error("Required params not provided");
      }

      return createLineCircleBrush(canvas, cfg);
    }
  };
});