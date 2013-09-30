define(function(require){

  var defineComponent = require("flight/lib/component"),
      withFreehandPainter = require("painters/withFreehandPainter");

  return defineComponent(freehandPainter, withFreehandPainter);

  function freehandPainter(){

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
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
      this.trigger("cancelPaintingRequested", {
        active: "freehand"
      });
    };

    this.initFreehandPainting = function(){

    };
  }

});