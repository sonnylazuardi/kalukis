/**
 * Draw a circular outline as the user is drawing on
 * top of the canvas
 */
define(function( require ){

  var asOutlineShape = require("./asOutlineShape");

  function CircleOutline(canvas, cfg){
    this.initialize(canvas, cfg) ;
  }

  CircleOutline.prototype.getOutlinePoints = function(pointDistance) {
    if (pointDistance < 0) {
      return this.outline;
    }
    
    var points = [],
        w = pointDistance - 5,
        x = this.outline.x,
        y = this.outline.y,
        radius = this.outline.radius;

    for (var i = 0; i < 360; i += w){
      if (i === 0) {
        points.push({x: x, y: y - radius});
      } else if (i === 90){
        points.push({x: x + radius, y: y});
      } else if (i === 180){
        points.push({x: x, y: y + radius});
      } else if (i === 270){
        points.push({x: x - radius, y: y});
      } else {
        points.push({
          x: Math.sin(i) * radius + x,
          y: Math.cos(i) * radius + y
        });
      }
    }

    return points;
  };

  CircleOutline.prototype.onMouseDown = function(e) {
    this.canvas.selection = false;
    var point = this.canvas.getPointer(e.e);

    this.outline = {
      x: point.x,
      y: point.y,
      radius: 1
    };

    this.isDrawing = true;

    return this;
  };

  CircleOutline.prototype.onMouseMove = function(e) {
    if (this.isDrawing) {
      var point = this.canvas.getPointer(e.e);

      this.outline.radius = Math.sqrt(Math.pow(point.x-this.outline.x,2)+Math.pow(point.y-this.outline.y,2));

      this.renderOutline();
    }

    return this;
  };

  CircleOutline.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;

    this.canvas.clearContext(ctx);
    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.cfg.strokeColor;
    ctx.arc(this.outline.x, this.outline.y, this.outline.radius, 2 * Math.PI, false);
    ctx.stroke();

    ctx.restore();
  };

  asOutlineShape.call(CircleOutline.prototype);

  return CircleOutline;
});