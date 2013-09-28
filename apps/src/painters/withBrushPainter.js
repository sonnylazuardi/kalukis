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
      this.on("activeBrushChanged", function(e, data){
        this.setActiveBrushId(data.activeBrushId);
      }.bind(this));

      this.on("brushPaintingInitted", function(e, data){
        this.prepareBrushPainting(data.canvas, data.canvasEventsService, data.points);
      }.bind(this));

      this.on("brushPropertyUpdated", function(e, data){
        this.updateBrushProperty(data.key, data.newValue);
      }.bind(this));
      // this.on("activeBrushUpdated", this.setActiveBrush);

      // add an after-advice
      this.after("startBrushPainting", this.finalizePainting);
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
     * Preparation step before starting to paint. The `data`
     * passed is expected to have properties of:
     * + `data.points`: which holds the points for which      *                  canvas objects should be drawn at
     * + `data.prop`  : canvas objects properties
     * @param  {String} e    Event
     * @param  {Object} data Event Data
     */
    this.prepareBrushPainting = function(canvas, canvasEventsService, points){
      // only proceed if `data.points` are available
      if (this.attr.activeBrush) {
        this.startBrushPainting(canvas, points);
      }
    };

    /**
     * Paint the object. This method expects that config
     * has all the configuration needed to paint the
     * requested object
     * @param {Object} config The painting configuration
     */
    this.startBrushPainting = function(canvas, points){
      this.attr.activeBrush.brush.drawAtPoints(points);
      canvas.renderAll();
    };

    /**
     * The final steps after object has been drawn
     */
    this.finalizePainting = function(){
      this.trigger("brushPaintingFinished", {
        brush: this.attr.activeBrush
      });
    };

  }

});