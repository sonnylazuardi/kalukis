define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      CircleBrush = require("brushes/circle");

  describeMixin("painters/withActiveBrush", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Active Brush Handling", function(){

      it("Should have reference to a brush instance when a new brush is clicked", function(){
        $(".component-root").trigger("activeBrushChanged", {
          activeBrushId: "circle"
        });
        $(".component-root").trigger("brushServed", {
          brush: new CircleBrush(canvas, {})
        });

        expect(this.component.getActiveBrush()).toBeInstanceOf(CircleBrush);
      });

      it("Should update the current active brush property when a property is upadted", function(){
        this.component.setActiveBrushInstance(new CircleBrush(canvas, {}));

        $(".component-root").trigger("brushPropertyUpdated", {
          key: "width",
          oldValue: 10,
          newValue: 20
        });

        var brush = this.component.getActiveBrush();
        expect(brush.get("width")).toEqual(20);
      });

      it("Should publish activeBrushReady on setting new brush instance", function(){
        var spiedEvent = spyOnEvent(".component-root", "activeBrushReady");
        this.component.setActiveBrushInstance(new CircleBrush(canvas, {}));

        expect(spiedEvent).toHaveBeenTriggeredOn(".component-root");

      });

    });

  });

});