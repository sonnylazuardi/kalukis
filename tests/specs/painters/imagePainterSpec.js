define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      RectOutline = require("outlineShapes/rectOutline");

  describeComponent("painters/imagePainter", function(){

    beforeEach(function(){
      setupComponent({
        canvas: canvas
      });
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
        var spiedEvent = spyOnEvent(".component-root", "cancelPaintingRequested");

        $(".component-root").trigger("imageCanvasClicked", {
          files: []
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });

      it("Should stop any painting when cancelPaintingRequested", function(){
        spyOn(this.component, "stopCurrentPainting");

        $(".component-root").trigger("cancelPaintingRequested", {
          active: "freehand"
        });
        expect(this.component.stopCurrentPainting).toHaveBeenCalled();
      });

      it("Should call loadImages once the outlineShape has been painted", function(){
        this.component.attr.rectOutline = new RectOutline(canvas, {});
        spyOn(this.component, "loadImages");

        this.component.initImagePainting([]);

        $(".component-root").trigger("outlineShapePaintingFinished");
        expect(this.component.loadImages).toHaveBeenCalled();
      });

      it("Should not respond to outlineShapePaintingFinished once the painting process has been initted", function(){
        this.component.attr.rectOutline = new RectOutline(canvas, {});
        spyOn(this.component, "onOutlineShapePaintingFinished").andCallThrough();

        this.component.initImagePainting([]);

        $(".component-root").trigger("outlineShapePaintingFinished", {
          called: 1
        });
        $(".component-root").trigger("outlineShapePaintingFinished", {
          called: 2
        });

        expect(this.component.onOutlineShapePaintingFinished.mostRecentCall.args[1]).toEqual({called: 1});
      });

    });

  });

});