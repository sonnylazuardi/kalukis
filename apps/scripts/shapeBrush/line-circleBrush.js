define(function(require){
  var circleBrush = require("brushes/circleBrush");

  function createLineCircleBrush(canvas, cfg){
    var cb = circleBrush.create(canvas);

    cb.color = cfg.color || "#000000";


  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x1 || !cfg.x2 || !cfg.y1 || !cgf.y2){
        throw new Error("Required params not provided");
      }

      return createLineCircleBrush(canvas, cfg);
    }
  }
});