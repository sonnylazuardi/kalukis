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
      activeBrush: undefined
    });

    this.after("initialize", function(){
      this.on("activeBrushChanged", function(e, data){
        this.setActiveBrushId(data.activeBrushId);
      }.bind(this));

      this.on("brushPaintingInitted", function(e, data){
        this.prepareBrushPainting(data.canvas, data.canvasEventsService, data.points);
      }.bind(this));
      this.on("brushPropertyUpdated", this.updateBrushProperty);
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
    };

    this.getActiveBrushId = function(){
      return this.attr.activeBrushId;
    };

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