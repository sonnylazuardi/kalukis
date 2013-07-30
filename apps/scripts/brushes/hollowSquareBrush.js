define(function(require){
  var fabric = require("fabric"),
      squareBrushHelper = require("brushes/squareBrushHelper"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("brushes/with_outline_helper");

  // extend fabric.BaseBrush
  var HollowSquare = fabric.util.createClass(fabric.BaseBrush, {
    width: 10,
    
    /**
     * Add a point in this location. This point will also
     * have properties related to this square, such as the
     * height, width and stroke style.
     * 
     * @param  {Object} pointer pointer location
     * @return {fabric.Point}
     */
    addPoint: function(pointer){
      var pointerPoint = new fabric.Point(pointer.x, pointer.y);

      var width = fabric.util.getRandomInt(Math.ceil(this.width/2), this.width);

      var strokeColor = new fabric.Color(this.color)
                          .setAlpha(fabric.util.getRandomInt(0, 100) / 100)
                          .toRgba();

      pointerPoint.width = pointerPoint.height = width;
      pointerPoint.strokeColor = strokeColor;

      this.points.push(pointerPoint);

      return pointerPoint;
    },

    initialize: function(canvas){
      this.canvas = canvas;
      this.points = [];
    },

    onMouseDown: function(){
      this.points.length = 0;
      this.canvas.clearContext(this.canvas.contextTop);
      this.setShadowStyles();
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
      this.removeShadowStyles();
      this.canvas.renderOnAddition = originalRenderOnAddition;
      this.canvas.renderAll();
    }
  });

  var hollowSquareBrush = {
    create: function(canvas){
      return new HollowSquare(canvas);
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

      squareBrushHelper.drawSquares(canvas, {
        points: brush.points
      });
    }
  };

  compose.mixin(hollowSquareBrush, [withOutlineHelper]);

  return hollowSquareBrush;
});