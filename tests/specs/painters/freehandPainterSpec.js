define(function(reqiuire){

  describeComponent("painters/freehandPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Painting Event", function(){

      it("Should start painting when freehandPaintingRequested is triggered", function(){
        spyOn(this.component, "startFreehandPainting");

        $(".component-root").trigger("freehandPaintingRequested");
        expect(this.component.startFreehandPainting).toHaveBeenCalled();
      });

    });

  });

});