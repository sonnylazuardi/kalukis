define(function(require){
  var fabric = require("fabric"),
      sprayBrushHelper = require("brushes/sprayBrushHelper"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("brushes/with_outline_helper");

  var sprayBrush = {
    // for freedraw
    create: function(canvas){
      return new fabric.SprayBrush(canvas);
    },
    
    // for drawing shaped object
    createShapeBrush: function(canvas, cfg){
      console.log("im called");
      var sb = this.create(canvas);
      // for performance reason
      sb.width = (cfg.brushWidth < 10 ? 10 : cfg.brushWidth);
      sb.density = 15;
      sb.dotWidth = 2;

      var outline = this.createOutline(sb, cfg.shape, cfg),
          outlineLength = outline.length;

      sb.color = cfg.color || "#000000";

      for (var i = 0; i < outlineLength; i++){
        sb.addSprayChunk(outline[i]);
      }

      sprayBrushHelper.drawChunks(canvas, {
        color: sb.color,
        chunks: sb.sprayChunks
      });
    }
  };

  compose.mixin(sprayBrush, [withOutlineHelper]);

  return sprayBrush;
});