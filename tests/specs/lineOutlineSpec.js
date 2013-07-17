define(function(require){
  var lineOutline = require("utils/lineOutline"),
      fabric = require("fabric"),
      canvas = new fabric.Canvas("#test");

  describe("Line Outline Calculation", function(){
    it("Produces the correct x,y coordinates", function(){
      var brush = new fabric.CircleBrush(canvas),
          x1 = 100,
          y1 = 100,
          x2 = 10,
          y2 = 10,
          points = lineOutline(brush, x1, y1, x2, y2),
          check = 100;

      expect(points.length).toEqual(10);

      for (var i = 0, n = points.length; i < n; i++){
        expect(points[i].x).toEqual(check);
        expect(points[i].y).toEqual(check);

        check -= 10;
      }
    });
  });
});