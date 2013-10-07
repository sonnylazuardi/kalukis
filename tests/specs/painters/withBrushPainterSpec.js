define(function(require){
  var CircleBrush = require("brushes/circle"),
      fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      circleBrush = new CircleBrush(canvas, {});

  describeMixin("painters/withBrushPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Brush Painting Event Management", function(){

      it("Should have executed finalizePainting after drawing the brush is finished", function(){
        var spiedEvent = spyOnEvent(".component-root", "brushPainting-finished");

        this.component.startBrushPainting(canvas, circleBrush, [{x: 0, y: 0}]);
        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");
      });

    });

  });
});