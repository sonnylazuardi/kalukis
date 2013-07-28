define(function(require){
  var fabric = require("fabric"),
      rectOutlinePts = require("utils/rectOutlinePoints"),
      circleOutlinePts = require("utils/circleOutlinePoints"),
      lineOutlinePts = require("utils/lineOutlinePoints"),
      sprayBrushHelper = require("brushes/sprayBrushHelper");

  return {
    // for freedraw
    create: function(canvas){
      return new fabric.SprayBrush(canvas);
    },
    createOutline: function(brush, shape, cfg){
      // TODO can we simplify this?
      // TODO parameter checking
      if (shape === "rect") {
        return rectOutlinePts(brush, cfg.x, cfg.y, cfg.width, cfg.height);
      } else if (shape === "circle") {
        return circleOutlinePts(brush, cfg.x, cfg.y, cfg.radius);
      } else if (shape === "line") {
        return lineOutlinePts(brush, cfg.x1, cfg.y1, cfg.x2, cfg.y2);
      }

      return;
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
});