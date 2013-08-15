define(function(require){
  var fabric = require("fabric"),
      circleBrushHelper = require("brushes/circleBrushHelper"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("mixins/with_outline_helper");

  // extend fabric.CircleBrush
  var HollowCircle = fabric.util.createClass(fabric.CircleBrush, {
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
      var circleRadius = fabric.util.getRandomInt(
                          Math.max(0, this.width - 20), this.width + 20) / 2;

      // generate random stroke style. This includes the
      // alpha property
      var strokeColor = new fabric.Color(this.color)
                          .setAlpha(fabric.util.getRandomInt(0, 100) / 100)
                          .toRgba();

      pointerPoint.radius = circleRadius;
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

  var hollowCircleBrush =  {
    create: function(canvas){
      return new HollowCircle(canvas);
    },

    createShapeBrush: function(canvas, cfg){
      var brush = this.create(canvas);
      brush.width = cfg.brushWidth || 10;

      var outline = this.createOutline(brush, cfg.shape, cfg),
          outlineLength = outline.length;

      brush.color = cfg.color || "#000000";

      for (var i = 0; i < outlineLength; i++){
        brush.addPoint(outline[i]);
      }

      circleBrushHelper.drawCircles(canvas, {
        points: brush.points
      });
    }
  };

  compose.mixin(hollowCircleBrush, [withOutlineHelper]);

  return hollowCircleBrush;
});