define(function(require){
  var fabric = require("fabric"),
      circleBrushHelper = require("brushes/circleBrushHelper"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("brushes/with_outline_helper");

  // extend fabric.CircleBrush
  var HollowCircle = fabric.util.createClass(fabric.CircleBrush, {
    // we need custom method to add Points, because each points shouldn't
    // have fill color, but stroke color
    addPoint: function(pointer){
      var pointerPoint = new fabric.Point(pointer.x, pointer.y);

      var circleRadius = fabric.util.getRandomInt(
                          Math.max(0, this.width - 20), this.width + 20) / 2;

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
      var b = this.create(canvas);
      b.width = cfg.brushWidth || 10;

      var outline = this.createOutline(b, cfg.shape, cfg),
          outlineLength = outline.length;

      b.color = cfg.color || "#000000";

      for (var i = 0; i < outlineLength; i++){
        b.addPoint(outline[i]);
      }

      circleBrushHelper.drawCircles(canvas, {
        points: b.points
      });
    }
  };

  compose.mixin(hollowCircleBrush, [withOutlineHelper]);

  return hollowCircleBrush;
});