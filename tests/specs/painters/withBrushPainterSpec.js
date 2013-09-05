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
        $('.component-root').trigger("brushPropertyUpdated", {
          key: "fillColor",
          oldValue: "green",
          newValue: "red"
        });
      });

      it("Should have changed brush property", function(){
        expect(this.component.attr.prop.fillColor).toEqual("red");
      });

      it("Should not have changed the brush property if the event data aren't complete", function(){
        $('.component-root').trigger("brushPropertyUpdated", {
          key: "strokeColor"
        });

        expect(this.component.attr.prop.strokeColor).toEqual("#000000");
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

      it("Should set the brush properties before start painting", function(){
        spyOn(this.component, "setActiveBrushProperty").andCallThrough();
        spyOn(this.component, "startBrushPainting");

        $('.component-root').trigger("brushPaintingInitted", {
          points: [{x:0,y:0},{x:1,y:1}]
        });

        expect(this.component.setActiveBrushProperty).toHaveBeenCalled();

        var brush = this.component.attr.activeBrush.brush;
        expect(brush.get('width')).toEqual(25);
        expect(brush.get("fillColor")).toEqual("red");
        expect(brush.get("strokeColor")).toEqual("blue");
      });

    });
  });
});