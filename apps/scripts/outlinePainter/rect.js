define(function(require){

  function RectOutlinePainter(canvas, cfg){
    cfg = cfg || {};
    this.canvas = canvas;
    this.brushColor = cfg.color || "#000000";

    this.canvas.selection = false;
    this.isDrawing = false;
    this.outline = undefined;

    this.canvas.defaultCursor = "crosshair";
  }

  RectOutlinePainter.prototype.onMouseDown = function(e) {
    this.canvas.selection = false;
    var point = this.canvas.getPointer(e.e);

    this.outline = {
      x: point.x,
      y: point.y,
      width: 1,
      height: 1
    };

    this.isDrawing = true;

    return this;
  };

  RectOutlinePainter.prototype.onMouseMove = function(e) {
    if (this.isDrawing) {
      var point = this.canvas.getPointer(e.e);

      this.outline.height = point.y - this.outline.y;
      this.outline.width = point.x - this.outline.x;

      this.renderOutline();
    }

    return this;
  };

  RectOutlinePainter.prototype.onMouseUp = function(e) {
    this.canvas.defaultCursor = "default";
    
    this.isDrawing = false;
    this.canvas.selection = true;
    this.finish();
    return this;
  };

  RectOutlinePainter.prototype.finish = function() {
    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.selection = true;
    return this;
  };

  RectOutlinePainter.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;
    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = this.brushColor;
    ctx.strokeRect(this.outline.x, this.outline.y, this.outline.width, this.outline.height);

    ctx.restore();

    return this;
  };

  return {
    init: function(canvas, cfg){
      return new RectOutlinePainter(canvas, cfg);
    }
  };
});