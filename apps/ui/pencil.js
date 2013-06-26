/**
 * This component is responsible for acting on user interaction
 * with the **pencil widget**.
 *
 * It does not draw the brushes on the canvas, as that task is delegated
 * to the chosen brush.
 */
define(

[
  "flight/component",
  "fabric"
],

function(defineComponent, fabric){

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

      this.trigger(this.attr.canvasEl, "selectedBrushRequested");
    };

    this.onClick = function(){
      // TODO move this to a seperate component
      this.on(this.attr.canvasEl, "selectedBrushReady", this.setBrush);
      this.on(this.attr.canvasEl, "paintInit", this.init);
      this.on(this.attr.canvasEl, "onMouseMove", this.onMouseMove);
      this.on(this.attr.canvasEl, "onMouseUp", this.onMouseUp);

      this.trigger(this.attr.canvasEl, "paintRequested");
    };

    this.setBrush = function(e, eObj){
      this.canvas.freeDrawingBrush = eObj.brush.create(this.canvas);
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
      this.trigger(this.attr.canvasEl, "paintUp");
    };
  }
});