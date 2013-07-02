define(function(require){
  var fabric = require("fabric"),
      sprayBrush = require("brushes/sprayBrush");

  function createRectSpray(canvas, cfg){
    var sb = sprayBrush.create(canvas),
        i = cfg.x,
        j = cfg.y,
        width = cfg.width,
        height = cfg.height;

    for (; i <= width; i++) {
      for (; j <= height; j++){
        sb.addSprayChunk({
          x: i,
          y: j
        });
        sb.render();
        sb.onMouseUp();
      }
    }
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