define(function(reqiuire){

  describeComponent("painters/freehandPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Painting Event", function(){

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

    });

  });

});