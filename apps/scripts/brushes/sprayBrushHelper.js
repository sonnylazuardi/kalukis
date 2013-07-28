define(function(require){
  var fabric = require("fabric");

  return {
    drawChunks: function(canvas, cfg){
      var chunks = cfg.chunks;
      var originalRenderOnAddition = canvas.renderOnAddition;
      canvas.renderOnAddition = false;

      for (var i = chunks.length - 1; i >= 0; i--) {
        var sprayChunk = chunks[i];

        for (var j = 0, jlen = sprayChunk.length; j < jlen; j++) {
          canvas.add(new fabric.Rect({
            width: sprayChunk[j].width,
            height: sprayChunk[j].width,
            left: sprayChunk[j].x + 1,
            top: sprayChunk[j].y + 1,
            fill: cfg.color,
            hasControls: false,
            hasRotatingPoint: false,
            lockUniScaling: true
          }));
        }
      }

      canvas.clearContext(canvas.contextTop);
      canvas.renderOnAddition = originalRenderOnAddition;
      canvas.renderAll();
    }
  };
});