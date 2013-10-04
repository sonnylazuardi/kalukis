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
        start: function(){},
        finish: function(){return true;}
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

      it("Should have unregister the previous event handler when another widget has been clicked", function(){
        var called = 0;

        spyOn(listener, "onMouseMove").andCallFake(function(){
          called++;
        });

        this.component.startOutlineShapePainting(canvas, listener, canvasEventsService);
        this.component.startOutlineShapePainting(canvas, listener, canvasEventsService);        

        canvas.trigger("mouse:move");
        expect(called).toEqual(1);
      });

      it("Should have called finalizeOutlineShapePainting once", function(){
        var called = 0;
        spyOn(listener, "finish").andCallFake(function(){
          called++;
        });

        this.component.startOutlineShapePainting(canvas, listener, canvasEventsService);
        this.component.startOutlineShapePainting(canvas, listener, canvasEventsService);

        listener.finish();
        expect(called).toEqual(1);
      });

    });

  });

});