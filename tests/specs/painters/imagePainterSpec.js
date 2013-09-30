define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("painters/imagePainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Painting Event", function(){

      beforeEach(function(){
        this.component.attr.canvas = canvas;
      });

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

      it("Should stop any painting when cancelCurrentPainting", function(){
        spyOn(this.component, "stopImagePainting");

        $(".component-root").trigger("cancelCurrentPainting", {
          active: "freehand"
        });
        expect(this.component.stopImagePainting).toHaveBeenCalled();
      });

    });

  });

});