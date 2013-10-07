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

    describe("Painting Execution", function(){

      var canvasEventsService = {
        registerEventListeners: function(){},
        unregisterExistingListeners: function(){}
      };

      it("Publish addingImageInitted after outlineShapePainting is finisihed", function(){
        var spiedEvent = spyOnEvent(".component-root", "add-images");

        this.component.loadImages([], new RectOutline(canvas, {}));
        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });


    });

  });

});