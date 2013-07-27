/**
 * A mixin for painting a certain shape.
 *
 * To use this mixin, the user has to have these methods:
 *
 * getOutlinePainter()    Will be called to get the outline painter
 * afterFinishCallback()  Will be called after outline painter is done
 *                        painting
 *
 * @return {[type]} [description]
 */
define(function(require){

  var compose = require("flight/lib/compose"),
      advice = require("flight/lib/advice");

  return withPaintShape;

  function withPaintShape(){
    this.defaultAttrs({
      isPainting: false,
      brush: {
        color: "#000000",
        width: 1
      },
      outlinePainter: undefined

      /**
       * `type`
       * The type of paint shape
       * @type {String}
       */

    });

    this.after("initialize", function(){
      this.on("click", this.onClick);
      this.on(document, "uiPaintButtonsClicked", this.onUiPaintButtonsClicked);
      this.on(document, "brushPropertyChanged", this.setBrushProperty);

      this.after("afterFinishCallback", this.afterAfterFinishCallback);
    });

    this.onClick = function(e, eObj){
      this.attr.isPainting = true;

      this.trigger(document, "uiPaintButtonsClicked", {clicked: this.attr.type});

      this.on(document, "selectedBrushReady", this.onSelectedBrushReady);

      this.attr.outlinePainter = this.getOutlinePainter();
      // add mixin api to this outlinePainter
      compose.mixin(this.attr.outlinePainter, [advice.withAdvice]);
      this.attr.outlinePainter.after("finish", function(){
        this.afterFinishCallback();
      }.bind(this));

      this.trigger(this.attr.canvasEl, "paintRequested", {
        painter: this.attr.outlinePainter
      });

      this.trigger(document, "selectedBrushRequested");
    };

    this.afterAfterFinishCallback = function(){
      this.attr.isPainting = false;
    };

    this.onUiPaintButtonsClicked = function(e, eObj){
      if (eObj.clicked !== this.attr.type && this.attr.isPainting){
        this.trigger(this.attr.canvasEl, "paintStopRequested");
      }
    };

    this.setBrushProperty = function(e, eObj){
      this.attr.brush[eObj.key] = eObj[eObj.key];
    };

    this.setBrush = function(e, eObj){
      this.attr.brushId = eObj.selectedId;
    };

    this.onSelectedBrushReady = function(e, eObj){
      this.setBrush(e, eObj);
    };
  }

});