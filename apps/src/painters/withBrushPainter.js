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
    });

    this.prepareBrushPainting = function(e, data){

    };

    this.updateBrushProperty = function(e, data){

    };

  }

});