define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(imagePainter);

  function imagePainter(){

    this.defaultAttrs({

      canvas: undefined

    });

    this.after("initialize", function(){

    });

    this.requestCanvas = function(){
      this.trigger("canvasRequested");
    };

    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };

    this.attachEventListener = function(){

    };

    this.initImagePainting = function(){

    };

  }

});