/**
 * TODO this module should not manage canvas events. As it's only concern is
 * on the events in which painting with shape brush is initiated and any
 * events which has relation with brush's properties.
 */
define(function(require){

  var defineComponent = require("flight/component"),
      advice = require("flight/lib/advice"),
      compose = require("flight/lib/compose"),
      withCanvas = require("data/with_canvas"),
      fabric = require("fabric"),
      outlinePainter = require("shapeBrush/outlinePainter");
      // rect;

  // pasang advice pada outlinePainter
  compose.mixin(outlinePainter, [advice.withAdvice]);

  return defineComponent(shapeBrush, withCanvas);

  function shapeBrush(){

    this.defaultAttrs({
      brush: {
        color: "#000000"
      }
    });

    this.after("initialize", function(){
      this.on("click", this.onClick);
      this.on(document, "colorChanged", this.setBrushProperty);

      var me = this;
      // draw brush
      // TODO Update this API
      outlinePainter.after('finishing', function(){
        me.trigger(document, "paintStopRequested");

        me.attr.rect = outlinePainter.rect;
        me.createShapeBrush();

        me.attr.canvas.renderAll();
      });
    });

    this.setInitHandlers = function(){
      // this.on(document, "canvasMouseDown", this.onMouseDown);
      // this.on(document, "releasHandlersRequested", this.releaseHandlers);
      this.on(document, "selectedBrushReady", this.setBrush);
    };

    // this.setPaintHandlers = function(){
    //   this.on(document, "canvasMouseMove", this.onMouseMove);
    //   this.on(document, "canvasMouseUp", this.onMouseUp);
    // };

    this.releaseInitHandlers = function(){
      // this.off(document, "canvasMouseDown");
      this.off(document, "releasHandlersRequested");
    };

    // this.releasePaintHandlers = function(){
    //   this.off(document, "canvasMouseMove");
    //   this.off(document, "canvasMouseUp");
    // };

    this.onClick = function(e, eObj){
      outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });

      this.setInitHandlers();

      // this.attr.canvas.selection = false;

      this.trigger(document, "paintRequested", {
        painter: outlinePainter
      });
      this.trigger(document, "selectedBrushRequested");
    };

    // this.onMouseDown = function(e, eObj){
    //   var point = this.attr.canvas.getPointer(eObj.e);

    //   rect = {
    //     ox: point.x,
    //     oy: point.y,
    //     width: 1,
    //     height: 1
    //   };

    //   this.setPaintHandlers();
    // };

    // this.onMouseMove = function(e, eObj){
    //   var point = this.attr.canvas.getPointer(eObj.e);

    //   rect.height = point.y - rect.oy;
    //   rect.width = point.x - rect.ox;

    //   this.renderPaintOutline(rect.ox, rect.oy, rect.width, rect.height);
    // };

    this.onMouseUp = function(e, eObj){
      this.trigger(document, "paintStopRequested");
      this.releaseHandlers();

      this.attr.canvas.renderAll();

      this.createShapeBrush();
    };

    // a method to just render the paint outline. This should
    // make painting faster
    // this.renderPaintOutline = function(x, y, width, height){
    //   var ctx = this.attr.canvas.contextTop;
    //   ctx.save();

    //   ctx.lineWidth = 1;
    //   ctx.strokeStyle = this.attr.brush.color;
    //   ctx.strokeRect(x, y, width, height);

    //   ctx.restore();
    // };

    this.createShapeBrush = function(e, eObj){
      var brushModule = "shapeBrush/rect-"+this.attr.brushId,
          me = this;

      // TODO what should happen when the brush cannot be loaded?
      require([brushModule], function(brush){
        var rect = me.attr.rect;

        brush.create(me.attr.canvas, {
          x: (rect.width > 0) ? rect.ox : rect.ox + rect.width,
          y: (rect.height > 0) ? rect.oy : rect.oy + rect.height,
          width: Math.abs(rect.width),
          height: Math.abs(rect.height),
          color: me.attr.brush.color
        });

        rect = null;
      });
    };

    this.setBrushProperty = function(e, eObj){
      this.attr.brush[eObj.key] = eObj[eObj.key];
      this.attr.canvas.freeDrawingBrush[eObj.key] = eObj[eObj.key];
    };

    this.setBrush = function(e, eObj){
      this.attr.brushId = eObj.selectedId;
    };

    // set painting off
    // this.releaseHandlers = function(){
    //   this.releaseInitHandlers();
    //   this.releasePaintHandlers();

    //   this.attr.canvas.clearContext(this.attr.canvas.contextTop);
    //   this.attr.canvas.selection = true;
    // };
  }
});