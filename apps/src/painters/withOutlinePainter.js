/**
 * I know how to execute the drawing of an outline
 * shape. Therefore, I also know which outline shape to use
 */
define(function(require){

  var compose = require("flight/lib/compose"),
      advice = require("flight/lib/advice");

  return withOutlinePainter;

  function withOutlinePainter(){

    this.defaultAttrs({
      /**
       * The active outlineshape ID
       * @type {String}
       */
      activeOutlineShapeId: undefined,

      /**
       * The active outlineshape instance
       * @type {Object}
       */
      activeOutlineShape: undefined,

      /**
       * Am I requesting an outlineShape instance
       * @type {Boolean}
       */
      isRequestingForActiveOutlineShapeInstance: false
    });

    this.after("initialize", function(){

      this.on("activeOutlineShapeChanged", function(e, data){
        this.setActiveOutlineShapeId(data.activeOutlineShapeId);
      }.bind(this));

      this.on("outlineShapePaintingInitted", function(e, data){
        this.startOutlineShapePainting(data.canvas, data.canvasEventsService, data.outlineShape);
      }.bind(this));

      this.on("brushPropertyUpdated", function(e, data){
        this.updateOutlineShapeProperty(data.key, data.newValue);
      }.bind(this));

    });

    /**
     * Update the outlineShape instance property
     * @param  {String} key   The key property
     * @param  {String} value The value
     */
    this.updateOutlineShapeProperty = function(key, value){
      if (this.attr.activeOutlineShape) {
        this.attr.activeOutlineShape.set(key, value);
      }
    };

    /**
     * Set the active outlineshape ID
     * @param {String} id OutlineShape ID
     */
    this.setActiveOutlineShapeId = function(id) {
      this.attr.activeOutlineShapeId = id;

      this.trigger("activeOutlineShapeIdUpdated", {
        id: id
      });

      this.requestActiveOutlineShape(id);
    };

    /**
     * Returns the active outline shape ID
     * @return {String} ID
     */
    this.getActiveOutlineShapeId = function(){
      return this.attr.activeOutlineShapeId;
    };

    this.requestActiveOutlineShape = function(id){
      this.on("outlineShapeRequestResponded", function(e, data){
        this.setActiveOutlineShape(data.outlineShape);
      }.bind(this));

      this.attr.isRequestingForActiveOutlineShapeInstance = true;

      this.trigger("outlineShapeRequested", {
        id: id
      });
    };

    /**
     * Set the active outline shape
     * @param {Object} outlineShape OutlineShape instance
     */
    this.setActiveOutlineShape = function(outlineShape){
      if (this.attr.isRequestingForActiveOutlineShapeInstance) {
        this.attr.activeOutlineShape = outlineShape;  

        this.detachFromOutlineShapeRespondEvent();

        this.trigger("activeOutlineShapeUpdated", {
          outlineShape: outlineShape
        });
      }
    };

    this.detachFromOutlineShapeRespondEvent = function(){
      this.off("outlineShapeRequestResponded");
      this.attr.isRequestingForActiveOutlineShapeInstance = false;
    };

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
    this.startOutlineShapePainting = function(canvas, canvasEventsService, outlineShape){

      var usedOutlineShape = outlineShape || this.attr.activeOutlineShape;

      if (usedOutlineShape){
        // register out outline shape painter to the canvas events
        // so that it can draw itself according to user's mouse interaction
        
        var listeners = {
              onMouseDown: function(e){
                usedOutlineShape.onMouseDown(e);
              },
              onMouseMove: function(e){
                usedOutlineShape.onMouseMove(e);
              },
              onMouseUp: function(e){
                usedOutlineShape.onMouseUp(e);
              }
            };

        // we need to track wether we have added the after advice, so that
        // the `finalizeOutlineShapePainting` method is not called twice
        if (!usedOutlineShape.hasOwnProperty("__hasBeenAddedAfterAdvice")) {
          compose.mixin(usedOutlineShape, [advice.withAdvice]);

          usedOutlineShape.after("finish", function(){
            this.finalizeOutlineShapePainting(usedOutlineShape);
          }.bind(this));

          usedOutlineShape.__hasBeenAddedAfterAdvice = true;
        }
        
        
        canvasEventsService.unregisterExistingListeners(canvas);
        canvasEventsService.registerEventListeners(canvas, listeners);
        usedOutlineShape.start();
      }
    };

    /**
     * Step taken after the drawing of outline shape has
     * finished
     */
    this.finalizeOutlineShapePainting = function(outlineShape){
      this.trigger("outlineShapePaintingFinished", {
        outlineShape: outlineShape
      });
    };

  }

});