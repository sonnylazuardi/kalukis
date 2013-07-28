define(function(require){
  var fabric = require("fabric");

  return {
    create: function(canvas){
      return new fabric.PencilBrush(canvas);
    },
    drawCircle: function(canvas, cfg){
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
    },
    drawRect: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.width || !cfg.height){
        throw new Error("Required params not provided");
      }

      var rect = new fabric.Rect({
        width: cfg.width,
        height: cfg.height,
        top: cfg.y + (cfg.height/2),
        left: cfg.x + (cfg.width/2),
        fill: null,
        stroke: cfg.color,
        strokeWidth: cfg.brushWidth || 1
      });

      canvas.add(rect).renderAll();
    },
    drawLine: function(canvas, cfg){
      if (!cfg.x1 || !cfg.x2 || !cfg.y1 || !cfg.y2){
        throw new Error("Required params not provided");
      }

      var line = new fabric.Line([cfg.x1, cfg.y1, cfg.x2, cfg.y2], {
        stroke: cfg.color,
        strokeWidth: cfg.brushWidth || 1
      });

      canvas.add(line).renderAll();
    },
    createShapeBrush: function(canvas, cfg){
      console.log("new");
      if (cfg.shape === "line"){
        this.drawLine(canvas, cfg);
      } else if (cfg.shape === "rect") {
        this.drawRect(canvas, cfg);
      } else if (cfg.shape === "circle") {
        this.drawCircle(canvas, cfg);
      }
    }
  };
});