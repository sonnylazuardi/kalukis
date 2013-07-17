define(function(require){
  var fabric = require("fabric");

  return {
    create: function(canvas, cfg){
      if (!cfg.x1 || !cfg.x2 || !cfg.y1 || !cfg.y2){
        throw new Error("Required params not provided");
      }

      var line = new fabric.Line([cfg.x1, cfg.y1, cfg.x2, cfg.y2], {
        stroke: cfg.color
      });

      canvas.add(line).renderAll();
    }
  };
});