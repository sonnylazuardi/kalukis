define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      RectOutline = require("outlineShapes/rectOutline"),
      compose = require("flight/lib/compose"),
      withCanvasEvents = require("painters/withCanvasEvents"),
      canvasEventsService = {};

  compose.mixin(canvasEventsService, [withCanvasEvents]);

  describeMixin("painters/withImagePainter", function(){

    beforeEach(function(){
      setupComponent({
        canvas: canvas
      });
    });

    describe("Constructing mixin", function(){

      it("RectOutlineShape ready", function(){
        expect(this.component.attr.mixinRectOutline).toBeInstanceOf(RectOutline);
      });

    });

    describe("Painting Execution", function(){
      var onMouseMoveCalled = false,
          onMouseDownCalled = false,
          onMouseUpCalled = false;

      var listeners = {
        onMouseMove: function(){onMouseMoveCalled=true;},
        onMouseDown: function(){onMouseDownCalled=true;},
        onMouseUp: function(){onMouseUpCalled=true;},
        start: function(){}
      };

      it("Register painting event to canvas events", function(){
        this.component.attr.mixinRectOutline = listeners;
        var canvas = this.component.attr.canvas;

        this.component.startImagePainting(canvas, [], canvasEventsService);

        canvas.trigger("canvas:move");
        expect(onMouseMoveCalled).toBeTruthy();
      });

      it("Register after advice", function(){
        this.component.startImagePainting(canvas, [], canvasEventsService);
        expect(this.component.attr.mixinRectOutline).toHaveProperties("__hasBeenAddedAfterAdvice");
      });

      it("Publish addingImageInitted after outlineShapePainting is finisihed", function(){
        var spiedEvent = spyOnEvent(".component-root", "addingImageInitted");

        this.component.startImagePainting(canvas, [], canvasEventsService);
        this.component.attr.mixinRectOutline.finish();
        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });


    });

  });

});