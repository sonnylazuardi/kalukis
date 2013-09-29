define(function(require){
  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("painters/lukis", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Painting Event", function(){

      it("Should map paintWidgetClicked to activeOutlineShapeChanged event", function(){
        var spiedEvent = spyOnEvent(".component-root", "activeOutlineShapeChanged");

        $(".component-root").trigger("paintWidgetClicked", {
          paintWidgetId: "rect"
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
        expect(spiedEvent.mostRecentCall.data.activeOutlineShapeId).toEqual("rect");
      });

      it("Should listen to activeOutlineShapeUpdated event when activeOutlineShapeChanged has been triggered", function(){
        spyOn(this.component, "initOutlineShapePainting");

        $(".component-root").trigger("paintWidgetClicked", {
          paintWidgetId: "rect"
        });

        $(".component-root").trigger("activeOutlineShapeUpdated", {
          outlineShape: "rect"
        });

        expect(this.component.initOutlineShapePainting).toHaveBeenCalled();
      });

    });

    describe("Custom Handlers", function(){

      beforeEach(function(){
        this.component.attr.customHandlers["outlineShapePaintingFinished"] = function(){};
      });

      it("Should delete the handler once it has been called", function(){
        $('.component-root').trigger("outlineShapePaintingFinished", {});
        expect(this.component.attr.customHandlers.hasOwnProperty("outlineShapePaintingFinished")).toBeFalsy();
      });

      it("Should delete the handler when cancelCurrentPainting is called", function(){
        this.component.cancelCurrentPainting();
        expect(this.component.attr.customHandlers).not.toHaveOwnProperties("outlineShapePaintingFinished");
      });

    });

  });
});