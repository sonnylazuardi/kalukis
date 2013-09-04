/**
 * This component has an authority in managing the steps needed
 * to paint an object on top of the canvas
 */
define(function(require){
  var fabric = require("fabric"),
      defineComponent = require("flight/lib/component"),
      withFabricPaintingEvent = require("painters/withFabricPaintingEvent");

  return defineComponent(Lukis, withFabricPaintingEvent);

  function Lukis(){

    this.defaultAttrs({
      /**
       * Canvas instance
       * @type {String}
       */
      canvas: "",
      /**
       * Canvas element
       * @type {String}
       */
      canvasEl: "",
      /**
       * Canvas configuration
       * @type {Object}
       */
      canvasCfg: {

      }
    });

    this.after("initialize", function(){
      this.attr.canvas = new fabric.Canvas(canvasEl, this.attr.canvasCfg);
    });

  }
});