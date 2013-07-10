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

  return defineComponent(shapeBrush, withCanvas);

  function shapeBrush(){

    this.defaultAttrs({
      brush: {
        color: "#000000"
      }
    });

    this.after("initialize", function(){
      this.on("click", this.onClick);
      this.on(document, "uiBrushClicked", this.onUiBrushClicked);
      this.on(document, "colorChanged", this.setBrushProperty);
    });

    this.onUiBrushClicked = function(e, eObj){
      if (eObj.clicked !== "rect") {
        console.log("rect stopped");
        this.trigger(document, "paintStopRequested");
      }
    };

    this.afterFinishCallback = function(){
      this.attr.canvas.defaultCursor = "default";

      this.trigger(document, "paintStopRequested");

      this.attr.rect = this.attr.outlinePainter.outline;
      // draw painting
      this.createShapeBrush();
    };

    this.setHandlers = function(){
      this.on(document, "selectedBrushReady", this.onSelectedBrushReady);
    };

    this.releaseHandlers = function(){
      this.off(document, "releaseHandlersRequested");
    };

    this.onClick = function(e, eObj){
      this.attr.canvas.defaultCursor = "crosshair";

      this.trigger(document, "uiBrushClicked", {clicked: "rect"});
      // init the outline painter
      this.attr.outlinePainter = outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });

      compose.mixin(this.attr.outlinePainter, [advice.withAdvice]);

      this.attr.outlinePainter.after('finish', function(){
        this.afterFinishCallback();
      }.bind(this));

      this.setHandlers();

      // attach our outlinePainter to canvas' events. We need
      // to draw the outline first and then after the mouse is
      // released, we draw the painting.
      this.trigger(document, "paintRequested", {
        painter: this.attr.outlinePainter
      });

      // What's the selected brush?
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

        me.attr.canvas.renderAll();
      });

      me.attr.rect = null;
    };

    this.onSelectedBrushReady = function(e, eObj){
      this.setBrush(e, eObj);
    };

    this.setBrushProperty = function(e, eObj){
      this.attr.brush[eObj.key] = eObj[eObj.key];
    };

    this.setBrush = function(e, eObj){
      this.attr.brushId = eObj.selectedId;
    };
  }
});