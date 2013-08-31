define(function(require){
  var fabric = require("fabric"),
      CircleBrush = require("brushes/circle");

  describe("Brush Init", function(){

    it("Should initted an instance of CircleBrush", function(){
      var cb = new CircleBrush(fabric);

      this.expect(cb.getBrush()).toBeInstanceOf(fabric.CircleBrush);
    });

  });
});