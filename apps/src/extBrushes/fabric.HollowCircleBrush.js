define(function( require ) {

  var fabric = require("fabric"),
      getRandomInt = fabric.util.getRandomInt;

  var HollowCircleBrushClass = fabric.util.createClass(fabric.BaseBrush, {
    /**
     * Width of a brush
     * @type Number
     * @default
     */
    width: 10,

    /**
     * Constructor
     * @param {fabric.Canvas} canvas
     * @return {HollowCircleBrushClass} Instance of a circle brush
     */
    initialize: function(canvas) {
      this.canvas = canvas;
      this.points = [ ];
    },
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
      var circleRadius = getRandomInt(0, this.width);

      // generate random stroke style. This includes the
      // alpha property
      var strokeColor = new fabric.Color(this.color)
                          .setAlpha(getRandomInt(0, 100) / 100)
                          .toRgba();

      pointerPoint.radius = circleRadius;
      pointerPoint.strokeColor = strokeColor;

      this.points.push(pointerPoint);

      return pointerPoint;
    },

    drawCircle: function ( pointer ) {
      var point = this.addPoint(pointer);
      var ctx = this.canvas.contextTop;

      ctx.lineWidth = 1;
      ctx.strokeStyle = point.strokeColor;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI*2, false);
      ctx.closePath();
      ctx.stroke();
    },

    /**
     * Invoked on mouse down
     */
    onMouseDown: function(pointer) {
      this.points.length = 0;
      this.canvas.clearContext(this.canvas.contextTop);
      this.drawCircle(pointer);
    },

    onMouseMove: function( pointer ) {
      this.drawCircle(pointer);
    },

    onMouseUp: function(){
      var originalRenderOnAddition = this.canvas.renderOnAddition;
      this.canvas.renderOnAddition = false;

      var circles = [];

      for (var i = 0, len = this.points.length; i < len; i++) {
        var point = this.points[i];
        circles.push(new fabric.Circle({
          radius: point.radius,
          left: point.x,
          top: point.y,
          fill: null,
          originX: 'center',
          originY: 'center',
          stroke: point.strokeColor,
          strokeWidth: 1
        }));
      }

      var group = new fabric.Group(circles, {
        originX: 'center',
        originY: 'center'
      });

      this.canvas.add(group);
      this.canvas.fire('path:created', { path: group });

      this.canvas.clearContext(this.canvas.contextTop);
      this.canvas.renderOnAddition = originalRenderOnAddition;
      this.canvas.renderAll();
    }
  });

  return HollowCircleBrushClass;
});