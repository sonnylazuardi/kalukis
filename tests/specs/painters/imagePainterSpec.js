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

    });

  });

});