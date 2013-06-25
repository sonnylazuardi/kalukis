/**
 * This is the defineComponent which manages interactions with
 * user when the user wants to paint with a pencil/brush.
 *
 * Which brush do the user want will be determined by the
 * brush selected by the user on a certain element.
 *
 * This module will use that selected brush to draw on the canvas.
 */
define(["flight/component"],
function(defineComponent){

  return defineComponent(Pencil);

  function Pencil(){
    // defining attributes. Anything defined here
    // can be accessed through `attr` properties.
    this.defaultAttrs({
      color: "#E74C3C",
      width: 1
    });

    // set events handler
    this.after("initialize", function(){
      this.on("click", this.onClick);
    });

    this.init = function(e, eObj){
      this.canvas = eObj.canvas;
      this.canvas.isDrawingMode = true;
    };

    this.onClick = function(){
      this.on(this.attr.canvasEl, "paintInit", this.init);
      this.on(this.attr.canvasEl, "onMouseMove", this.onMouseMove);
      this.on(this.attr.canvasEl, "onMouseUp", this.onMouseUp);

      this.trigger(this.attr.canvasEl, "paintRequested");
    };

    this.onMouseDown = function(e, eObj){

    };

    this.onMouseMove = function(e, eObj){

    };

    /**
     * Unsubscribe from canvas events
     */
    this.onMouseUp = function(e, eObj){
      this.canvas.isDrawingMode = false;
      this.canvas = undefined;

      this.off(this.attr.canvasEl, "onMouseMove");
      this.off(this.attr.canvasEl, "onMouseDown");
      this.off(this.attr.canvasEl, "onMouseUp");

      this.trigger(this.attr.canvasEl, "releaseHandlers");
      this.trigger(this.attr.canvasEl, "pencilUp");
    };
  }
});