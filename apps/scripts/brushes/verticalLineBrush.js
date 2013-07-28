define(function(require){
  var fabric = require("fabric");

  return {
    create: function(canvas){
      var vLine = new fabric.PatternBrush(canvas);

      // override
      vLine.getPatternSrc = function(){
        var patternCanvas = fabric.document.createElement("canvas");
        patternCanvas.width = patternCanvas.height = 10;

        var ctx = patternCanvas.getContext("2d");

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
      };

      return vLine;
    }
  };
});