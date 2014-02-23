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
      _socket: undefined
    });

    this.after('initialize', function() {
      this.attachEventListeners();
      var self = this;
      this.attr._socket.on('createShirt', function(data) {
        console.log('create shirt');
        self.createShirt(data);
      });
    });

    this.attachEventListeners = function() {
      var self = this;
      this.on('canvas-ready', function( e, data ) {
        this.setCanvas(data.canvas);
      }.bind(this));
      this.on('shirtWidget-clicked', function(e,data) {
        this.createShirt(data);
        this.attr._socket.emit('createShirt', data);
      }.bind(this));

    };

    this.createShirt = function(data) {
      var self = this;
      var st = ["pics/kaos1.jpg","pics/kaos2.jpg","pics/kaos3.jpg"];
      this.trigger(document, 'canvasManipulation-clicked', {
        manipulationId: 'clear',
        shirt: true
      });
      fabric.Image.fromURL(st[data.counter], function(oImg) {
        oImg.scaleX = 0.8;
        oImg.scaleY = 0.8;
        self.attr.canvas.add(oImg);
      });
    }

    /**
     * Savint the canvas instance
     * @param  {Object} canvas Canvas instance
     */
    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };
  }
});