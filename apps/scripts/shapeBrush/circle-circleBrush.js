define(function(require){
  var circleOutline = require("utils/circleOutline"),
      circleBrush = require("brushes/circleBrush");

  function createCircularCircle(){

  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.radius){
        throw new Error("Required params not supplied")
      }

      return createCircularCircle(canvas, cfg);
    }
  };
});