/**
 * I instantiate the canvas instance and respond to anyone asking for it
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      fabric = require("fabric");

  return defineComponent(Canvas);

  function Canvas(){

    this.defaultAttrs({

      id: undefined,

      canvas: undefined

    });

    this.after("initialize", function(){
      this.setCanvas();

      this.on("canvasRequested", this.respondCanvasRequest);

    });

    this.setCanvas = function(){
      this.attr.canvas = new fabric.Canvas(this.attr.id);
    };

    this.respondCanvasRequest = function(){
      this.trigger("canvasRequestResponded", {
        id: this.attr.id,
        canvas: this.attr.canvas
      });
    };

  }

});