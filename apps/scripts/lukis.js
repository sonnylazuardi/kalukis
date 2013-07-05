/**
 * This component is responsible in managing objects **drawn** on
 * the canvas. The act of drawing is not the responsibility of
 * this component.
 */
define(function(require){
  var defineComponent = require("flight/component"),
      fabric = require("fabric");

  return defineComponent(Lukis);

  function Lukis(){

    this.defaultAttrs({
      handlerHelper: {}
    });

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
          canvas = this.attr.canvas,
          eObj = eObj || {},
          painter;

      /**
       * We expect a `painter` has these methods if
       * it wants to connect to canvas' events:
       *
       * `onMouseDown`  : called when the mouse is pressed
       *                  on the canvas
       * `onMouseUp`    : called when the mouse is released
       * `onMouseMove`  : called when the mouse is moving
       *                  on top of the canvas
       *
       * If any of the above method is not provided, then
       * there will be no connection on the respective canvas' event.
       *
       * Paint handler can also provide these extra methods:
       *
       * `releaseHandlers`  : will be called when there is a
       *                      request to release all event handlers
       *                      for painting
       * `finish`           : will be called after `releaseHandler`
       *                      has been called
       */
      this.attr.painter = painter = eObj.painter || {};

      // we trigger init paint event. this is normally used
      // to attach the canvas to the painting handler
      this.trigger(document, "paintPreparationReady", {canvas: canvas});

      // attaching events on canvas' mouse events only if paintHandler
      // provides the methods
      if (painter.onMouseDown && typeof painter.onMouseDown === "function"){
        this.attr.handlerHelper.onMouseDown = function(e){
          painter.onMouseDown(e);
        };

        canvas.on("mouse:down", this.attr.handlerHelper.onMouseDown);
      }

      if (painter.onMouseUp && typeof painter.onMouseUp === "function"){
        this.attr.handlerHelper.onMouseUp = function(e){
          painter.onMouseUp(e);
        };

        canvas.on("mouse:up", this.attr.handlerHelper.onMouseUp);
      }

      if (painter.onMouseMove && typeof painter.onMouseMove === "function"){
        this.attr.handlerHelper.onMouseMove = function(e){
          painter.onMouseMove(e);
        };

        canvas.on("mouse:move", this.attr.handlerHelper.onMouseMove);
      }

      this.on(document, "keydown", this.onKeyDown);
      this.on(document, "paintStopRequested", this.releaseHandlers);
    };

    // unsubscribe from canvas' events
    this.releaseHandlers = function(e, eObj){
      var canvas = this.attr.canvas,
          painter = this.attr.painter;

      if (painter.onMouseDown && typeof painter.onMouseDown === "function"){
        canvas.off("mouse:down", this.attr.handlerHelper.onMouseDown);
      }

      if (painter.onMouseUp && typeof painter.onMouseUp === "function"){
        canvas.off("mouse:up", this.attr.handlerHelper.onMouseUp);
      }

      if (painter.onMouseMove && typeof painter.onMouseMove === "function"){
        canvas.off("mouse:move", this.attr.handlerHelper.onMouseMove);
      }
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