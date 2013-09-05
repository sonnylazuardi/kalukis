define(function(require){
  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("brushServices/brushManager", function(){

    describe("Listening to events", function(){

      beforeEach(function(){
        setupComponent({
          canvas: canvas
        });
      });

      it("Should listen to brush property changed", function(){
        $('.component-root').trigger("brushPropertyChanged", {
          width: 20
        });
        expect(this.component.attr.prop.width).toEqual(20);
      });

      it("Should publish update regarding any changes in brush properties", function(){
        var spiedEvent = spyOnEvent('.component-root', "brushPropertyUpdated");

        $('.component-root').trigger("brushPropertyChanged", {
          fillColor: "red"
        });
        expect(this.component.attr.prop.fillColor).toEqual("red");
        expect(spiedEvent).toHaveBeenTriggeredOn('.component-root');

        var eventData = spiedEvent.mostRecentCall.data;
        expect(eventData.key).toEqual("fillColor");
        expect(eventData.oldValue).toEqual("#000000");
        expect(eventData.newValue).toEqual("red");
      });

      it("Should listen to active brush changed event", function(){
        $('.component-root').trigger("activeBrushChanged", {
          activeBrushId: "circle"
        });

        expect(this.component.attr.activeBrush.id).toEqual("circle");
        // expect(this.component.attr.activeBrush.brush).toEqual("active");
      });

      it("Should publish active brush updated event when active brush has been changed", function(){
        var spiedEvent = spyOnEvent('.component-root', "activeBrushUpdated");
        $('.component-root').trigger("activeBrushChanged", {
          activeBrushId: "circle"
        });      

        expect(spiedEvent).toHaveBeenTriggeredOn('.component-root');

        var eventData = spiedEvent.mostRecentCall.data;
        expect(eventData.oldActiveBrush).toBeUndefined();
        expect(eventData.newActiveBrush.id).toEqual("circle");
      });

    });

  });
});