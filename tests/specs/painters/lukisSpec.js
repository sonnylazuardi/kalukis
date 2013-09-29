define(function(require){
  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("painters/lukis", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Painting Event", function(){

      beforeEach(function(){
        this.component.attr.canvas = canvas;
      });

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

      it("Should detach activeOutlineShapeUpdated event when that event has been captured", function(){
        spyOn(this.component, "initOutlineShapePainting");

        $(".component-root").trigger("paintWidgetClicked", {
          paintWidgetId: "rect"
        });

        $(".component-root").trigger("activeOutlineShapeUpdated", {
          outlineShape: "rect"
        });        

        $(".component-root").trigger("activeOutlineShapeUpdated", {
          outlineShape: "circle"
        });

        // make sure only the first activeOutlineShapeUpdated is responded
        var args = this.component.initOutlineShapePainting.mostRecentCall.args[0];
        expect(args).toEqual({
          outlineShape: "rect"
        });
      });

      it("Should publish cancelPaintingRequested on painting", function(){
        var spiedEvent = spyOnEvent(".component-root", "cancelCurrentPainting");

        $(".component-root").trigger("paintWidgetClicked", {
          paintWidgetId: "rect"
        });
        $(".component-root").trigger("activeOutlineShapeUpdated", {
          outlineShape: "rect"
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
        expect(spiedEvent.mostRecentCall.data.active).toEqual("paint");
      });

    });

    describe("Custom Handlers", function(){

      beforeEach(function(){
        this.component.attr.canvas = canvas;
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