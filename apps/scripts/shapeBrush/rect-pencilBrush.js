define(function(require){
  var fabric = require("fabric");

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.width || !cfg.height){
        throw new Error("Required params not provided");
      }

      var rect = new fabric.Rect({
        width: cfg.width,
        height: cfg.height,
        top: cfg.y + (cfg.height/2),
        left: cfg.x + (cfg.width/2),
        fill: null,
        stroke: cfg.color
      });

      canvas.add(rect).renderAll();
    }
  };
});