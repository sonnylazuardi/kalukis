define(function(require){
  var defineComponent = require("flight/component"),
      advice = require("flight/lib/advice"),
      compose = require("flight/lib/compose"),
      withCanvas = require("data/with_canvas"),
      fabric = require("fabric"),
      outlinePainter = require("outlinePainter/circle");

  return defineComponent(circleShapedBrush, withCanvas);

  function circleShapedBrush(){

    this.defaultAttrs({
      brush: {
        color: "#000000"
      }
    });

    this.after("initialize", function(){
      this.on("click", this.onClick);
      this.on(document, "uiBrushClicked", this.onUiBrushClicked);
      this.on(document, "colorChanged", this.setBrushProperty);


    });

    this.onUiBrushClicked = function(e, eObj){
      if (eObj.clicked !== "circle") {
        console.log("circle stopped");
        this.trigger(document, "paintStopRequested");
      }
    };

    this.onClick = function(e, eObj){
      this.trigger(document, "uiBrushClicked", {clicked: "circle"});

      this.on(document, "selectedBrushReady", this.onSelectedBrushReady);

      this.attr.outlinePainter = outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });

      compose.mixin(this.attr.outlinePainter, [advice.withAdvice]);

      this.attr.outlinePainter.after("finish", function(){
        this.afterFinishCallback();
      }.bind(this));

      this.trigger(document, "paintRequested", {
        painter: this.attr.outlinePainter
      });

      this.trigger(document, "selectedBrushRequested");
    };

    this.setBrushProperty = function(e, eObj){
      this.attr.brush[eObj.key] = eObj[eObj.key];
    };

    this.setBrush = function(e, eObj){
      this.attr.brushId = eObj.selectedId;
    };

    this.afterFinishCallback = function(e, eObj){
      this.trigger(document, "paintStopRequested");

      this.attr.circle = this.attr.outlinePainter.outline;

      this.createShapeBrush();
    };

    this.onSelectedBrushReady = function(e, eObj){
      this.setBrush(e, eObj);
    };

    this.createShapeBrush = function(){
      var brushModule = "shapeBrush/circle-" + this.attr.brushId,
          me = this,
          circle = this.attr.circle;

      require([brushModule], function(brush){

        brush.create(me.attr.canvas, {
          x: circle.x,
          y: circle.y,
          radius: circle.radius,
          color: me.attr.brush.color
        });

        me.attr.canvas.renderAll();
      });

      me.attr.circle = null;
    };
  }
});