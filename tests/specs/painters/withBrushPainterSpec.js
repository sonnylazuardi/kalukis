define(function(require){
  var CircleBrush = require("brushes/circle"),
      fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      circleBrush = new CircleBrush(canvas, {});

  describeMixin("painters/withBrushPainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Brush Property Events", function(){

      beforeEach(function(){
        this.component.attr.activeBrush = {
          id: "circle",
          brush: circleBrush
        };
        $('.component-root').trigger("brushPropertyUpdated", {
          key: "fillColor",
          oldValue: "green",
          newValue: "red"
        });
      });

      it("Should have changed the brush instance's property", function(){
        expect(this.component.attr.activeBrush.brush.get("fillColor")).toEqual("red");
      });

      it("Should not have changed the brush property if the event data aren't complete", function(){
        $('.component-root').trigger("brushPropertyUpdated", {
          key: "strokeColor"
        });

        expect(this.component.attr.activeBrush.brush.get("strokeColor")).toEqual("#000000");
      });

    });

    describe("Active Brush Events", function(){

      beforeEach(function(){
        $('.component-root').trigger("activeBrushUpdated", {
          newActiveBrush: "newActive"
        });
      });

      it("Should have changed the active brush attribrute", function(){
        expect(this.component.attr.activeBrush).toEqual("newActive");
      });
    });

    describe("Brush Painting Flow", function(){

      beforeEach(function(){
        setupComponent();
        this.component.attr.activeBrush = {
          id: "circle",
          brush: circleBrush
        };

        this.component.attr.prop = {
          width: 25,
          fillColor: "red",
          strokeColor: "blue"
        };
      });

      it("Should have called finalizePainting after startBrushPainting has been executed", function(){
        var spiedEvent = spyOnEvent('.component-root', "brushPaintingFinished");

        this.component.startBrushPainting({});
        expect(spiedEvent).toHaveBeenTriggeredOn('.component-root');
      });

    });
  });
});