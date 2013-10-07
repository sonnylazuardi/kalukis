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
        $(".component-root").trigger("activeOutlineShape-changed", {
          activeOutlineShapeId: "circle"
        });

        $(".component-root").trigger("outlineShape-served", {
          outlineShape: new CircleOutline(canvas, {})
        });

        expect(this.component.getActiveOutlineShape()).toBeInstanceOf(CircleOutline);
      });

      it("Should update the color of the outline when the user has chosen a new color", function(){
        this.component.setActiveOutlineShapeInstance(new CircleOutline(canvas, {}));

        $(".component-root").trigger("brushProperty-updated", {
          key: "fillColor",
          oldValue: "#000000",
          newValue: "red"
        });

        expect(this.component.getActiveOutlineShape().get("fillColor")).toEqual("red");
      });

      it("Should publish activeOutlineShape-ready on setting new brush instance", function(){
        var spiedEvent = spyOnEvent(".component-root", "activeOutlineShape-ready");
        this.component.setActiveOutlineShapeInstance(new CircleOutline(canvas, {}));

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");

      });

    });

  });

});