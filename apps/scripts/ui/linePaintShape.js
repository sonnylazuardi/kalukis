/**
 * Respond to user event on LinePaintShape button
 */
define(function(require){

  var defineComponent = require("flight/component"),
      withCanvas = require("mixins/with_canvas"),
      withPaintShape = require("mixins/with_paint_shape"),
      fabric = require("fabric"),
      outlinePainter = require("outlinePainter/line");

  return defineComponent(line, withCanvas, withPaintShape);

  function line(){

    this.defaultAttrs({
      type: "line"
    });

    this.getOutlinePainter = function(){
      return outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });
    };

    this.afterFinishCallback = function(){
      this.trigger(this.attr.canvasEl, "paintStopRequested");

      this.attr.line = this.attr.outlinePainter.outline;

      this.createShapeBrush();
    };

    this.createShapeBrush = function(){
      var brushId = this.attr.brushId,
          me = this,
          line = this.attr.line;

      require(["brushes/"+brushId], function(brush){
        brush.createShapeBrush(me.attr.canvas, {
          brush: brushId,
          shape: "line",
          x1: line.x1,
          y1: line.y1,
          x2: line.x2,
          y2: line.y2,
          color: me.attr.brush.color,
          brushWidth: me.attr.brush.width
        });
      });

      me.attr.line = null;
    };

  }
});