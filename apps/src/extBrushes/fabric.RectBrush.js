define(function(require){

  var fabric = require("fabric"),
      getRandomInt = fabric.util.getRandomInt;

  var RectBrushClass = fabric.util.createClass(fabric.BaseBrush, {

    width: 10,

    initialize: function(canvas){
      this.canvas = canvas;
      this.points = [];
    },

    onMouseDown: function(){
      this.points.length = 0;
      this.canvas.clearContext(this.canvas.contextTop);
    },

    onMouseMove: function(pointer){
      var point = this.addPoint(pointer),
          ctx = this.canvas.contextTop;

      ctx.fillStyle = point.fill;
      ctx.fillRect(point.x - point.width/2, point.y - point.height/2, point.width, point.height);
    },

    onMouseUp: function(){
      var originalRenderOnAddition = this.canvas.renderOnAddition;
      this.canvas.renderOnAddition = false;

      for (var i = 0, len = this.points.length; i < len; i++) {
        var point = this.points[i];
        this.canvas.add(new fabric.Rect({
          width: point.width,
          height: point.height,
          top: point.y,
          left: point.x,
          fill: point.fill
        }));
      }

      this.canvas.clearContext(this.canvas.contextTop);
      this.canvas.renderOnAddition = originalRenderOnAddition;
      this.canvas.renderAll();
    },

    addPoint: function(pointer) {
      var pointerPoint = new fabric.Point(pointer.x, pointer.y);

      var width = getRandomInt(0, this.width);

      var color = new fabric.Color(this.color)
                          .setAlpha(fabric.util.getRandomInt(0, 100) / 100)
                          .toRgba();

      pointerPoint.width = pointerPoint.height = width;
      pointerPoint.fill = color;

      this.points.push(pointerPoint);
      return pointerPoint;
    }
  });

  return RectBrushClass;
});