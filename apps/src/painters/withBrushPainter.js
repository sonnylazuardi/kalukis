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
      activeBrush: undefined,

      /**
       * Brush properties
       * @type {Object}
       */
      prop: {
        /**
         * Color used to fill an object
         * @type {String}
         */
        fillColor: "#000000",
        /**
         * Color used for object outline
         * @type {String}
         */
        strokeColor: "#000000",
        /**
         * The width of the brush
         * @type {Number}
         */
        width: 10
      }
    });

    this.after("initialize", function(){
      this.on("brushPaintingInitted", this.prepareBrushPainting);
      this.on("brushPropertyUpdated", this.updateBrushProperty);
      this.on("activeBrushUpdated", this.setActiveBrush);
    });

    /**
     * Preparation step before starting to paint. The `data`
     * passed is expected to have properties of:
     * + `data.points`: which holds the points for which      *                  canvas objects should be drawn at
     * + `data.prop`  : canvas objects properties
     * @param  {String} e    Event
     * @param  {Object} data Event Data
     */
    this.prepareBrushPainting = function(e, data){
      // only proceed if `data.points` are available
      if (data.points && this.attr.activeBrush) {
        this.startBrushPainting(data);
      }
    };

    /**
     * Paint the object. This method expects that config
     * has all the configuration needed to paint the
     * requested object
     * @param {Object} config The painting configuration
     */
    this.startBrushPainting = function(config){

    };

    /**
     * Update brush property
     * @param  {String} e    Event
     * @param  {Object} data Event Data
     */
    this.updateBrushProperty = function(e, data){
      if (data.key && data.newValue) {
        this.attr.prop[data.key] = data.newValue;
      }
    };

    /**
     * Set active brush
     * @param {String} e    Event
     * @param {Object} data Event Data
     */
    this.setActiveBrush = function(e, data){
      if (data.newActiveBrush) {
        this.attr.activeBrush = data.newActiveBrush;
      }
    };

  }

});