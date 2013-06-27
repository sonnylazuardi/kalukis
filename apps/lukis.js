/**
 * This component is responsible in managing objects **drawn** on
 * the canvas. The act of drawing is not the responsibility of
 * this component.
 */
define(

[
  "fabric",
  "flight/component"
],

function(fabric, defineComponent){

  return defineComponent(Lukis);

  function Lukis(){
    this.after("initialize", function(){
      console.log("lukis init");
      // activate canvas
      this.attr.canvas = new fabric.Canvas(this.$node.attr("id"));
      this.attr.canvasEl = "#"+this.$node.attr("id");

      // publish the canvas element
      this.on(document, "canvasElRequested", this.publishCanvasEl);
      // publish the canvas instance
      this.on(this.attr.canvasEl, "canvasRequested", this.publishCanvas);
      // we need to prepare the painting medium when painting is requested
      this.on(this.attr.canvasEl, "paintRequested", this.preparePainting);
      // we need to release handlers from canvas' events
      this.on(this.attr.canvasEl, "releaseHandlers", this.releaseHandlers);
      // TODO be more specific
      this.on(this.attr.canvasEl, "colorChanged", this.changeColor);
    });

    // publish the canvas element
    this.publishCanvasEl = function(){
      this.trigger(document, "canvasElReady", {canvasEl: this.attr.canvasEl});
    };

    this.publishCanvas = function(){
      this.trigger(this.attr.canvasEl, "canvasReady", {
        canvas: this.attr.canvas
      });
    };

    // preparation for painting
    this.preparePainting = function(e, eObj){
      var me = this,
          canvasEl = this.attr.canvasEl,
          canvas = this.attr.canvas;

      this.paintHandlers = {
        // trigger this when canvas' mouse:down is fired
        onMouseDown: function(e){
          me.trigger(canvasEl, "onMouseDown", e);
        },
        // trigger this when canvas' mouse:up is fired
        onMouseUp: function(e){
          me.trigger(canvasEl, "onMouseUp", e);
        },
        // trigger this when canvas' mouse:move is fired
        onMouseMove: function(e){
          me.trigger(canvasEl, "onMouseMove", e);
        }
      };

      // we trigger init paint event. this is normally used
      // to attach the canvas to the painting handler
      this.trigger(canvasEl, "paintPreparationReady", {canvas: canvas});

      // TODO is there a way that I can delegate these events
      // automatically?
      //
      // attaching events on canvas' mouse events
      canvas.on("mouse:down", this.paintHandlers.onMouseDown);
      canvas.on("mouse:up", this.paintHandlers.onMouseUp);
      canvas.on("mouse:move", this.paintHandlers.onMouseMove);
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
  }
});