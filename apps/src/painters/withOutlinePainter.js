/**
 * This mixin knows how to manage the drawing of an outline
 * shape.
 */
define(function(require){

  return withOutlinePainter;

  function withOutlinePainter(){

    this.defaultAttrs({
      activeOutlineShape: undefined
    });

    this.after("initialize", function(){
      this.on("outlineShapePaintingInitted", this.prepareOutlineShapePainting);
      this.on("outlineShapePropertyUpdated", this.updateOutlineShapeProperty);
      this.on("activeOutlineShapeUpdated", this.setActiveOutlineShape);

      // add an after-advice
      this.after("startOutlineShapePainting", this.finalizeOutlineShapePainting);
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
      }
    };

    /**
     * Start preparation of drawing outline shape.
     */
    this.prepareOutlineShapePainting = function(e, data){
      if (this.attr.activeOutlineShape && data.canvasEventsService && data.canvas){
        // register out outline shape painter to the canvas events
        // so that it can draw itself according to user's mouse interaction
        data.canvasEventsService.registerEventListeners(data.canvas, this.attr.activeOutlineShape.outlineShape);
      }
    };

    /**
     * Step taken after the drawing of outline shape has
     * finished
     * @param {String} e Event
     * @param {Object} data Event Data
     */
    this.finalizeOutlineShapePainting = function(e, data){
      // TODO
    };

  }

});