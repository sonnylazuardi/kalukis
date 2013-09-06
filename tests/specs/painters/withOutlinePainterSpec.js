define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeMixin("painters/withOutlinePainter", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Event Listener", function(){

      it("Should have changed the active outline shape on activeOutlineShapeUpdated event", function(){
        $('.component-root').trigger("activeOutlineShapeUpdated", {
          newActiveOutlineShape: "example"
        });

        expect(this.component.attr.activeOutlineShape).toEqual("example");
      });

    });

  });

});