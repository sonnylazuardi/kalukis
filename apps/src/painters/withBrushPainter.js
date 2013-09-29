/**
 * I know how to manage the painting of an object
 * which uses a specific brush. Therefore, I also know
 * which brush to use.
 */
define(function(require){

  return withBrushPainter;

  function withBrushPainter(){

    this.defaultAttrs({
      /**
       * The active brush id
       * @type {String}
       */
      activeBrushId: undefined,

      /**
       * The current active brush used to paint
       * @type {Object}
       */
      activeBrush: undefined,

      /**
       * A state which tells wether this mixin is
       * requesting for an active brush instance
       * @type {Boolean}
       */
      isRequestingForActiveBrushInstance: false
    });

    this.after("initialize", function(){

      this.on("brushesLoaded", function(e, data){
        this.setActiveBrushId(data.brushes[0].id);
      });
      
      this.on("activeBrushChanged", function(e, data){
        this.setActiveBrushId(data.activeBrushId);
      }.bind(this));

      this.on("brushPaintingInitted", function(e, data){
        this.prepareBrushPainting(data.canvas, data.points, data.brush);
      }.bind(this));

      this.on("brushPropertyUpdated", function(e, data){
        this.updateBrushProperty(data.key, data.newValue);
      }.bind(this));
    });

    /**
     * Set the active brush ID
     * @param {String} id Brush ID
     */
    this.setActiveBrushId = function(id) {
      this.attr.activeBrushId = id;

      this.trigger("activeBrushIdUpdated", {
        id: id
      });

      this.requestActiveBrush(id);
    };

    /**
     * Returns the active brush ID. This could be used by
     * the component which this mixin is composed to.
     * 
     * @return {String} The current brush ID
     */
    this.getActiveBrushId = function(){
      return this.attr.activeBrushId;
    };

    /**
     * Request for the active brush instance
     * @param  {String} id The brush ID
     */
    this.requestActiveBrush = function(id){
      this.on("brushRequestResponded", function(e, data){
        this.setActiveBrush(data.brush);
      }.bind(this));

      this.attr.isRequestingForActiveBrushInstance = true;

      this.trigger("brushRequested", {
        id: id
      });
    };

    /**
     * Set the active brush instance
     * @param {Object} brush The brush instance
     */
    this.setActiveBrush = function(brush){
      if (this.attr.isRequestingForActiveBrushInstance) {
        this.attr.activeBrush = brush;

        this.detachFromBrushRespondEvent();
      }
    };

    /**
     * Returns the active brush instance. Could be used by
     * the component which has this mixin composed to itself
     * 
     * @return {Object} Active brush instance
     */
    this.getActiveBrush = function(){
      return this.attr.activeBrush;
    };

    /**
     * Dont listen to the brushRequestRespondedEvent
     */
    this.detachFromBrushRespondEvent = function(){
      this.off("brushRequestResponded");
      this.attr.isRequestingForActiveBrushInstance = false;
    };

    /**
     * Update active brush instance property
     * @param  {String} key   The property
     * @param  {String} value The value
     */
    this.updateBrushProperty = function(key, value){
      if (this.attr.activeBrush) {
        this.attr.activeBrush.set(key, value);
      }
    };

    /**
     * Paints the object with the active brush instance
     * @param  {Object} canvas The canvas instance
     * @param  {Array} points Points
     */
    this.startBrushPainting = function(canvas, points, brush){
      var usedBrush = brush || this.attr.activeBrush;

      if (usedBrush) {
        usedBrush.drawAtPoints(points);
        canvas.renderAll();

        this.finalizePainting(usedBrush);
      }
    };

    /**
     * The final steps after object has been drawn
     */
    this.finalizePainting = function(brush){
      this.trigger("brushPaintingFinished", {
        brush: brush
      });
    };

  }

});