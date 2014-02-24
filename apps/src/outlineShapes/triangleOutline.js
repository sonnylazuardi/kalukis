/**
 * Draw a rectangular outline as the user is drawing on
 * top of the canvas
 */
define(function(require) {

  var asOutlineShape = require('./asOutlineShape');

  function getBoundaryPoint(point, xLength, yHeight, distance) {
    var x = point.x,
        y = point.y,
        points = [];

    // get left
    for (iter = y; iter < yHeight; iter += distance) {
      points.push({x: x + distance, y: iter});
    }

    // get bottom
    for (iter = x; iter < xLength; iter += distance) {
      points.push({x: iter, y: yHeight});
    }

    // get right
    //for (iter = yHeight; iter > y; iter -= distance) {
    //  points.push({x: xLength - distance, y: iter});
    //}

    return points;
  }

  TriangleOutline.prototype.getSlope = function(p1, p2) {
    return (p2.y - p1.y) / (p2.x - p1.x);
  };

  TriangleOutline.prototype.getLineEquation = function(p1, p2) {
    var slope = this.getSlope(p1, p2);

    return function(x) {
      return p1.y + slope*(x - p1.x);
    };
  };
  
  function TriangleOutline(canvas, cfg) {
    this.initialize(canvas, cfg);
  }

  TriangleOutline.prototype.getOutlinePoints = function(pointDistance) {
    var xLength = this.outline.x + this.outline.width,
        yHeight = this.outline.y + this.outline.height,
        x = this.outline.x,
        y = this.outline.y;
    
    
    
    var points = getBoundaryPoint({x: x, y: y}, xLength, yHeight, pointDistance);
    // this is a need hack (at the moment), so that we can draw
    // a shape for pencil brush
    // please see `pencil.js` `drawAtPoints` method
    points[0].type = 'Triangle';
    points[0].outline = this.outline;

    var distance = Math.abs(this.outline.x1 - this.outline.x2),
        lineEq = this.getLineEquation({
          x: this.outline.x1,
          y: this.outline.y1
        }, {
          x: this.outline.x2,
          y: this.outline.y2
        }),
        xAng = this.outline.x1 > this.outline.x2 ? -1 : 1,
        bWidth = xAng * pointDistance;

    for (var i = 0, x = this.outline.x1; i <= distance; i += pointDistance, x += bWidth) {
      points.push({
        x: x,
        y: lineEq(x)
      });
    }
    
    return points;
  };

  TriangleOutline.prototype.onMouseDown = function(e) {
    this.canvas.selection = false;
    var point = this.canvas.getPointer(e.e);

    this.outline = {
      x: point.x,
      y: point.y,
      width: 1,
      height: 1,
      x1: point.x,
      y1: point.y,
      x2: point.x + 1,
      y2: point.y + 1,
      x3: point.x - 1,
      y3: point.y + 1
    };

    this.isDrawing = true;
    this.startPoint = this.outerPoint = point;

    return this;
  };

  TriangleOutline.prototype.onMouseMove = function(e) {
    if (this.isDrawing) {
      var point = this.canvas.getPointer(e.e);
      this.outline.x2 = point.x;
      this.outline.y2 = point.y;

      this.updateOutline(point);
    }

    return this;
  };

  // TODO can we improve this?
  TriangleOutline.prototype.updateOutline = function(point) {
    this.outline.height = point.y - this.outline.y;
    this.outline.width = point.x - this.outline.x;

    this.outerPoint = point;

    this.renderOutline();

    return this;
  };

  TriangleOutline.prototype.normalizeOutlinePosition = function() {
    if (this.outline.width < 0) {
      this.outline.x = this.outline.x + this.outline.width;
      this.outline.width *= -1;
    }

    if (this.outline.height < 0) {
      this.outline.y = this.outline.y + this.outline.height;
      this.outline.height *= -1;
    }
  };

  TriangleOutline.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;

    this.canvas.clearContext(ctx);
    ctx.save();
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.cfg.strokeColor;

    ctx.restore();

    return this;
  };

  asOutlineShape.call(TriangleOutline.prototype);

  return TriangleOutline;
  
});