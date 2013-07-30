define(function(require){
  var rectOutlinePts = require("utils/rectOutlinePoints"),
      circleOutlinePts = require("utils/circleOutlinePoints"),
      lineOutlinePts = require("utils/lineOutlinePoints");
      
  function outlineHelper(){
    this.createOutline = function(brush, shape, cfg){
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
    };
  }

  return outlineHelper;
});