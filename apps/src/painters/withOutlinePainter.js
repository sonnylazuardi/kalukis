/**
 * I know how to manage the drawing of an outline
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
        this.prepareOutlineShapePainting(data.canvas, data.canvasEventsService);
      }.bind(this));

      this.on("brushPropertyUpdated", function(e, data){
        this.updateOutlineShapeProperty(data.key, data.newValue);
      }.bind(this));

      this.on("outlineShapePropertyUpdated", this.updateOutlineShapeProperty);
      this.on("activeOutlineShapeUpdated", this.setActiveOutlineShape);
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
      }
    };

    this.detachFromOutlineShapeRespondEvent = function(){
      this.off("outlineShapeRequestResponded");
      this.attr.isRequestingForActiveOutlineShapeInstance = false;
    };

    /**
     * Start the preparation of painting an outline shape. Note, if `outlineShape`
     * is provided, than that `outlineShape` will be drawn.
     * 
     * @param  {Object} canvas              Canvas instance
     * @param  {Object} canvasEventsService Canvas Events Service
     * @param  {Object} outlineShape        The custom outlineShape
     */
    this.prepareOutlineShapePainting = function(canvas, canvasEventsService, outlineShape){

      if (outlineShape) {
        this.attr.activeOutlineShape = outlineShape;
      }

      if (this.attr.activeOutlineShape){
        // register out outline shape painter to the canvas events
        // so that it can draw itself according to user's mouse interaction
        
        var outlineShape = this.attr.activeOutlineShape.outlineShape,
            listeners = {
              onMouseDown: function(e){
                outlineShape.onMouseDown(e);
              },
              onMouseMove: function(e){
                outlineShape.onMouseMove(e);
              },
              onMouseUp: function(e){
                outlineShape.onMouseUp(e);
              }
            };

        compose.mixin(outlineShape, [advice.withAdvice]);

        if (!outlineShape.hasOwnProperty("__hasBeenAddedAfterAdvice")) {
          outlineShape.after("finish", this.finalizeOutlineShapePainting.bind(this));
          outlineShape.__hasBeenAddedAfterAdvice = true;
        }
        
        
        canvasEventsService.unregisterExistingListeners(canvas);
        canvasEventsService.registerEventListeners(canvas, listeners);
        this.attr.activeOutlineShape.outlineShape.start();
      }
    };

    /**
     * Step taken after the drawing of outline shape has
     * finished
     * @param {String} e Event
     * @param {Object} data Event Data
     */
    this.finalizeOutlineShapePainting = function(e, data){
      this.trigger("outlineShapePaintingFinished", {
        outlineShapeId: this.attr.activeOutlineShape.id,
        outlineShape: this.attr.activeOutlineShape.outlineShape
      });
    };

  }

});