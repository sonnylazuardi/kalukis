define(function(require){
  var fabric = require("fabric");

  return {
    create: function(canvas){
      var vLine = new fabric.PatternBrush(canvas);

      vLine.getPatternSrc = function(){

      };
    }
  };
});