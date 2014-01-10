define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("painters/freehandPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Painting Event", function(){

      beforeEach(function(){
        this.component.attr.canvas = canvas;
        this.component.setFreehandCanvas(canvas);
      });

      it("Should start painting when request-freehandPainting is triggered", function(){
        spyOn(this.component, "initFreehandPainting");

        $(".component-root").trigger("request-freehandPainting");
        expect(this.component.initFreehandPainting).toHaveBeenCalled();
      });

      it("Should request canceling any active painting when request-freehandPainting is triggered", function(){
        spyOn(this.component, "cancelCurrentPainting");

        $(".component-root").trigger("request-freehandPainting");
        expect(this.component.cancelCurrentPainting).toHaveBeenCalled();
      });

      it("Should stop any painting when cancel-painting", function(){
        canvas.isDrawingMode = true;
        this.component.setFreehandCanvas(canvas);

        $(".component-root").trigger("cancel-painting", {
          active: "paint"
        });
        expect(this.component.getFreehandCanvas().isDrawingMode).toEqual(false);
      });

    });

  });

});