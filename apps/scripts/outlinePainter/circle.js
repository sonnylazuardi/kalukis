define(function(require){
  function CircleOutlinePainter(canvas, cfg){
    cfg = cfg || {};
    this.canvas = canvas;
    this.brushColor = cfg.color || "#000000";

    this.canvas.selection = false;
    this.isDrawing = false;
    this.brushColor = "#000000";
    this.outline = undefined;

    this.canvas.defaultCursor = "crosshair";
  }

  CircleOutlinePainter.prototype.onMouseDown = function(e) {
    var point = this.canvas.getPointer(e.e);

    this.outline = {
      x: point.x,
      y: point.y,
      radius: 1
    };

    this.isDrawing = true;

    return this;
  };

  CircleOutlinePainter.prototype.onMouseMove = function(e) {
    if (this.isDrawing) {
      var point = this.canvas.getPointer(e.e);

      this.outline.radius = Math.sqrt(Math.pow(point.x-this.outline.x,2)+Math.pow(point.y-this.outline.y,2));

      this.renderOutline();
    }

    return this;
  };

  CircleOutlinePainter.prototype.onMouseUp = function(e) {
    this.canvas.defaultCursor = "default";

    this.isDrawing = false;
    this.finish();
    return this;
  };

  CircleOutlinePainter.prototype.finish = function() {
    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.selection = true;
    return this;
  };

  CircleOutlinePainter.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;
    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.brushColor;
    ctx.arc(this.outline.x, this.outline.y, this.outline.radius, 2 * Math.PI, false);
    ctx.stroke();

    ctx.restore();
  };

  return {
    init: function(canvas, cfg){
      return new CircleOutlinePainter(canvas, cfg);
    }
  };
});