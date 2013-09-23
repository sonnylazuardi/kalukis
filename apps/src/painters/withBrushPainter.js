/**
 * This mixin knows how to manage the painting of an object
 * which uses a specific brush.
 */
define(function(require){

  return withBrushPainter;

  function withBrushPainter(){

    this.defaultAttrs({
      /**
       * The current active brush used to paint
       * @type {Object}
       */
      activeBrush: undefined
    });

    this.after("initialize", function(){
      this.on("brushPaintingInitted", function(e, data){
        this.prepareBrushPainting(data.canvas, data.canvasEventsService, data.points);
      }.bind(this));
      this.on("brushPropertyUpdated", this.updateBrushProperty);
      this.on("activeBrushUpdated", this.setActiveBrush);

      // add an after-advice
      this.after("startBrushPainting", this.finalizePainting);
    });

    /**
     * Update brush instance's property
     * @param  {String} e    Event
     * @param  {Object} data Event Data
     */
    this.updateBrushProperty = function(e, data){
      if (data.key && data.newValue && this.attr.activeBrush) {
        this.attr.activeBrush.brush.set(data.key, data.newValue);
      }
    };

    /**
     * Set active brush. This method expects the brush to
     * have been constructed so that it can be used straight
     * away.
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.setActiveBrush = function(e, data){
      if (data.newActiveBrush) {
        this.attr.activeBrush = data.newActiveBrush;
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