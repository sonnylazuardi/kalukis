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

      it("Should holds which brush is currently active", function(){

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
    });

    describe("Active Brush Property Management", function(){

      beforeEach(function(){

      });

    });

    describe("Brush Painting Event Management", function(){

    });

    // describe("Brush Property Events", function(){

    //   beforeEach(function(){
    //     this.component.attr.activeBrush = {
    //       id: "circle",
    //       brush: circleBrush
    //     };
    //     $('.component-root').trigger("brushPropertyUpdated", {
    //       key: "fillColor",
    //       oldValue: "green",
    //       newValue: "red"
    //     });
    //   });

    //   it("Should have changed the brush instance's property", function(){
    //     expect(this.component.attr.activeBrush.brush.get("fillColor")).toEqual("red");
    //   });

    //   it("Should not have changed the brush property if the event data aren't complete", function(){
    //     $('.component-root').trigger("brushPropertyUpdated", {
    //       key: "strokeColor"
    //     });

    //     expect(this.component.attr.activeBrush.brush.get("strokeColor")).toEqual("#000000");
    //   });

    // });

    // describe("Active Brush Events", function(){

    //   beforeEach(function(){
    //     $('.component-root').trigger("activeBrushUpdated", {
    //       newActiveBrush: {
    //         id: "pencil",
    //         brush: {}
    //       }
    //     });
    //   });

    //   it("Should have changed the active brush attribrute", function(){
    //     expect(this.component.attr.activeBrush).toEqual({
    //       id: "pencil",
    //       brush: {}
    //     });
    //   });
      
    // });

    // describe("Brush Painting Flow", function(){

    //   beforeEach(function(){
    //     setupComponent();
    //     this.component.attr.activeBrush = {
    //       id: "circle",
    //       brush: circleBrush
    //     };

    //     this.component.attr.prop = {
    //       width: 25,
    //       fillColor: "red",
    //       strokeColor: "blue"
    //     };
    //   });

    //   it("Should have called finalizePainting after startBrushPainting has been executed", function(){
    //     var spiedEvent = spyOnEvent('.component-root', "brushPaintingFinished");

    //     this.component.startBrushPainting(canvas,[]);
    //     expect(spiedEvent).toHaveBeenTriggeredOn('.component-root');
    //   });

    // });
  });
});