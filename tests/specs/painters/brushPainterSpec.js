define(function(require){
  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("painters/brushPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Setting up", function(){

      it("Should request for brush instance on brushesLoaded event", function(){
        var spiedEvent = spyOnEvent(".component-root", "activeBrushChanged");
        $(".component-root").trigger("brushesLoaded", {
          brushes: [{id: "pencil"}]
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });

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

      it("Should listen to activeOutlineShapeReady event when activeOutlineShapeChanged has been triggered", function(){
        spyOn(this.component, "initOutlineShapePainting");

        $(".component-root").trigger("paintWidgetClicked", {
          paintWidgetId: "rect"
        });

        $(".component-root").trigger("activeOutlineShapeReady", {
          outlineShape: "rect"
        });

        expect(this.component.initOutlineShapePainting).toHaveBeenCalled();
      });

      it("Should detach activeOutlineShapeReady event when that event has been captured", function(){
        spyOn(this.component, "initOutlineShapePainting");

        $(".component-root").trigger("paintWidgetClicked", {
          paintWidgetId: "rect"
        });

        $(".component-root").trigger("activeOutlineShapeReady", {
          outlineShape: "rect"
        });        

        $(".component-root").trigger("activeOutlineShapeReady", {
          outlineShape: "circle"
        });

        // make sure only the first activeOutlineShapeReady is responded
        var args = this.component.initOutlineShapePainting.mostRecentCall.args[0];
        expect(args).toEqual({
          outlineShape: "rect"
        });
      });

    });

  });
});