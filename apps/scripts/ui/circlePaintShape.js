/**
 * Respond to user event on CirclePaintShape button
 */
define(function(require){
  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      withPaintShape = require("ui/with_paint_shape"),
      fabric = require("fabric"),
      outlinePainter = require("outlinePainter/circle");

  return defineComponent(circleShapedBrush, withCanvas, withPaintShape);

  function circleShapedBrush(){

    this.defaultAttrs({
      type: "circle"
    });

    this.getOutlinePainter = function(){
      return outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });
    };

    this.afterFinishCallback = function(e, eObj){
      this.trigger(this.attr.canvasEl, "paintStopRequested");

      this.attr.circle = this.attr.outlinePainter.outline;

      this.createShapeBrush();
    };

    this.createShapeBrush = function(){
      var brushModule = "shapeBrush/circle-" + this.attr.brushId,
          me = this,
          circle = this.attr.circle;

      require([brushModule], function(brush){

        brush.create(me.attr.canvas, {
          x: circle.x,
          y: circle.y,
          radius: circle.radius,
          color: me.attr.brush.color
        });

        me.attr.canvas.renderAll();
      });

      me.attr.circle = null;
    };
  }
});