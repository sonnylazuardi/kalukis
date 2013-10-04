define(function(require){

  var defineComponent = require("flight/lib/component"),
      withFreehandPainter = require("painters/withFreehandPainter");

  return defineComponent(freehandPainter, withFreehandPainter);

  function freehandPainter(){

    this.defaultAttrs({

      isPainting: false,

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
      this.on("canvasServed", function(e, data){
        this.setCanvas(data.canvas);
      }.bind(this));

      this.on("cancelPaintingRequested", function(e, data){
        if (data.active !== "freehand") {
          this.stopFreehandPainting();
        }
      }.bind(this));

      this.on("freehandPaintingRequested", function(e, data){
        this.cancelCurrentPainting();
        this.initFreehandPainting();
      }.bind(this));
    };

    /**
     * Cancel current freehand painting
     * TODO
     */
    this.cancelCurrentPainting = function(){
      this.trigger("cancelPaintingRequested", {
        active: "freehand"
      });
    };

    this.initFreehandPainting = function(){
      this.startFreehandPainting(this.attr.canvas);
    };
  }

});