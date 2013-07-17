// TODO line, circleShapedBrush, and rectBrush look similar
// Maybe create a mixin?
define(function(require){

  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      withPaintShape = require("ui/with_paint_shape"),
      fabric = require("fabric"),
      outlinePainter = require("outlinePainter/line");

  return defineComponent(line, withCanvas, withPaintShape);

  function line(){

    this.getOutlinePainter = function(){
      return outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });
    };

    this.afterFinishCallback = function(){
      this.trigger(document, "paintStopRequested");

      this.attr.line = this.attr.outlinePainter.outline;

      this.createShapeBrush();
    };

    this.createShapeBrush = function(){
      var brushModule = "shapeBrush/line-" + this.attr.brushId,
          me = this,
          line = this.attr.line;

      require([brushModule], function(brush){

        brush.create(me.attr.canvas, {
          x1: line.x1,
          y1: line.y1,
          x2: line.x2,
          y2: line.y2,
          color: me.attr.brush.color
        });

        me.attr.canvas.renderAll();
      });

      me.attr.line = null;
    };

  }
});