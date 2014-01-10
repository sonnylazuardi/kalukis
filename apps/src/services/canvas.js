/**
 * I instantiate the canvas instance and respond to anyone asking for it
 */
define(function(require) {
  var defineComponent = require('flight/lib/component'),
      fabric = require('fabric');

  return defineComponent(Canvas);

  function Canvas() {

    this.defaultAttrs({

      id: undefined,

      canvas: undefined,

      canvasAttrs: {}

    });

    this.after('initialize', function() {
      this.setCanvas();
      this.on('request-canvas', this.respondCanvasRequest);
      this.publishCanvas();
    });

    this.setCanvas = function() {
      this.attr.canvas = new fabric.Canvas(this.attr.id, this.attr.canvasAttrs);
    };

    this.publishCanvas = function() {
      this.trigger('canvas-ready', {
        id: this.attr.id,
        canvas: this.attr.canvas
      });
    };

    this.respondCanvasRequest = function() {
      this.trigger('canvas-served', {
        id: this.attr.id,
        canvas: this.attr.canvas
      });
    };

  }

});