define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      RectOutline = require("outlineShapes/rectOutline");

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

      var canvasEventsService = {
        unregisterExistingListeners: function(){},
        registerEventListeners: function(){}
      };

      xit("Register painting event to canvas events", function(){
        this.component.startImagePainting(canvas, [], canvasEventsService);

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