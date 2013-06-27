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
  "data/with_canvas",
  "fabric"
],

function(defineComponent, WithCanvas, fabric){

  return defineComponent(Pencil, WithCanvas);

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

    // the steps required before painting
    this.init = function(e, eObj){
      // this.canvas = eObj.canvas;
      this.attr.canvas.isDrawingMode = true;

      // what brush shall we use for painting?
      this.trigger(this.attr.canvasEl, "selectedBrushRequested");
    };

    this.onClick = function(){
      // TODO move this to a seperate component

      // we need to change the brush when a new one is ready to be used
      this.on(this.attr.canvasEl, "selectedBrushReady", this.setBrush);
      // we need to initialize our painting action
      this.on(this.attr.canvasEl, "paintPreparationReady", this.init);
      this.on(this.attr.canvasEl, "onMouseMove", this.onMouseMove);
      this.on(this.attr.canvasEl, "onMouseUp", this.onMouseUp);

      this.trigger(this.attr.canvasEl, "paintRequested");
    };

    // set the brush used for painting
    this.setBrush = function(e, eObj){
      this.attr.canvas.freeDrawingBrush = eObj.brush.create(this.attr.canvas);
    };

    // set the brush property
    this.setBrushProperty = function(e, eObj){

    };

    this.onMouseDown = function(e, eObj){

    };

    this.onMouseMove = function(e, eObj){

    };

    /**
     * Unsubscribe from canvas events
     */
    this.onMouseUp = function(e, eObj){
      this.attr.canvas.isDrawingMode = false;

      this.off(this.attr.canvasEl, "onMouseMove");
      this.off(this.attr.canvasEl, "onMouseDown");
      this.off(this.attr.canvasEl, "onMouseUp");

      this.trigger(this.attr.canvasEl, "releaseHandlers");
      this.trigger(this.attr.canvasEl, "paintUp");
    };
  }
});