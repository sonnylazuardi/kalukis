define(function(require){
  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("painters/brushPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Setting up", function(){

      it("Should request for brush instance on brushes-loaded event", function(){
        spyOn(this.component, "requestBrush");
        $(".component-root").trigger("brushes-loaded", {
          brushes: [{id: "pencil"}]
        });

        expect(this.component.requestBrush).toHaveBeenCalled();
      });

    });

    describe("Painting Event", function(){

      beforeEach(function(){
        this.component.attr.canvas = canvas;
      });

      it("Should map paintWidget-clicked to activeOutlineShape-changed event", function(){
        var spiedEvent = spyOnEvent(".component-root", "activeOutlineShape-changed");

        $(".component-root").trigger("paintWidget-clicked", {
          paintWidgetId: "rect"
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
        expect(spiedEvent.mostRecentCall.data.activeOutlineShapeId).toEqual("rect");
      });

      it("Should listen to activeOutlineShape-ready event when activeOutlineShape-changed has been triggered", function(){
        spyOn(this.component, "initOutlineShapePainting");

        $(".component-root").trigger("paintWidget-clicked", {
          paintWidgetId: "rect"
        });

        $(".component-root").trigger("activeOutlineShape-ready", {
          outlineShape: "rect"
        });

        expect(this.component.initOutlineShapePainting).toHaveBeenCalled();
      });

      it("Should detach activeOutlineShape-ready event when that event has been captured", function(){
        spyOn(this.component, "initOutlineShapePainting");

        $(".component-root").trigger("paintWidget-clicked", {
          paintWidgetId: "rect"
        });

        $(".component-root").trigger("activeOutlineShape-ready", {
          outlineShape: "rect"
        });        

        $(".component-root").trigger("activeOutlineShape-ready", {
          outlineShape: "circle"
        });

        // make sure only the first activeOutlineShape-ready is responded
        var args = this.component.initOutlineShapePainting.mostRecentCall.args[0];
        expect(args).toEqual({
          outlineShape: "rect"
        });
      });

    });

  });
});