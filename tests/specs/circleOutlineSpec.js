define(function(require){
  var circleOutlinePts = require("utils/circleOutlinePoints"),
      fabric = require("fabric"),
      canvas = new fabric.Canvas("#test");


  describe("Circular Outline Calculation", function(){
    it("Produces the correct x,y coordinates", function(){
      var brush = new fabric.CircleBrush(canvas),
          x = 50,
          y = 50,
          radius = 10,
          points = circleOutlinePts(brush, x, y, radius),
          length = points.length,
          r;
      // we asume that the coordinates are correct
      // if the distance between the points and the coordinates
      // x and y given above is equal radius
      for (var i = 0; i < length; i += brush.width) {
        r = Math.sqrt((Math.pow(x-points[i].x, 2))+(Math.pow(y-points[i].y, 2)));

        expect(Math.round(r)).toEqual(radius);
      }

      x = 120;
      y = 125;
      radius = 7;
      points = circleOutlinePts(brush, x, y, radius);
      length = points.length;

      for (i = 0; i < length; i += brush.width) {
        r = Math.sqrt((Math.pow(x-points[i].x, 2))+(Math.pow(y-points[i].y, 2)));

        expect(Math.round(r)).toEqual(radius);
      }
    });
  });
});