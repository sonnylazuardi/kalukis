define(function(require){
  var fabric = require("fabric"),
      sprayBrush = require("brushes/sprayBrush");

  function createRectSpray(canvas, cfg){
    var sb = sprayBrush.create(canvas),
        outline = getOutline(sb, cfg.x, cfg.y, cfg.width, cfg.height),
        outlineLength = outline.length;

    for (var i = 0; i < outlineLength; i++){
      sb.addSprayChunk(outline[i]);
    }

    sb.render();
    sb.onMouseUp();
  }

  // TODO is there a better formula to attain this?
  function getOutline(sb, x, y, width, height){
    var points = [];
    // get top
    for (var i = x; i < x + width; i+= sb.width){
      points.push({x: i, y: y});
    }

    // get left
    for (i = y; i < y + height; i += sb.width){
      points.push({x: x, y: i});
    }

    // get bottom
    for (i = x; i < x + width; i += sb.width){
      points.push({x: i, y: y + height});
    }

    // get right
    for (i = y + height; i >= y; i -= sb.width){
      points.push({x: x + width, y: i});
    }

    return points;
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