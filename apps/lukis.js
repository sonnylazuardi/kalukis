/**
 * This component is responsible in managing objects **drawn** on
 * the canvas. The act of drawing is not the responsibility of
 * this component.
 */
define(

[
  "fabric",
  "flight/component","ui/canvasmixin"
],

function(fabric, defineComponent, CanvasMixin){

  return defineComponent(Lukis, CanvasMixin);

  function Lukis(){
    this.after("initialize", function(){
      // activate canvas
      this.attr.canvas = new fabric.Canvas(this.$node.attr("id"));
      this.attr.canvasEl = "#"+this.$node.attr("id");

      this.on(this.attr.canvasEl, "paintRequested", this.onPaintRequested);
      this.on(this.attr.canvasEl, "releaseHandlers", this.onReleaseHandlers);

      this.on(this.attr.canvasEl, "colorChanged", this.onColorChanged);
    });

    this.onPaintRequested = function(e, eObj){
      var me = this,
          canvasEl = this.attr.canvasEl,
          canvas = this.attr.canvas;

      this.paintHandlers = {
        onMouseDown: function(e){
          me.trigger(canvasEl, "onMouseDown", e);
        },

        onMouseUp: function(e){
          me.trigger(canvasEl, "onMouseUp", e);
        },

        onMouseMove: function(e){
          me.trigger(canvasEl, "onMouseMove", e);
        }
      };

      // we trigger init paint event. this is normally used
      // to attach the canvas to the painting handler
      this.trigger(canvasEl, "paintInit", {canvas: canvas});

      // TODO is there a way that I can delegate these events
      // automatically?
      canvas.on("mouse:down", this.paintHandlers.onMouseDown);
      canvas.on("mouse:up", this.paintHandlers.onMouseUp);
      canvas.on("mouse:move", this.paintHandlers.onMouseMove);
    };

    this.onReleaseHandlers = function(e, eObj){
      var canvas = this.attr.canvas;

      canvas.off("mouse:down", this.paintHandlers.onMouseDown);
      canvas.off("mouse:up", this.paintHandlers.onMouseUp);
      canvas.off("mouse:move", this.paintHandlers.onMouseMove);
    };

    this.onColorChanged = function(e, eObj){
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