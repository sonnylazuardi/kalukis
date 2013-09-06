/**
 * This mixin knows how to manage the drawing of an outline
 * shape.
 */
define(function(require){

  return withOutlinePainter;

  function withOutlinePainter(){

    this.defaultAttrs({
      activeOutlineShape: undefined,

      prop: {
        width: 10,

        fillColor: "#000000",

        strokeColor: "#000000"
      }
    });

    this.after("initialize", function(){
      this.on("outlineShapePaintingInitted", this.prepareOutlineShapePainting);
      this.on("outlineShapePropertyUpdated", this.updateOutlineShapeProperty);
      this.on("activeOutlineShapeUpdated", this.setActiveOutlineShape);

      // add an after-advice
      this.after("startOutlineShapePainting", this.finalizeOutlineShapePainting);
    });

    this.updateOutlineShapeProperty = function(){

    };

    this.setActiveOutlineShape = function(){

    };

    this.prepareOutlineShapePainting = function(){

    };

    this.finalizeOutlineShapePainting = function(){

    };

  }

});