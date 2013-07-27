define(function(require){
  var fabric = require("fabric");

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.radius){
        throw new Error("Required params not provided");
      }

      var circle = new fabric.Circle({
        left: cfg.x,
        top: cfg.y,
        radius: cfg.radius,
        fill: null,
        stroke: cfg.color,
        strokeWidth: cfg.brushWidth || 1
      });

      canvas.add(circle).renderAll();
    }
  };
});