define(function(require){
  var fabric = require("fabric"),
      circleBrush = require("brushes/circleBrush");

  function createCircleSpray(canvas, cfg){
    var cb = circleBrush.create(canvas),
        outline = getOutline(cb, cfg.x, cfg.y, cfg.width, cfg.height),
        outlineLength = outline.length;

    cb.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      cb.addPoint(outline[i]);
    }

    // cb.render();
    cb.onMouseUp();
  }

  // TODO is there a better formula to attain this?
  function getOutline(sb, x, y, width, height){
    var points = [],
        sbWidth = sb.width,
        wLength = x + width,
        hLength = y + height;
    // get top
    for (var i = x; i < wLength; i+= sbWidth){
      points.push({x: i, y: y});
    }

    // get left
    for (i = y; i < hLength; i += sbWidth){
      points.push({x: x, y: i});
    }

    // get bottom
    for (i = x; i < wLength; i += sbWidth){
      points.push({x: i, y: y + height});
    }

    // get right
    for (i = hLength; i >= y; i -= sbWidth){
      points.push({x: x + width, y: i});
    }

    return points;
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