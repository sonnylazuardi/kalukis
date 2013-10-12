/**
 * Draw a line outline as the user is drawing on top
 * of the canvas
 */
define(function( require ){

  var asOutlineShape = require("./asOutlineShape");

  function LineOutline(canvas, cfg){
    this.initialize(canvas, cfg);
  }

  LineOutline.prototype.getSlope = function(p1, p2) {
    return (p2.y - p1.y) / (p2.x - p1.x);
  };

  LineOutline.prototype.getLineEquation = function(p1, p2) {
    var slope = this.getSlope(p1, p2);

    return function(x){
      return p1.y + slope*(x - p1.x);
    };
  };

  LineOutline.prototype.getOutlinePoints = function(pointDistance){
    if (pointDistance < 0) {
      return this.outline;
    }
    
    var points = [],
        distance = Math.abs(this.outline.x1 - this.outline.x2),
        lineEq = this.getLineEquation({
          x: this.outline.x1,
          y: this.outline.y1
        }, {
          x: this.outline.x2,
          y: this.outline.y2
        }),
        xAng = this.outline.x1 > this.outline.x2 ? -1 : 1,
        bWidth = xAng * pointDistance;

    for (var i = 0, x = this.outline.x1; i <= distance; i += pointDistance, x += bWidth){
      points.push({
        x: x,
        y: lineEq(x)
      });
    }

    return points;
  };

  LineOutline.prototype.onMouseDown = function(e) {
    var point = this.canvas.getPointer(e.e);

    this.outline = {
      x1: point.x,
      y1: point.y,
      x2: point.x + 1,
      y2: point.y + 1
    };

    this.isDrawing = true;

    return this;
  };

  LineOutline.prototype.onMouseMove = function(e) {
    if (this.isDrawing) {
      var point = this.canvas.getPointer(e.e);

      this.outline.x2 = point.x;
      this.outline.y2 = point.y;

      this.renderOutline();
    }

    return this;
  };

  LineOutline.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;

    this.canvas.clearContext(ctx);
    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = this.cfg.strokeColor;

    ctx.beginPath();
    ctx.moveTo(this.outline.x1, this.outline.y1);
    ctx.lineTo(this.outline.x2, this.outline.y2);
    ctx.stroke();

    ctx.restore();

    return this;
  };

  asOutlineShape.call(LineOutline.prototype);

  return LineOutline;
});