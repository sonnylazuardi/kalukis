define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      RectOutline = require("outlineShapes/rectOutline"),
      withCanvas = require("painters/withCanvasEvents"),
      compose = require("flight/lib/compose"),
      canvasEventsService = {};

  compose.mixin(canvasEventsService, [withCanvas]);

  describeMixin("painters/withOutlinePainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Active Outline Shape", function(){

      it("Should hold which outline shape id is currently active", function(){
        $(".component-root").trigger("activeOutlineShapeChanged", {
          activeOutlineShapeId: "rect"
        });

        expect(this.component.attr.activeOutlineShapeId).toEqual("rect");
      });

      it("Returns the correct id", function(){
        $(".component-root").trigger("activeOutlineShapeChanged", {
          activeOutlineShapeId: "rect"
        });

        expect(this.component.getActiveOutlineShapeId()).toEqual("rect");
      });

      it("Should publish activeOutlineShapeIdUpdated", function(){
        var spiedEvent = spyOnEvent(".component-root", "activeOutlineShapeIdUpdated");

        $(".component-root").trigger("activeOutlineShapeChanged", {
          activeOutlineShapeId: "rect"
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });

    });

    describe("Active Outline Shape Management", function(){

      it("Should request for active outline shape instance on updated ID", function(){
        var spiedEvent = spyOnEvent(".component-root", "outlineShapeRequested");

        $(".component-root").trigger("activeOutlineShapeChanged", {
          activeOutlineShapeId: "rect"
        });

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });

    });

    describe("Active Outline Shape Property Management", function(){

    });

    describe("OutlineShape Painting Event Management", function(){

    });

    // describe("Event Listener", function(){

    //   it("Should have changed the active outline shape on activeOutlineShapeUpdated event", function(){
    //     $('.component-root').trigger("activeOutlineShapeUpdated", {
    //       newActiveOutlineShape: "example"
    //     });

    //     expect(this.component.attr.activeOutlineShape).toEqual("example");
    //   });

    //   it("Should have updated the property of the active outline shape instance", function(){
    //     this.component.attr.activeOutlineShape = {
    //       id: "rectOutline",
    //       outlineShape: new RectOutline(canvas, {})
    //     };

    //     $('.component-root').trigger("outlineShapePropertyUpdated", {
    //       key: "width",
    //       newValue: 50
    //     });

    //     var outlineShape = this.component.attr.activeOutlineShape.outlineShape;
    //     expect(outlineShape.get("width")).toEqual(50);
    //   });

    // });

    // describe("Outline shape painting", function(){

    //   beforeEach(function(){
    //     this.component.attr.activeOutlineShape = {
    //       id: "rectOutline",
    //       outlineShape: new RectOutline(canvas, {})
    //     };
    //   });

    //   it("Should have register the canvas events handler properly", function(){
    //     var activeOutlineShape = this.component.attr.activeOutlineShape.outlineShape;
    //     spyOn(activeOutlineShape, "onMouseMove");

    //     $('.component-root').trigger("outlineShapePaintingInitted", {
    //       canvas: canvas,
    //       canvasEventsService: canvasEventsService
    //     });

    //     canvas.trigger("mouse:move");
    //     expect(activeOutlineShape.onMouseMove).toHaveBeenCalled();
    //   });

    //   it("Should have unregister the previous event handler when another widget has been clicked", function(){
    //     var activeOutlineShape = this.component.attr.activeOutlineShape.outlineShape,
    //         called = 0;

    //     spyOn(activeOutlineShape, "onMouseMove").andCallFake(function(){
    //       called++;
    //     });

    //     $('.component-root').trigger("outlineShapePaintingInitted", {
    //       canvas: canvas,
    //       canvasEventsService: canvasEventsService
    //     });
    //     $('.component-root').trigger("outlineShapePaintingInitted", {
    //       canvas: canvas,
    //       canvasEventsService: canvasEventsService
    //     });

    //     canvas.trigger("mouse:move");
    //     expect(called).toEqual(1);
    //   });

    //   it("Should have called finalizeOutlineShapePainting after outlineShape's finish function has been executed", function(){
    //     var activeOutlineShape = this.component.attr.activeOutlineShape.outlineShape;

    //     spyOn(this.component, "finalizeOutlineShapePainting");

    //     $('.component-root').trigger("outlineShapePaintingInitted", {
    //       canvas: canvas,
    //       canvasEventsService: canvasEventsService
    //     });

    //     activeOutlineShape.finish();
    //     expect(this.component.finalizeOutlineShapePainting).toHaveBeenCalled();
    //   });

    //   it("Should have called finalizeOutlineShapePainting once", function(){
    //     var activeOutlineShape = this.component.attr.activeOutlineShape.outlineShape,
    //         called = 0;

    //     spyOn(this.component, "finalizeOutlineShapePainting").andCallFake(function(){
    //       called++;
    //     });

    //     $('.component-root').trigger("outlineShapePaintingInitted", {
    //       canvas: canvas,
    //       canvasEventsService: canvasEventsService
    //     });
    //     $('.component-root').trigger("outlineShapePaintingInitted", {
    //       canvas: canvas,
    //       canvasEventsService: canvasEventsService
    //     });

    //     activeOutlineShape.finish();
    //     expect(called).toEqual(1);
    //   });

    //   it("Should have triggered outlineShapePaintingFinished", function(){
    //     var activeOutlineShape = this.component.attr.activeOutlineShape.outlineShape,
    //       spiedEvent = spyOnEvent(document, "outlineShapePaintingFinished");

    //     $('.component-root').trigger("outlineShapePaintingInitted", {
    //       canvas: canvas,
    //       canvasEventsService: canvasEventsService
    //     });
    //     activeOutlineShape.finish();
    //     expect(spiedEvent).toHaveBeenTriggeredOn(document);
    //   });

    // });

  });

});