define(function( require ){

  var brushDistance = require("paintingUtils/brushDistance");

  describe("BrushDistanceUtils", function() {

    it("Should know when it's not far enough", function() {
      expect(brushDistance.isFarEnough(
        {x: 0,y: 0},
        {x: 1, y: 1},
        10
      )).toBeFalsy();

      expect(brushDistance.isFarEnough(
        {x: 3,y: 3},
        {x: 9, y: 2},
        10
      )).toBeFalsy();
    });

    it("Should know when it's far enought", function() {
      expect(brushDistance.isFarEnough(
        {x: 0,y: 0},
        {x: 11, y: 11},
        10
      )).toBeTruthy();

      expect(brushDistance.isFarEnough(
        {x: 3,y: 3},
        {x: 13, y: 13},
        10
      )).toBeTruthy();
    });

  });

});