define(function(require) {
  var fabric = require('fabric'),
      defineComponent = require('flight/lib/component');

  return defineComponent(shirtPainter);

  function shirtPainter() {

    this.defaultAttrs({

      /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined,
    });

    this.after('initialize', function() {
      this.attachEventListeners();
    });

    this.attachEventListeners = function() {
      var self = this;
      this.on('canvas-ready', function( e, data ) {
        this.setCanvas(data.canvas);
      }.bind(this));
      this.on('shirtWidget-clicked', function(e,data) {
        var st = ["../pics/kaos1.jpg","../pics/kaos2.jpg","../pics/kaos3.jpg"];
        this.trigger(document, 'canvasManipulation-clicked', {
          manipulationId: 'clear'
        });
        fabric.Image.fromURL(st[data.counter], function(oImg) {
          oImg.scaleX = 0.8;
          oImg.scaleY = 0.8;
          self.attr.canvas.add(oImg);
        });
      }.bind(this));

    };

    /**
     * Savint the canvas instance
     * @param  {Object} canvas Canvas instance
     */
    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };
  }
});