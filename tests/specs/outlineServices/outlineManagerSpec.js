define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

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