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
     * Prepare steps for painting
     */
    this.prepareBrushPainting = function(e, data){

    };

    /**
     * Paint the object
     */
    this.startBrushPainting = function(){

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