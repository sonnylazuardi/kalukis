define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("painters/freehandPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Painting Event", function(){

      beforeEach(function(){
        this.component.attr.mixinCanvas = canvas;
      });

      it("Should start painting when freehandPaintingRequested is triggered", function(){
        spyOn(this.component, "initFreehandPainting");

        $(".component-root").trigger("freehandPaintingRequested");
        expect(this.component.initFreehandPainting).toHaveBeenCalled();
      });

      it("Should request canceling any active painting when freehandPaintingRequested is triggered", function(){
        spyOn(this.component, "cancelCurrentPainting");

        $(".component-root").trigger("freehandPaintingRequested");
        expect(this.component.cancelCurrentPainting).toHaveBeenCalled();
      });

      it("Should stop any painting when cancelCurrentPainting", function(){
        this.component.attr.mixinCanvas.isDrawingMode = true;

        $(".component-root").trigger("cancelCurrentPainting", {
          active: "paint"
        });
        expect(this.component.attr.mixinCanvas.isDrawingMode).toEqual(false);
      });

    });

  });

});