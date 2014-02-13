/**
 * I manage freehand painting.
 *
 * The steps:
 *
 * 1. 'request-freehandPainting' will be triggered
 * 2. prepare for this painting
 * 3. start painting. The painting itself is ran from
 * withFreehandPainter
 */
define(function(require) {

  var defineComponent = require('flight/lib/component'),
      withFreehandPainter = require('painters/mixin/withFreehandPainter');

  /**
   * withFreehandPainter is used to do the freehand painting
   */
  return defineComponent(freehandPainter, withFreehandPainter);

  function freehandPainter() {

    this.defaultAttrs({
      /**
       * Canvas instance
       * @type {Object}
       */
      canvas: undefined, 
      _socket: undefined,
    });

    this.after('initialize', function() {
      this.attachEventListeners();
      var self = this;
      // this.attr._socket.on('brushdown', function(data) {
      //   var brush = self.attr.canvas.freeDrawingBrush;
      //   console.log('mouse down');
      //   console.log(data);
      //   brush.onMouseDown(data, true);
      // });
      // this.attr._socket.on('brushmove', function(data) {
      //   var brush = self.attr.canvas.freeDrawingBrush;
      //   // self.initFreehandPainting();
      //   console.log('mouse move');
      //   // console.log(brush);
      //   // brush.drawDot(data);
      //   brush.onMouseMove(data, true);
      //   // brush.onMouseUp();
      //   // console.log(brush);
      //   // self.stopFreehandPainting();
      //   // brush.hasBeenHijacked = false;
      // });
      // this.attr._socket.on('brushup', function() {
      //   var brush = self.attr.canvas.freeDrawingBrush;
      //   console.log('mouse up');
      //   brush.onMouseUp(true);
      // });
    });

    /**
     * Setting canvas instance
     * @param {Object} canvas Canvas Instance
     */
    this.setCanvas = function( canvas ) {
      this.attr.canvas = canvas;
    };

    this.attachEventListeners = function() {
      this.on('canvas-ready', function( e, data ) {
        this.setCanvas(data.canvas);
      }.bind(this));

      this.on('cancel-painting', function( e, data ) {
        if (data.active !== 'freehand') {
          // from withFreehandPainter
          this.stopFreehandPainting();
        }
      }.bind(this));

      this.on('request-freehandPainting', function( e, data ) {
        this.cancelCurrentPainting();
        this.initFreehandPainting();
      }.bind(this));

    };

    /**
     * Cancel current freehand painting
     */
    this.cancelCurrentPainting = function() {
      this.trigger('cancel-painting', {
        active: 'freehand'
      });
    };

    /**
     * Start painting
     */
    this.initFreehandPainting = function() {
      this.trigger('notify', {
        type: 'info',
        message: 'Press [ESC] to cancel any painting'
      });
      // `startFreehandPainting`, a method from withFreehandPainter
      this.startFreehandPainting(this.attr.canvas);
    };
  }

});