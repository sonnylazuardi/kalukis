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
      outlinePainter = require("outlinePainter/rect");

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
      outlinePainter.after('finish', function(){
        me.trigger(document, "paintStopRequested");

        me.attr.rect = outlinePainter.outline;
        me.createShapeBrush();
        me.attr.canvas.renderAll();
      });
    });

    this.setInitHandlers = function(){
      // this.on(document, "canvasMouseDown", this.onMouseDown);
      // this.on(document, "releasHandlersRequested", this.releaseHandlers);
      this.on(document, "selectedBrushReady", this.setBrush);
    };

    this.releaseInitHandlers = function(){
      // this.off(document, "canvasMouseDown");
      this.off(document, "releasHandlersRequested");
    };

    this.onClick = function(e, eObj){
      outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });

      this.setInitHandlers();

      this.trigger(document, "paintRequested", {
        painter: outlinePainter
      });

      this.trigger(document, "selectedBrushRequested");
    };

    this.createShapeBrush = function(){
      var brushModule = "shapeBrush/rect-"+this.attr.brushId,
          me = this,
          rect = me.attr.rect;

      // TODO what should happen when the brush cannot be loaded?
      require([brushModule], function(brush){

        brush.create(me.attr.canvas, {
          x: (rect.width > 0) ? rect.x : rect.x + rect.width,
          y: (rect.height > 0) ? rect.y : rect.y + rect.height,
          width: Math.abs(rect.width),
          height: Math.abs(rect.height),
          color: me.attr.brush.color
        });
      });

      me.attr.rect = null;
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