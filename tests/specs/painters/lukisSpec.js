define(function(require){
  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeComponent("painters/lukis", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Custom Handlers", function(){

      beforeEach(function(){
        this.component.attr.customHandlers["outlineShapePaintingFinished"] = function(){};
      });

      it("Should delete the handler once it has been called", function(){
        $('.component-root').trigger("outlineShapePaintingFinished", {});
        expect(this.component.attr.customHandlers.hasOwnProperty("outlineShapePaintingFinished")).toBeFalsy();
      });

    });

  });
});