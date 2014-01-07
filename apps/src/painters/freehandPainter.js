/**
 * I manage freehand painting.
 */
define(function(require){

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
      canvas: undefined
    });

    this.after('initialize', function() {
      this.attachEventListeners();
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
      // from withFreehandPainter
      this.startFreehandPainting(this.attr.canvas);
    };
  }

});