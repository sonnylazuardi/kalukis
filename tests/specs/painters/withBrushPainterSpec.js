define(function(require){
  var CircleBrush = require("brushes/circle"),
      fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      circleBrush = new CircleBrush(canvas, {});

  describeMixin("painters/withBrushPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Active Brush", function(){

      it("Should hold which brush is currently active", function(){

        $(".component-root").trigger("activeBrushChanged", {
          activeBrushId: "rect"
        });

        expect(this.component.attr.activeBrushId).toEqual("rect");
      });

      it("Returns the correct activeBrushID", function(){
        $(".component-root").trigger("activeBrushChanged", {
          activeBrushId: "rect"
        });

        expect(this.component.getActiveBrushId()).toEqual("rect");
      });

      it("Should publish event regarding active brush id changed", function(){
        var spiedEvent = spyOnEvent(".component-root", "activeBrushIdUpdated");

        $(".component-root").trigger("activeBrushChanged", {
          activeBrushId: "rect"
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
        expect(spiedEvent.mostRecentCall.data.id).toEqual("rect");
      });

    });

    describe("Active Brush Event Management", function(){

      it("Should request an instance of the active brush when the activeBrushId has been updated", function(){
        var spiedEvent = spyOnEvent(".component-root", "brushRequested");

        $(".component-root").trigger("activeBrushChanged", {
          activeBrushId: "rect"
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
        expect(spiedEvent.mostRecentCall.data.id).toEqual("rect");
      });

      it("Should be listening to the brushRequestResponded event", function(){
        $(".component-root").trigger("activeBrushChanged", {
          activeBrushId: "rect"
        });

        $(".component-root").trigger("brushRequestResponded", {
          brush: "rectBrush"
        });

        expect(this.component.attr.activeBrush).toEqual("rectBrush");
      });

      it("Should detach itself from brushRequestResponded event once the active brush instance has been saved", function(){
        
        $(".component-root").trigger("activeBrushChanged", {
          activeBrushId: "rect"
        });

        $(".component-root").trigger("brushRequestResponded", {
          brush: "rectBrush"
        });

        // should not update the brush instance
        $(".component-root").trigger("brushRequestResponded", {
          brush: "yellowBrush"
        });

        expect(this.component.attr.activeBrush).toEqual("rectBrush");
        expect(this.component.attr.isRequestingForActiveBrushInstance).toBeFalsy();
      });
    });

    describe("Active Brush Property Management", function(){

      beforeEach(function(){
        this.component.attr.activeBrush = new CircleBrush(canvas, {});
        this.component.attr.activeBrushId = "circle";
      });

      it("Should update the active brush property when there is a change in the brush property", function(){
        $(".component-root").trigger("brushPropertyUpdated", {
          key: "width",
          oldValue: 10,
          newValue: 20
        });

        expect(this.component.attr.activeBrush.get("width")).toEqual(20);
      });

    });

    describe("Brush Painting Event Management", function(){

      beforeEach(function(){
        this.component.attr.activeBrush = new CircleBrush(canvas, {});
        this.component.attr.activeBrushId = "circle";
      });

      it("Should have executed finalizePainting after drawing the brush is finished", function(){
        var spiedEvent = spyOnEvent(".component-root", "brushPaintingFinished");

        this.component.startBrushPainting(canvas, [{x: 0, y: 0}]);
        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });

    });

  });
});