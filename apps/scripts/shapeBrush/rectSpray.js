define(function(require){
  var fabric = require("fabric"),
      sprayBrush = require("brushes/sprayBrush");

  function createRectSpray(canvas, cfg){
    var sb = sprayBrush.create(canvas),
        i = cfg.x,
        j,
        width = i + cfg.width,
        height = cfg.y + cfg.height;

    for (; i <= width; i += sb.width) {
      for (j = cfg.y; j <= height; j += sb.width){
        sb.addSprayChunk({x: i, y: j});
      }
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