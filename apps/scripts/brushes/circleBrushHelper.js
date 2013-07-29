define(function(require){
  var fabric = require("fabric");

  return {
    drawCircles: function(canvas, cfg){
      var points = cfg.points;

      var originalRenderOnAddition = canvas.renderOnAddition;
      canvas.renderOnAddition = false;

      for (var i = points.length - 1; i >= 0; i--) {
        var point = points[i];
        canvas.add(new fabric.Circle({
          radius: point.radius,
          left: point.x,
          top: point.y,
          fill: point.fill ? point.fill : null,
          strokeColor: point.strokeColor ? point.strokeColor: null,
          hasControls: false,
          hasRotatingPoint: false,
          lockUniScaling: true
        }));
      };

      canvas.clearContext(canvas.contextTop);
      canvas.renderOnAddition = originalRenderOnAddition;
      canvas.renderAll();
    }
  };
});