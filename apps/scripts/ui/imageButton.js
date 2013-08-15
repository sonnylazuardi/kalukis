define(function(require){

  var defineComponent = require("flight/component"),
      fabric = require("fabric"),
      advice = require("flight/lib/advice"),
      compose = require("flight/lib/compose"),
      withCanvas = require("mixins/with_canvas"),
      outlinePainter = require("outlinePainter/rect"),
      tmpl = require("text!templates/hiddenInputImage.html");

  return defineComponent(imageButton, withCanvas);

  function imageButton(){

    this.defaultAttrs({
      isPainting: false,
      color: "#585858",
      imageInput: "#hidden-image-input"
    });

    this.after("initialize", function(){
      var me = this;
      // TODO I'm not sure if this is a good way of managing
      // this input
      this.$node.parent().append(tmpl);

      this.on("click", this.onClick);
      this.on(document, "uiPaintButtonsClicked", this.onUiPaintButtonsClicked);

      // listen to image dialog events
      // TODO should use flight object if there's one provided
      $(this.attr.imageInput).change(this.onImageInputChange.bind(this));
    });

    this.getOutlinePainter = function(){
      return outlinePainter.init(this.attr.canvas, {
        color: this.attr.color
      });
    };

    this.onImageInputChange = function(e){
      this.attr.file = e.target.files[0];
      this.attr.canvas.cursor = "crosshair";

      this.attr.outlinePainter = this.getOutlinePainter();
      compose.mixin(this.attr.outlinePainter, [advice.withAdvice]);
      this.attr.outlinePainter.after('finish', function(){
        this.afterFinishCallback();
      }.bind(this));

      this.trigger(this.attr.canvasEl, "paintRequested", {
        painter: this.attr.outlinePainter
      });
    };

    this.onUiPaintButtonsClicked = function(e, eObj){
      if (eObj.clicked !== "image" && this.isPainting) {
        this.trigger(this.attr.canvasEl, "paintStopRequested");
      }
    };

    this.onClick = function(e, eObj){
      this.attr.isPainting = true;
      this.trigger(document, "uiPaintButtonsClicked", {clicked: "image"});

      this.loadImageSelectionDialog();
    };

    this.loadImageSelectionDialog = function(){
      $(this.attr.imageInput).click();
    };

    this.afterFinishCallback = function(){
      this.trigger(this.attr.canvasEl, "paintStopRequested");

      this.attr.rect = this.attr.outlinePainter.outline;

      this.addImageToCanvas();
      this.attr.canvas.cursor = "default";
    };

    this.addImageToCanvas = function(){
      var me = this,
          rect = this.attr.rect;

      require(["images/imageCanvasPlacement"], function(handler){

        // TODO callback when fails
        me.trigger(document, "loadingIndicatorRequested");
        handler.create(me.attr.canvas, {
          x: (rect.width > 0) ? rect.x : rect.x + rect.width,
          y: (rect.height > 0) ? rect.y : rect.y + rect.height,
          width: Math.abs(rect.width),
          height: Math.abs(rect.height),
          file: me.attr.file
        }, function(){
          me.trigger(document, "hideLoadingIndicatorRequested");
        });
      });

      this.attr.rect = null;
      this.attr.isPainting = false;
    };
  }
});