/**
 * This mixin knows how to manage the drawing of an outline
 * shape.
 */
define(function(require){

  var compose = require("flight/lib/compose"),
      advice = require("flight/lib/advice");

  return withOutlinePainter;

  function withOutlinePainter(){

    this.defaultAttrs({
      activeOutlineShape: undefined
    });

    this.after("initialize", function(){
      this.on("outlineShapePaintingInitted", function(e, data){
        this.prepareOutlineShapePainting(data.canvas, data.canvasEventsService);
      }.bind(this));
      this.on("outlineShapePropertyUpdated", this.updateOutlineShapeProperty);
      this.on("activeOutlineShapeUpdated", this.setActiveOutlineShape);
    });

    /**
     * Update the instance of activeOutlineShape property
     * @param {String} e Event
     * @param {Object} data Event Data
     */
    this.updateOutlineShapeProperty = function(e, data){
      if (data.key && data.newValue && this.attr.activeOutlineShape) {
        this.attr.activeOutlineShape.outlineShape.set(data.key, data.newValue);
      }
    };

    /**
     * Set the new active outline shape
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.setActiveOutlineShape = function(e, data){
      if (data.newActiveOutlineShape) {
        this.attr.activeOutlineShape = data.newActiveOutlineShape;
        this.trigger("outlineShapePaintingReady", {
          activeOutlineShape: this.attr.activeOutlineShape
        });
      }
    };

    /**
     * Start preparation of drawing outline shape.
     */
    this.prepareOutlineShapePainting = function(canvas, canvasEventsService){
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