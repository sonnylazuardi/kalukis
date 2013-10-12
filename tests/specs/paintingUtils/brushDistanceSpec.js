define(function( require ){

  var brushDistance = require("paintingUtils/brushDistance");

  describe("BrushDistanceUtils", function() {

    it("Should know when it's not far enough", function() {
      expect(brushDistance.isFarEnough(
        {x: 0,y: 0},
        {x: 1, y: 1},
        10
      )).toBeFalsy();
    });

  });

});