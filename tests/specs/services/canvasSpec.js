define(function(require){

  var fabric = require("fabric"),
      canvas;

  describeComponent("services/canvas", function(){

    beforeEach(function(){
      loadFixtures("canvas.html");
      setupComponent({
        id: "lukis"
      });
      canvas = new fabric.Canvas("lukis");
    });

    describe("Initialize component", function(){

      it("Should be able to initialize the canvas", function(){
        expect(this.component.attr.canvas).toBeInstanceOf(fabric.Canvas);
      });

    });

    describe("Component communication", function(){

      it("Should publish the correct data on canvasRequested event", function(){

      });

    });

  });

});