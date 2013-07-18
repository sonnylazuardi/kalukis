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
      isPainting: false,
      width: 1,
      brush: {
        color: "#000000"
      }
    });

    // set events handler
    this.after("initialize", function(){
      this.on("click", this.onClick);
      this.on(document, "uiPaintButtonsClicked", this.onUiPaintButtonsClicked);
      this.on(document, "colorChanged", this.setBrushProperty);
    });

    this.onUiPaintButtonsClicked = function(e, eObj){
      if (eObj.clicked !== "pencil" && this.attr.isPainting){
        this.onReleaseHandlerRequested();
      }
    };

    this.onClick = function(){
      this.attr.isPainting = true;
      this.trigger(document, "uiPaintButtonsClicked", {clicked: "pencil"});

      this.on(this.attr.canvasEl, "releaseHandlersRequested", this.onReleaseHandlerRequested);
      this.on(document, "selectedBrushReady", this.onSelectedBrushReady);
      // we need to change the brush when a new one is ready to be used
      // we need to initialize our painting action
      this.on(this.attr.canvasEl, "paintPreparationReady", this.onPaintPreparationReady);

      this.trigger(this.attr.canvasEl, "paintRequested");
    };

    // the steps required before painting
    this.onPaintPreparationReady = function(e, eObj){
      this.attr.canvas.isDrawingMode = true;
      // what brush shall we use for painting?
      this.trigger(document, "selectedBrushRequested");
    };

    this.onSelectedBrushReady = function(e, eObj){
      this.setBrush(e, eObj);
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

    // set painting oeff
    this.onReleaseHandlerRequested = function(){
      this.off(this.attr.canvasEl, "paintPreparationReady");
      this.off(this.attr.canvasEl, "releaseHandlersRequested");
      this.off(document, "selectedBrushReady");

      this.attr.canvas.isDrawingMode = false;
      this.attr.isPainting = false;
    };
  }
});