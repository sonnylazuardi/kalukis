define(function(require){
  var fabric = require("fabric"),
      sprayBrushHelper = require("brushes/sprayBrushHelper"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("mixins/with_outline_helper");

  var sprayBrush = {
    // for freedraw
    create: function(canvas){
      return new fabric.SprayBrush(canvas);
    },
    
    // for drawing shaped object
    createShapeBrush: function(canvas, cfg){
      var brush = this.create(canvas);
      // for performance reason
      brush.width = (cfg.brushWidth < 10 ? 10 : cfg.brushWidth);
      brush.density = 15;
      brush.dotWidth = 2;

      var outline = this.createOutline(brush, cfg.shape, cfg),
          outlineLength = outline.length;

      brush.color = cfg.color || "#000000";

      for (var i = 0; i < outlineLength; i++){
        brush.addSprayChunk(outline[i]);
      }

      sprayBrushHelper.drawChunks(canvas, {
        color: brush.color,
        chunks: brush.sprayChunks
      });
    }
  };

  compose.mixin(sprayBrush, [withOutlineHelper]);

  return sprayBrush;
});