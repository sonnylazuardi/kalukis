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

      it("Should respond to imageCanvas-clicked event", function(){
        spyOn(this.component, "initImagePainting");

        $(".component-root").trigger("imageCanvas-clicked", {
          files: []
        });
        expect(this.component.initImagePainting).toHaveBeenCalled();
      });

      it("Should request canceling any active painting when imageCanvas-clicked is triggered", function(){
        var spiedEvent = spyOnEvent(".component-root", "cancel-painting");

        $(".component-root").trigger("imageCanvas-clicked", {
          files: []
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });

      it("Should stop any painting when cancel-painting", function(){
        spyOn(this.component, "stopCurrentPainting");

        $(".component-root").trigger("cancel-painting", {
          active: "freehand"
        });
        expect(this.component.stopCurrentPainting).toHaveBeenCalled();
      });

      it("Should call loadImages once the outlineShape has been painted", function(){
        this.component.attr.rectOutline = new RectOutline(canvas, {});
        spyOn(this.component, "loadImages");

        this.component.initImagePainting([]);

        $(".component-root").trigger("outlineShape-painting-finished");
        expect(this.component.loadImages).toHaveBeenCalled();
      });

      it("Should not respond to outlineShape-painting-finished once the painting process has been initted", function(){
        this.component.attr.rectOutline = new RectOutline(canvas, {});
        spyOn(this.component, "onOutlineShapePaintingFinished").andCallThrough();

        this.component.initImagePainting([]);

        $(".component-root").trigger("outlineShape-painting-finished", {
          called: 1
        });
        $(".component-root").trigger("outlineShape-painting-finished", {
          called: 2
        });

        expect(this.component.onOutlineShapePaintingFinished.mostRecentCall.args[1]).toEqual({called: 1});
      });

    });

  });

});