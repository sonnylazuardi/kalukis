define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      RectOutline = require("outlineShapes/rectOutline");

  describeComponent("outlineServices/outlineManager", function(){

    beforeEach(function(){
      setupComponent();
      this.component.attr.canvas = canvas;
    });

    describe("Event Listener", function(){

      it("Should publish update event on new outline shape when paintWidgetClicked has been triggered", function(){
        var executed = false,
            eventData;
        runs(function(){
          $(document).on("outlineShapeUpdated", function(e, data){
            executed = true;
            eventData = data;
          });

          $(document).trigger('paintWidgetClicked', {
            paintWidgetId: "rect"
          });
        });

        waitsFor(function(){
          return executed;
        }, "The event listener has been executed", 1000);

        runs(function(){
          expect(eventData.newActiveOutlineShape.id).toEqual("rectOutline");
          expect(eventData.newActiveOutlineShape.outlineShape).toBeInstanceOf(RectOutline);
        });
      });

      it("Should have set outlineShape properties before publishing outlineShapeUpdated is triggered", function(){
        this.component.attr.activeOutlineShape = {
          id: "rectOutline",
          outlineShape: new RectOutline(this.component.attr.canvas, {})
        };
        this.component.attr.prop.width = 25;
        this.component.attr.prop.fillColor = "red";

        var executed = false,
            eventData;

        runs(function(){
          $(document).on("outlineShapeUpdated", function(e, data){
            executed = true;
            eventData = data;
          });

          $(document).trigger('paintWidgetClicked', {
            paintWidgetId: "rect"
          });
        });

        waitsFor(function(){
          return executed;
        }, "The event listener has been executed", 1000);

        runs(function(){
          var outlineShape = eventData.newActiveOutlineShape.outlineShape;
          expect(outlineShape.get("width")).toEqual(25);
          expect(outlineShape.get("fillColor")).toEqual("red");
        });
      });

      it("Should have updated outlineShapes properties on brushPropertyUpdated", function(){
        $('.component-root').trigger("brushPropertyUpdated", {
          key: "width",
          oldValue: 10,
          newValue: 20
        });

        expect(this.component.attr.prop.width).toEqual(20);
      });

    });

  });

});