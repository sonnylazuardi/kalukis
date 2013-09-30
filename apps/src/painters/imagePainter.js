define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(imagePainter);

  function imagePainter(){

    this.defaultAttrs({

      canvas: undefined

    });

    this.after("initialize", function(){
      this.attachEventListener();
    });

    this.requestCanvas = function(){
      this.trigger("canvasRequested");
    };

    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };

    this.attachEventListener = function(){
      this.on("imageCanvasClicked", function(e, data){
        this.cancelCurrentPainting();
        this.initImagePainting(data.files);
      }.bind(this));
    };

    this.cancelCurrentPainting = function(){
      this.trigger("cancelCurrentPainting", {
        active: "image"
      });
    };

    this.initImagePainting = function(files){

    };

  }

});