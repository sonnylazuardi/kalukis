define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      RectOutline = require("outlineShapes/rectOutline");

  describeMixin("painters/withImagePainter", function(){

    beforeEach(function(){
      setupComponent({
        canvas: canvas
      });
    });

    describe("Constructing mixin", function(){

      it("RectOutlineShape ready", function(){
        expect(this.component.attr.mixinRectOutline).toBeInstanceOf(RectOutline);
      });

    });

    describe("Painting Execution", function(){

      xit("Register painting event to canvas events", function(){

      });

      xit("Publish addingImageInitted after outlineShapePainting is finisihed", function(){

      });

    });

  });

});