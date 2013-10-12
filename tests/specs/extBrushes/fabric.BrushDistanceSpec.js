define(function( require ) {

  var brushDistanceUtils = require("extBrushes/fabric.BrushDistance"),
      RectBrush = require("brushes/rect"),
      fabric = require("fabric");

  describe("Fabric.BrushDistance", function() {

    var brush, canvas;

    beforeEach(function() {
      canvas = new fabric.Canvas();
      brush = new RectBrush(canvas, {});
    });

    it("Should hijack the onMouseMove brush function", function() {
      brushDistanceUtils.hijack(brush);
      expect(brush.hasBeenHijacked).toBeTruthy();
    });

  });

});