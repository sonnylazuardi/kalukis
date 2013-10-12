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

    it("Should return the closes point based on the requested distance", function() {
      var point = brushDistance.getClosestPoint({x: 0,y: 0}, {x:15, y: 15}, 5);

      expect(point.x).toBeGreaterThan(10);
      expect(point.y).toBeGreaterThan(10);

      expect(point.x).toBeLessThan(12);
      expect(point.y).toBeLessThan(12);
    });

  });

});