/**
 * I instantiate the canvas instance and respond to anyone asking for it
 */
define(function(require){
  /**
   * TODO
   * I don't like the current implementation. I don't think it
   * is a good thing that a component that needs canvas instance has
   * to request for the instance through event
   */

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
      this.on("request-canvas", this.respondCanvasRequest);
    });

    this.setCanvas = function(){
      this.attr.canvas = new fabric.Canvas(this.attr.id, {
        backgroundColor: "#ECF0F1",
        interactive: true,
        selection: true
      });
    };

    this.respondCanvasRequest = function(){
      this.trigger("canvas-served", {
        id: this.attr.id,
        canvas: this.attr.canvas
      });
    };

  }

});