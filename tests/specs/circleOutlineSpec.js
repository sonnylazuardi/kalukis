define(function(require){
  var circleOutline = require("utils/circleOutline"),
      fabric = require("fabric"),
      canvas = new fabric.Canvas("#test");


  describe("Circular Outline Calculation", function(){
    it("Produces the correct x,y coordinates", function(){
      var brush = new fabric.CircleBrush(canvas),
          x = 50,
          y = 50,
          radius = 10,
          points = circleOutline(brush, x, y, radius),
          length = points.length,
          r;

      for (var i = 0; i < length; i += brush.width) {
        r = Math.sqrt((Math.pow(x-points[i].x, 2))+(Math.pow(y-points[i].y, 2)));

        expect(Math.round(r)).toEqual(radius);
      }
    });
  });
});