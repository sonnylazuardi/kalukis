define(function(require){

  var defineComponent = require("flight/component"),
      fabric = require("fabric"),
      advice = require("flight/lib/advice"),
      compose = require("flight/lib/compose"),
      withCanvas = require("data/with_canvas"),
      withHandlerBars = require("ui/with_handlebars"),
      outlinePainter = require("outlinePainter/rect"),
      tmpl = require("text!templates/hiddenInputImage.hbs");

  return defineComponent(imageButton, withCanvas, withHandlerBars);

  function imageButton(){

    this.defaultAttrs({
      color: "#585858",
      imageInput: "#hidden-image-input"
    });

    this.after("initialize", function(){
      var me = this;
      // TODO I'm not sure if this is a good way of managing
      // this input
      this.$node.parent().append(this.renderData({}, tmpl));

      this.on("click", this.onClick);
      this.on(document, "uiBrushClicked", this.onUiBrushClicked);

      // listen to image dialog events
      // TODO should use flight object if there's one provided
      $(this.attr.imageInput).change(function(e){
        me.attr.url = $(this).val().replace(/C:\\fakepath\\/i, '');
        me.attr.file = e.target.files[0];
        me.attr.canvas.cursor = "crosshair";

        me.attr.outlinePainter = outlinePainter.init(me.attr.canvas, {
          color: me.attr.color
        });

        compose.mixin(me.attr.outlinePainter, [advice.withAdvice]);

        me.attr.outlinePainter.after('finish', function(){
          me.afterFinishCallback();
        }.bind(me));

        me.trigger(document, "paintRequested", {
          painter: me.attr.outlinePainter
        });
      });
    });

    this.onUiBrushClicked = function(e, eObj){
      if (eObj.clicked !== "image") {
        this.trigger(document, "paintStopRequested");
      }
    };

    this.onClick = function(e, eObj){
      // TODO aaargh.. this is a bad event's name
      this.trigger(document, "uiBrushClicked", {clicked: "image"});

      this.loadImageSelectionDialog();
    };

    this.loadImageSelectionDialog = function(){
      $(this.attr.imageInput).click();
    };

    this.afterFinishCallback = function(){
      this.trigger(document, "paintStopRequested");

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
          url: me.attr.url,
          file: me.attr.file
        }, function(){
          me.trigger(document, "stopLoadingIndicatorRequested");
        });
      });

      this.attr.rect = null;
    };
  }
});