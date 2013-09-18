define(function(require){

  var fabric = require("fabric"),
      RectBrushClass = require("extBrushes/fabric.RectBrush"),
      getRandomInt = fabric.util.getRandomInt;


  var HollowSquareBrushClass = fabric.util.createClass(RectBrushClass, {
    /**
     * Override fabric.CircleBrush addPoint method. We need to
     * define our own circle properties. In this case, we dont
     * need a fill property, because this circle is hollow. What
     * we need is stroke style.
     * 
     * @param  {Object} pointer pointer location
     * @return {fabric.Point}         Point
     */
    addPoint: function(pointer){
      var pointerPoint = new fabric.Point(pointer.x, pointer.y);

      // generate random circle's radius
      var width = getRandomInt(0, this.width);

      // generate random stroke style. This includes the
      // alpha property
      var strokeColor = new fabric.Color(this.color)
                          .setAlpha(getRandomInt(0, 100) / 100)
                          .toRgba();

      pointerPoint.width = pointerPoint.height = width;
      pointerPoint.strokeColor = strokeColor;

      this.points.push(pointerPoint);

      return pointerPoint;
    },

    onMouseMove: function(pointer){
      var point = this.addPoint(pointer);
      var ctx = this.canvas.contextTop;
      
      ctx.lineWidth = 1;
      ctx.strokeStyle = point.strokeColor;
      ctx.beginPath();
      ctx.strokeRect(point.x - point.width/2, point.y - point.height/2, point.width, point.height);
      ctx.stroke();
    },

    onMouseUp: function(){
      var originalRenderOnAddition = this.canvas.renderOnAddition;
      this.canvas.renderOnAddition = false;

      for (var i = 0, len = this.points.length; i < len; i++) {
        var point = this.points[i];
        var square = new fabric.Rect({
          width: point.width,
          height: point.height,
          left: point.x,
          top: point.y,
          fill: null,
          stroke: point.strokeColor,
          strokeWidth: 1
        });
        this.canvas.add(square);
      }

      this.canvas.clearContext(this.canvas.contextTop);
      this.canvas.renderOnAddition = originalRenderOnAddition;
      this.canvas.renderAll();
    }
  });

  return HollowSquareBrushClass;
});