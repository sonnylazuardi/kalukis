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

      it("Should publish activeOutlineShapeUpdated event when a new active outlineshape is updated", function(){
        var spiedEvent = spyOnEvent(".component-root", "activeOutlineShapeUpdated");

        this.component.attr.isRequestingForActiveOutlineShapeInstance = true;
        this.component.setActiveOutlineShape("something");

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

      it("Should listen for outlineShapeRequestResponded event when outlineShapeRequested has been triggered", function(){
        $(".component-root").trigger("activeOutlineShapeChanged", {
          activeOutlineShapeId: "rect"
        });

        $(".component-root").trigger("outlineShapeRequestResponded", {
          outlineShape: "rectOutline"
        });

        expect(this.component.attr.activeOutlineShape).toEqual("rectOutline");
      });

      it("Should stop listening to outlineShapeRequestResponded once the requested outlineshape has been set", function(){
        $(".component-root").trigger("activeOutlineShapeChanged", {
          activeOutlineShapeId: "rect"
        });

        $(".component-root").trigger("outlineShapeRequestResponded", {
          outlineShape: "rectOutline"
        });

        $(".component-root").trigger("outlineShapeRequestResponded", {
          outlineShape: "circleOutline"
        });

        expect(this.component.attr.activeOutlineShape).toEqual("rectOutline");
      });

      it("Should set isRequestingForActiveOutlineShapeInstance to false once the instance has been set", function(){
        $(".component-root").trigger("activeOutlineShapeChanged", {
          activeOutlineShapeId: "rect"
        });

        expect(this.component.attr.isRequestingForActiveOutlineShapeInstance).toBeTruthy();

        $(".component-root").trigger("outlineShapeRequestResponded", {
          outlineShape: "rectOutline"
        });

        expect(this.component.attr.isRequestingForActiveOutlineShapeInstance).toBeFalsy();
      });

    });

    describe("Active Outline Shape Property Management", function(){

      beforeEach(function(){
        this.component.attr.activeOutlineShape = new RectOutline(canvas, {});
        this.component.attr.activeOutlineShapeId = "rect";
      });

      it("Should update the active outlineShape properties when there is a change in the brush property", function(){
        $(".component-root").trigger("brushPropertyUpdated", {
          key: "fillColor",
          oldValue: "#000000",
          newValue: "red"
        });

        expect(this.component.attr.activeOutlineShape.get("fillColor")).toEqual("red");
      });

    });

    describe("OutlineShape Painting Event Management", function(){

      beforeEach(function(){
        this.component.attr.activeOutlineShapeId = "rect";
        this.component.attr.activeOutlineShape = new RectOutline(canvas, {});
      });

      it("Should have register the canvas events handler properly", function(){
        var activeOutlineShape = this.component.attr.activeOutlineShape;
        spyOn(activeOutlineShape, "onMouseMove");

        $('.component-root').trigger("outlineShapePaintingInitted", {
          canvas: canvas,
          canvasEventsService: canvasEventsService
        });

        canvas.trigger("mouse:move");
        expect(activeOutlineShape.onMouseMove).toHaveBeenCalled();
      });

      it("Should have unregister the previous event handler when another widget has been clicked", function(){
        var activeOutlineShape = this.component.attr.activeOutlineShape,
            called = 0;

        spyOn(activeOutlineShape, "onMouseMove").andCallFake(function(){
          called++;
        });

        $('.component-root').trigger("outlineShapePaintingInitted", {
          canvas: canvas,
          canvasEventsService: canvasEventsService
        });
        $('.component-root').trigger("outlineShapePaintingInitted", {
          canvas: canvas,
          canvasEventsService: canvasEventsService
        });

        canvas.trigger("mouse:move");
        expect(called).toEqual(1);
      });

      it("Should have called finalizeOutlineShapePainting after outlineShape's finish function has been executed", function(){
        var activeOutlineShape = this.component.attr.activeOutlineShape;

        spyOn(this.component, "finalizeOutlineShapePainting");

        $('.component-root').trigger("outlineShapePaintingInitted", {
          canvas: canvas,
          canvasEventsService: canvasEventsService
        });

        activeOutlineShape.finish();
        expect(this.component.finalizeOutlineShapePainting).toHaveBeenCalled();
      });

      it("Should have called finalizeOutlineShapePainting once", function(){
        var activeOutlineShape = this.component.attr.activeOutlineShape,
            called = 0;

        spyOn(this.component, "finalizeOutlineShapePainting").andCallFake(function(){
          called++;
        });

        $('.component-root').trigger("outlineShapePaintingInitted", {
          canvas: canvas,
          canvasEventsService: canvasEventsService
        });
        $('.component-root').trigger("outlineShapePaintingInitted", {
          canvas: canvas,
          canvasEventsService: canvasEventsService
        });

        activeOutlineShape.finish();
        expect(called).toEqual(1);
      });

      it("Should have triggered outlineShapePaintingFinished", function(){
        var activeOutlineShape = this.component.attr.activeOutlineShape,
          spiedEvent = spyOnEvent(document, "outlineShapePaintingFinished");

        $('.component-root').trigger("outlineShapePaintingInitted", {
          canvas: canvas,
          canvasEventsService: canvasEventsService
        });
        activeOutlineShape.finish();
        expect(spiedEvent).toHaveBeenTriggeredOn(document);
      });

    });

  });

});