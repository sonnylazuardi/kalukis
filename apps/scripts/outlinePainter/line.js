/**
 * Draw a line outline as the user is drawing on top
 * of the canvas
 */
define(function(require){

  function LineOutlinePainter(canvas, cfg){
    cfg = cfg || {};
    this.canvas = canvas;
    this.brushColor = cfg.color || "#000000";

    this.canvas.selection = false;
    this.isDrawing = false;
    this.outline = undefined;

    this.canvas.defaultCursor = "crosshair";
  }

  LineOutlinePainter.prototype.onMouseDown = function(e) {
    this.canvas.selection = false;
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

  LineOutlinePainter.prototype.onMouseMove = function(e) {
    if (this.isDrawing) {
      var point = this.canvas.getPointer(e.e);

      this.outline.x2 = point.x;
      this.outline.y2 = point.y;

      this.renderOutline();
    }

    return this;
  };

  LineOutlinePainter.prototype.onMouseUp = function(e) {
    this.canvas.defaultCursor = "default";

    this.canvas.selection = true;
    this.isDrawing = false;
    this.finish();
    return this;
  };

  LineOutlinePainter.prototype.finish = function() {
    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.selection = true;
    return this;
  };

  LineOutlinePainter.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;
    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = this.brushColor;

    ctx.beginPath();
    ctx.moveTo(this.outline.x1, this.outline.y1);
    ctx.lineTo(this.outline.x2, this.outline.y2);
    ctx.stroke();

    ctx.restore();

    return this;
  };

  return {
    init: function(canvas, cfg){
      return new LineOutlinePainter(canvas, cfg);
    }
  };
});