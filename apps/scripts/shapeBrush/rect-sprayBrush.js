define(function(require){
  var rectOutlinePts = require("utils/rectOutlinePoints"),
      sprayBrush = require("brushes/sprayBrush"),
      sprayBrushHelper = require("brushes/sprayBrushHelper");

  function createRectSpray(canvas, cfg){
    var sb = sprayBrush.create(canvas);
    // for performance reason
    sb.width = (cfg.brushWidth < 10 ? 10 : cfg.brushWidth);
    sb.density = 15;
    sb.dotWidth = 2;

    var outline = rectOutlinePts(sb, cfg.x, cfg.y, cfg.width, cfg.height),
        outlineLength = outline.length;

    sb.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      sb.addSprayChunk(outline[i]);
    }

    sprayBrushHelper.drawChunks(canvas, {
      color: sb.color,
      chunks: sb.sprayChunks
    });
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.width || !cfg.height){
        throw new Error("Required params not supplide");
      }

      cfg.brushWidth = cfg.brushWidth || 10;

      return createRectSpray(canvas, cfg);
    }
  };
});