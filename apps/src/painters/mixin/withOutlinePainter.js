/**
 * I know how to execute the drawing of an outline
 * shape.
 */
define(function(require) {

  var compose = require('flight/lib/compose'),
      advice = require('flight/lib/advice');

  return withOutlinePainter;

  function withOutlinePainter() {

    // TODO these steps need review

    /**
     * Start the preparation of painting an outline shape. Note, if `outlineShape`
     * is provided, than that `outlineShape` will be drawn.
     * 
     * @param  {Object} canvas              Canvas instance
     * @param  {Object} canvasEventsService Canvas Events Service. This is
     *                                      needed to attach the painting
     *                                      to the canvas painting related
     *                                      events
     * @param  {Object} outlineShape        The custom outlineShape. If
     *                                      provided, this instance will
     *                                      be used instead
     */
    this.startOutlineShapePainting = function(canvas, outlineShape, canvasEventsService) {

      // register out outline shape painter to the canvas events
      // so that it can draw itself according to user's mouse interaction
      
      var listeners = {
            obj: outlineShape,
            onMouseDown: function(e) {
              outlineShape.onMouseDown(e);
            },
            onMouseMove: function(e) {
              outlineShape.onMouseMove(e);
            },
            onMouseUp: function(e) {
              outlineShape.onMouseUp(e);
            }
          };

      // we need to track wether we have added the after advice, so that
      // the `finalizeOutlineShapePainting` method is not called twice
      if (!outlineShape.hasOwnProperty('__hasBeenAddedAfterAdvice')) {
        compose.mixin(outlineShape, [advice.withAdvice]);

        outlineShape.after('finish', function() {
          this.finalizeOutlineShapePainting(outlineShape);
        }.bind(this));

        outlineShape.__hasBeenAddedAfterAdvice = true;
      }
      
      
      canvasEventsService.unregisterExistingListeners(canvas);
      canvasEventsService.registerEventListeners(canvas, listeners);
      // start painting the outline shape
      outlineShape.start();
    };

    /**
     * Step taken after the drawing of outline shape has
     * finished
     */
    this.finalizeOutlineShapePainting = function(outlineShape) {
      this.trigger('outlineShape-painting-finished', {
        outlineShape: outlineShape
      });
    };

  }

});