/**
 * This component is responsible for acting on user interaction
 * with the **pencil widget**.
 *
 * It does not draw the brushes on the canvas, as that task is delegated
 * to the chosen brush.
 */
define(function(require){

  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      fabric = require("fabric");

  return defineComponent(pencil, withCanvas);

  function pencil(){
    // defining attributes. Anything defined here
    // can be accessed through `attr` properties.
    this.defaultAttrs({
      color: "#E74C3C",
      width: 1,
      brush: {
        color: "#000000"
      }
    });

    // set events handler
    this.after("initialize", function(){
      this.on("click", this.onClick);
      this.on(document, "colorChanged", this.setBrushProperty);
    });

    this.setInitHandlers = function(){
      this.on(document, "releasHandlersRequested", this.releaseHandlers);
      this.on(document, "selectedBrushReady", this.setBrush);
    };

    this.setPaintHandlers = function(){

    };

    this.releaseInitHandlers = function(){
      this.off(document, "paintPreparationReady");

      this.off(document, "releasHandlersRequested");
      this.off(document, "selectedBrushReady");
    };

    this.releasePaintHandlers = function(){
      this.off(document, "canvasMouseDown");
    };

    // the steps required before painting
    this.init = function(e, eObj){
      this.attr.canvas.isDrawingMode = true;
      // what brush shall we use for painting?
      this.trigger(document, "selectedBrushRequested");
    };

    this.onClick = function(){
      this.setInitHandlers();
      // we need to change the brush when a new one is ready to be used
      // we need to initialize our painting action
      this.on(document, "paintPreparationReady", this.init);

      this.trigger(document, "paintRequested");
    };

    // set the brush used for painting
    this.setBrush = function(e, eObj){
      this.attr.canvas.freeDrawingBrush = eObj.brush.create(this.attr.canvas);
      this.attr.canvas.freeDrawingBrush.color = this.attr.brush.color;
    };

    // set the brush property
    this.setBrushProperty = function(e, eObj){
      this.attr.brush[eObj.key] = eObj[eObj.key];
      this.attr.canvas.freeDrawingBrush[eObj.key] = eObj[eObj.key];
    };

    // set painting off
    this.releaseHandlers = function(){
      this.releaseInitHandlers();
      this.releasePaintHandlers();

      this.attr.canvas.isDrawingMode = false;
    };
  }
});