define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      CircleOutline = require("outlineShapes/circleOutline");

  describeMixin("painters/withActiveOutlineShape", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Active OutlineShape Handling", function(){

      it("Should have reference to an outlineShape instance when a new one is available", function(){
        $(".component-root").trigger("paintWidgetClicked", {
          paintWidgetId: "circle"
        });

        $(".component-root").trigger("outlineShapeRequestResponded", {
          outlineShape: new CircleOutline(canvas, {})
        });

        expect(this.component.getActiveOutlineShape()).toBeInstanceOf(CircleOutline);
      });

      it("Should update the color of the outline when the user has chosen a new color", function(){
        this.component.setActiveOutlineShapeInstance(new CircleOutline(canvas, {}));

        $(".component-root").trigger("brushPropertyUpdated", {
          key: "fillColor",
          oldValue: "#000000",
          newValue: "red"
        });

        expect(this.component.getActiveOutlineShape().get("fillColor")).toEqual("red");
      });

    });

  });

});