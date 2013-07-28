define(function(require){
  var fabric = require("fabric");

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
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();
        // return this canvas pattern
        return patternCanvas;
      };

      return vLine;
    }
  };
});