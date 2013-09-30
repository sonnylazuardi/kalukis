define(function(require){

  describeComponent("painters/imagePainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Painting Event", function(){

      it("Should respond to imageCanvasClicked event", function(){
        spyOn(this.component, "initImagePainting");

        $(".component-root").trigger("imageCanvasClicked", {
          files: []
        });
        expect(this.component.initImagePainting).toHaveBeenCalled();
      });

      it("Should request canceling any active painting when imageCanvasClicked is triggered", function(){
        var spiedEvent = spyOnEvent(".component-root", "cancelCurrentPainting");

        $(".component-root").trigger("imageCanvasClicked", {
          files: []
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });

      xit("Should stop any painting when cancelCurrentPainting", function(){

      });

    });

  });

});