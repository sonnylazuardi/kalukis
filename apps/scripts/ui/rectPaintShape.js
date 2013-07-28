/**
 * TODO this module should not manage canvas events. As it's only concern is
 * on the events in which painting with shape brush is initiated and any
 * events which has relation with brush's properties.
 */
define(function(require){

  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      withPaintShape = require("ui/with_paint_shape"),
      fabric = require("fabric"),
      outlinePainter = require("outlinePainter/rect");

  return defineComponent(shapeBrush, withCanvas, withPaintShape);

  function shapeBrush(){

    this.defaultAttrs({
      type: "rect"
    });

    this.getOutlinePainter = function(){
      return outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });
    };

    this.afterFinishCallback = function(){
      this.trigger(this.attr.canvasEl, "paintStopRequested");

      this.attr.rect = this.attr.outlinePainter.outline;
      // draw painting
      this.createShapeBrush();
    };

    this.createShapeBrush = function(){
      var brushId = this.attr.brushId,
          me = this,
          rect = me.attr.rect;

      // TODO what should happen when the brush cannot be loaded?
      require(["shapeBrush/rectShapedBrush"], function(shapedBrush){

        shapedBrush.create(me.attr.canvas, {
          brush: brushId,
          shape: "rect",
          x: (rect.width > 0) ? rect.x : rect.x + rect.width,
          y: (rect.height > 0) ? rect.y : rect.y + rect.height,
          width: Math.abs(rect.width),
          height: Math.abs(rect.height),
          color: me.attr.brush.color,
          brushWidth: me.attr.brush.width
        });

        me.attr.canvas.renderAll();
      });

      me.attr.rect = null;
    };
  }
});