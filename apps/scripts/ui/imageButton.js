define(function(require){

  var defineComponent = require("flight/component"),
      fabric = require("fabric"),
      advice = require("flight/lib/advice"),
      compose = require("flight/lib/compose"),
      withCanvas = require("data/with_canvas"),
      outlinePainter = require("outlinePainter/rect");

  compose.mixin(outlinePainter, [advice.withAdvice]);

  return defineComponent(imageButton, withCanvas);

  function imageButton(){

    this.defaultAttrs({
      color: "#585858";
    });

    this.after("initialize", function(){
      this.on("click", this.onClick);
      this.on(document, "uiBrushClicked", this.onUiBrushClicked);

      outlinePainter.after('finish', function(){
        this.afterFinishCallback();
      }.bind(this));
    });

    this.onUiBrushClicked = function(e, eObj){
      if (eObj.clicked !== "image") {
        this.trigger(document, "paintStopRequested");
      }
    };

    this.onClick = function(e, eObj){
      // TODO aaargh.. this is a bad event's name
      this.trigger(document, "uiBrushClicked", {clicked: "image"});

      outlinePainter.init(this.attr.canvas, {
        color: this.attr.color
      });
    };

    this.afterFinishCallback = function(){
      this.trigger(document, "paintStopRequested");

      this.attr.rect = outlinePainter.outline;

      this.addImageToCanvas();
    };

    this.addImageToCanvas = function(){
      var me = this,
          rect = this.attr.rect;

      require(["images/imageCanvasPlacement"], function(handler){
        handler.create(me.attr.canvas, {
          x: (rect.width > 0) ? rect.x : rect.x + rect.width,
          y: (rect.height > 0) ? rect.y : rect.y + rect.height,
          width: rect.width,
          height: rect.height,
          url: me.attr.url
        });
      });
    };
  }
});