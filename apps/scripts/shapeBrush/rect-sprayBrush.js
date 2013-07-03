define(function(require){
  var fabric = require("fabric"),
      rectOutline = require("utils/rectOutline"),
      sprayBrush = require("brushes/sprayBrush");

  function createRectSpray(canvas, cfg){
    var sb = sprayBrush.create(canvas),
        outline = rectOutline(sb, cfg.x, cfg.y, cfg.width, cfg.height),
        outlineLength = outline.length;

    sb.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      sb.addSprayChunk(outline[i]);
    }

    sb.render();
    sb.onMouseUp();
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.width || !cfg.height){
        throw new Error("Required params not supplide");
      }

      return createRectSpray(canvas, cfg);
    }
  };
});