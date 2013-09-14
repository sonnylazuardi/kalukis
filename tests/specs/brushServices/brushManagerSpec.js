define(function(require){
  var fabric = require("fabric"),
  CircleBrush = require("brushes/circle"),
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
        $('.component-root').on("activeBrushUpdated", function(e, data){
          expect(this.component.attr.activeBrush.id).toEqual("circle");
          expect(this.component.attr.activeBrush.brush).toBeInstanceOf(CircleBrush);
        }, this);

        $('.component-root').trigger("activeBrushChanged", {
          activeBrushId: "circle"
        });
      });

      it("Should have set the properties of the activeBrush before sending it on activeBrushUpdated event", function(){
        // as if this brush had been created before
        this.component.attr.brushes["circle"] = new CircleBrush(canvas, {});

        this.component.attr.prop.width = 35;
        this.component.attr.prop.fillColor = "yellow";
        this.component.attr.prop.strokeColor = "pink";

        $('.component-root').on("activeBrushUpdated", function(e, data){
          var brush = data.newActiveBrush.brush;

          expect(brush.get('width')).toEqual(35);
          expect(brush.get("fillColor")).toEqual("yellow");
          expect(brush.get("strokeColor")).toEqual("pink");  
        });

        // should have changed now
        $('.component-root').trigger("activeBrushChanged", {
          activeBrushId: "circle"
        });
      });

      it("Should set the active brush to the default on bruhsLoaded event", function(){
        $('.component-root').on("activeBrushUpdated", function(){
          expect(this.component.attr.activeBrush.id).toEqual("pencil");
        }.bind(this));

        $(document).trigger("brushesLoaded", {
          brushes: [{id: "pencil", name: "Pencil"}]
        });
      });

    });
  });
});