define(function(require){

  var fabric = require("fabric"),
      canvas;

  describeMixin("sandboxes/canvasExtension/withCanvasInstance", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Init Canvas", function(){

      it("Should call init method", function(){
        spyOn(this.component, "initCanvas");

        this.component.getCanvasInstance("lukis");
        expect(this.component.initCanvas).toHaveBeenCalledWith("lukis");
      });

      it("Should return the correct canvas object", function(){
        expect(this.component.getCanvasInstance("lukis")).toBeInstanceOf(fabric.Canvas);
      });

      it("Should have saved the created canvas instance", function(){
        this.component.getCanvasInstance("lukis");
        expect(this.component.attr.initted).toHaveProperties("lukis");
      });

    });

  });

});