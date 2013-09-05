/**
 * This mixin knows how to manage the painting of an object
 * which uses a specific brush.
 */
define(function(require){

  return withBrushPainter;

  function withBrushPainter(){

    this.defaultAttrs({
      activeBrush: undefined,

      prop: {
        fillColor: "#000000",

        strokeColor: "#000000",

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