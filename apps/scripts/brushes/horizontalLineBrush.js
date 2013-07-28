define(function(require){
  var fabric = require("fabric"),
      rectOutlinePts = require("utils/rectOutlinePoints"),
      circleOutlinePts = require("utils/circleOutlinePoints"),
      lineOutlinePts = require("utils/lineOutlinePoints");

  return {
    create: function(canvas){
      var vLine = new fabric.PatternBrush(canvas);

      // override
      vLine.getPatternSrc = function(){
        // create a canvas for the pattern
        var patternCanvas = fabric.document.createElement("canvas");
        patternCanvas.width = patternCanvas.height = 10;

        var ctx = patternCanvas.getContext("2d");
        // create the pattern
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();
        // return this canvas pattern
        return patternCanvas;
      };

      return vLine;
    },
    createOutline: function(brush, shape, cfg){

    },
    createShapeBrush: function(canvas, cfg){
      var b = this.create(canvas);

      var outline = this.createOutline(b, cfg.shape, cfg);
    }
  };
});