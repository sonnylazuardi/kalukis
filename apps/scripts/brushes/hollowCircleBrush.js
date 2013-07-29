define(function(require){
  var fabric = require("fabric");

  // extend fabric.CircleBrush
  var HollowCircle = fabric.util.createClass(fabric.CircleBrush, {
    onMouseMove: function(pointer){
      var point = this.addPoint(pointer);
      var ctx = this.canvas.contextTop;
      // change color
      point.strokeColor = point.fill;
      point.fill = null;

      ctx.lineWidth = 1;
      ctx.strokeStyle = point.strokeColor;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI*2, false);
      ctx.closePath();
      ctx.stroke();
    },

    onMouseUp: function(){
      var originalRenderOnAddition = this.canvas.renderOnAddition;
      this.canvas.renderOnAddition = false;

      for (var i = 0, len = this.points.length; i < len; i++) {
        var point = this.points[i];
        var circle = new fabric.Circle({
          radius: point.radius,
          left: point.x,
          top: point.y,
          fill: null,
          stroke: point.strokeColor,
          strokeWidth: 1
        });
        this.canvas.add(circle);
      }

      this.canvas.clearContext(this.canvas.contextTop);
      this.removeShadowStyles();
      this.canvas.renderOnAddition = originalRenderOnAddition;
      this.canvas.renderAll();
    }
  });

  return {
    create: function(canvas){
      return new HollowCircle(canvas);
    },

    createOutline: function(brush, shape, cfg){

    },

    createShapeBrush: function(canvas, cfg){

    }
  };
});