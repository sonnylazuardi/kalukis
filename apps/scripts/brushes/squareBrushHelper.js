define(function(require){
  var fabric = require("fabric");

  return {
    drawSquares: function(canvas, cfg){
      var points = cfg.points;

      var originalRenderOnAddition = canvas.renderOnAddition;
      canvas.renderOnAddition = false;

      for (var i = points.length - 1; i >= 0; i--) {
        var point = points[i];

        canvas.add(new fabric.Rect({
          width: point.width,
          height: point.height,
          left: point.x,
          top: point.y,
          fill: point.fill ? point.fill : null,
          stroke: point.strokeColor ? point.strokeColor: null,
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