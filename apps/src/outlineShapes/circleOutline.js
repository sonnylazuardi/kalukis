/**
 * Draw a circular outline as the user is drawing on
 * top of the canvas
 */
define(function(require){
  function CircleOutline(canvas, cfg){
    this.canvas = canvas;
    this.canvas.selection = false;

    this.isDrawing = false;
    this.outline = {};

    cfg = cfg || {};
    cfg.strokeColor = cfg.strokeColor || "#000000";
    this.cfg = cfg;
  }

  CircleOutline.prototype.start = function() {
    this.canvas.defaultCursor = "crosshair";
  };

  CircleOutline.prototype.set = function(key, value) {
    this.cfg[key] = value;
  };

  CircleOutline.prototype.get = function(key) {
    return this.cfg[key];
  };

  CircleOutline.prototype.getOutline = function(){
    return this.outline;
  };

  CircleOutline.prototype.getOutlinePoints = function(pointDistance) {
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

  CircleOutline.prototype.onMouseUp = function(e) {
    this.canvas.defaultCursor = "default";

    this.canvas.selection = true;
    this.isDrawing = false;
    this.finish();
    return this;
  };

  CircleOutline.prototype.finish = function() {
    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.selection = true;
    return this;
  };

  CircleOutline.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;
    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.cfg.strokeColor;
    ctx.arc(this.outline.x, this.outline.y, this.outline.radius, 2 * Math.PI, false);
    ctx.stroke();

    ctx.restore();
  };

  return CircleOutline;
});