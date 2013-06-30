/**
 * This component is responsible in managing objects **drawn** on
 * the canvas. The act of drawing is not the responsibility of
 * this component.
 */
define(function(require){
  var defineComponent = require("flight/component");

  return defineComponent(Lukis);

  function Lukis(){
    this.after("initialize", function(){
      // activate canvas
      this.attr.canvas = new fabric.Canvas(this.$node.attr("id"));

      // publish the canvas instance
      this.on(document, "canvasRequested", this.publishCanvas);
      // we need to prepare the painting medium when painting is requested
      this.on(document, "paintRequested", this.preparePainting);
      // we need to release handlers from canvas' events
      this.on(document, "releaseCanvasHandlers", this.releaseHandlers);
      // TODO be more specific
      this.on(document, "colorChanged", this.changeColor);
    });

    this.publishCanvas = function(){
      this.trigger(document, "canvasReady", {
        canvas: this.attr.canvas
      });
    };

    // preparation for painting
    this.preparePainting = function(e, eObj){
      var me = this,
          canvas = this.attr.canvas;

      this.paintHandlers = {
        // trigger this when canvas' mouse:down is fired
        onMouseDown: function(e){
          me.trigger(document, "canvasMouseDown", e);
        },
        // trigger this when canvas' mouse:up is fired
        onMouseUp: function(e){
          me.trigger(document, "canvasMouseUp", e);
        },
        // trigger this when canvas' mouse:move is fired
        onMouseMove: function(e){
          me.trigger(document, "canvasMouseMove", e);
        }
      };

      // we trigger init paint event. this is normally used
      // to attach the canvas to the painting handler
      this.trigger(document, "paintPreparationReady", {canvas: canvas});

      // TODO is there a way that I can delegate these events
      // automatically?
      //
      // attaching events on canvas' mouse events
      canvas.on("mouse:down", this.paintHandlers.onMouseDown);
      canvas.on("mouse:up", this.paintHandlers.onMouseUp);
      canvas.on("mouse:move", this.paintHandlers.onMouseMove);
      this.on(document, "keydown", this.onKeyDown);
    };

    // unsubscribe from canvas' events
    this.releaseHandlers = function(e, eObj){
      var canvas = this.attr.canvas;

      canvas.off("mouse:down", this.paintHandlers.onMouseDown);
      canvas.off("mouse:up", this.paintHandlers.onMouseUp);
      canvas.off("mouse:move", this.paintHandlers.onMouseMove);
    };

    // change the color of selected objects
    // TODO not working perfectly at the moment
    this.changeColor = function(e, eObj){
      var selected = this.attr.canvas.getActiveObject();

      if (selected){
        if (selected.type === "path") {
          selected.set("stroke", eObj.color);
        }

        this.attr.canvas.renderAll();
      }
    };

    // TODO move this to another component
    this.onKeyDown = function(e, eObj){
      if (e.keyCode === 27) {
        this.releaseHandlers();
        this.trigger(document, "releasHandlersRequested");
      }
    };
  }
});