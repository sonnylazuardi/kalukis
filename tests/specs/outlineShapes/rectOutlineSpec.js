define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas(),
      RectOutline = require("outlineShapes/rectOutline"),
      outline, brush;

  describe("Rect Outline", function(){

    beforeEach(function(){
      outline = new RectOutline(canvas, {});
    });

    describe("Outline Points", function(){

      beforeEach(function(){
        outline.outline = {
          x: 5,
          y: 10,
          width: 20,
          height: 20
        };
      });

      it("Should have calculated correctly", function(){

        var points = outline.getOutlinePoints(5);
        expect(points.length).toEqual(16);
        // top
        expect(points[0]).toEqual({x: 10, y: 10});
        expect(points[1]).toEqual({x: 15, y: 10});
        expect(points[2]).toEqual({x: 20, y: 10});
        // left
        expect(points[3]).toEqual({x: 5, y: 10});
        expect(points[4]).toEqual({x: 5, y: 15});
        expect(points[5]).toEqual({x: 5, y: 20});
        // bottom
        expect(points[6]).toEqual({x: 5, y: 25});
        expect(points[7]).toEqual({x: 5, y: 30});
        expect(points[8]).toEqual({x: 10, y: 30});
        expect(points[9]).toEqual({x: 15, y: 30});
        expect(points[10]).toEqual({x: 20, y: 30});
        // right
        expect(points[11]).toEqual({x: 25, y: 30});
        expect(points[12]).toEqual({x: 25, y: 25});
        expect(points[13]).toEqual({x: 25, y: 20});
        expect(points[14]).toEqual({x: 25, y: 15});
        expect(points[15]).toEqual({x: 25, y: 10});
      });

    });

    describe("Outline position", function(){

      it("Should normalized the position", function(){
        outline.outline = {
          x: 50,
          y: 50,
          width: -10,
          height: -20
        };

        outline.normalizeOutlinePosition();
        expect(outline.outline).toEqual({
          x: 40,
          y: 30,
          width: 10,
          height: 20
        });
      });

    });

  });

});