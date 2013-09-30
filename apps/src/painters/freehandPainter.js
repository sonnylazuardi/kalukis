define(function(require){

  var defineComponent = require("flight/lib/component"),
      withFreehandPainter = require("painters/withFreehandPainter");

  return defineComponent(freehandPainter, withFreehandPainter);

  function freehandPainter(){

    this.defaultAttrs({
      canvas: undefined
    });

    this.after("initialize", function(){
      this.attachEventListeners();
      this.requestCanvas();
    });

    this.requestCanvas = function(){
      this.trigger("canvasRequested");
    };

    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };

    this.attachEventListeners = function(){
      this.on("canvasRequestResponded", function(e, data){
        this.setCanvas(data.canvas);
      }.bind(this));

      this.on("cancelCurrentPainting", function(e, data){
        if (data.active !== "freehand") {
          this.stopFreehandPainting();
        }
      }.bind(this));

      this.on("freehandPaintingRequested", function(e, data){
        this.cancelCurrentPainting();
        this.initFreehandPainting();
      }.bind(this));
    };

    this.cancelCurrentPainting = function(){
      this.trigger("cancelCurrentPainting", {
        active: "freehand"
      });
    };

    this.initFreehandPainting = function(){
      this.startFreehandPainting(this.attr.canvas);
    };
  }

});