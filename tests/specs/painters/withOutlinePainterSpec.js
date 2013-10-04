define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      RectOutline = require("outlineShapes/rectOutline"),
      withCanvas = require("painters/withCanvasEvents"),
      compose = require("flight/lib/compose"),
      canvasEventsService = {},
      listener = {
        onMouseMove: function(){},
        onMouseDown: function(){},
        onMouseUp: function(){},
        start: function(){}
      };

  compose.mixin(canvasEventsService, [withCanvas]);

  describeMixin("painters/withOutlinePainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("OutlineShape Painting Event Management", function(){

      it("Should have register the canvas events handler properly", function(){
        spyOn(listener, "onMouseMove");

        this.component.startOutlineShapePainting(canvas, listener, canvasEventsService);

        canvas.trigger("mouse:move");
        expect(listener.onMouseMove).toHaveBeenCalled();
      });

      xit("Should have unregister the previous event handler when another widget has been clicked", function(){
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

      xit("Should have called finalizeOutlineShapePainting after outlineShape's finish function has been executed", function(){
        var activeOutlineShape = this.component.attr.activeOutlineShape;

        spyOn(this.component, "finalizeOutlineShapePainting");

        $('.component-root').trigger("outlineShapePaintingInitted", {
          canvas: canvas,
          canvasEventsService: canvasEventsService
        });

        activeOutlineShape.finish();
        expect(this.component.finalizeOutlineShapePainting).toHaveBeenCalled();
      });

      xit("Should have called finalizeOutlineShapePainting once", function(){
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

      xit("Should have triggered outlineShapePaintingFinished", function(){
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