/**
 * Draw a rectangular outline as the user is drawing on
 * top of the canvas
 */
define(function( require ) {

  var asOutlineShape = require("./asOutlineShape");

  function RectOutline(canvas, cfg){
    this.initialize(canvas, cfg);
  }

  RectOutline.prototype.getOutlinePoints = function(pointDistance){
    if (pointDistance < 0) {
      return this.outline;
    }
    
    var points = [],
        xLength = this.outline.x + this.outline.width,
        yHeight = this.outline.y + this.outline.height,
        x = this.outline.x,
        y = this.outline.y;
    // top
    for (var i = x + pointDistance; i < xLength; i+= pointDistance){
      points.push({x: i, y: y});
    }

    // get left
    for (i = y; i < yHeight; i += pointDistance){
      points.push({x: x, y: i});
    }

    // get bottom
    for (i = x; i < xLength; i += pointDistance){
      points.push({x: i, y: yHeight});
    }

    // get right
    for (i = yHeight; i >= y; i -= pointDistance){
      points.push({x: xLength, y: i});
    }

    return points;
  };

  RectOutline.prototype.onMouseDown = function(e) {
    this.canvas.selection = false;
    var point = this.canvas.getPointer(e.e);

    this.outline = {
      x: point.x,
      y: point.y,
      width: 1,
      height: 1
    };

    this.isDrawing = true;
    this.startPoint = point;

    return this;
  };

  RectOutline.prototype.onMouseMove = function(e) {
    if (this.isDrawing) {
      var point = this.canvas.getPointer(e.e);

      this.updateOutline(point);
    }

    return this;
  };

  RectOutline.prototype.updateOutline = function( point ) {
    this.outline.height = point.y - this.outline.y;
    this.outline.width = point.x - this.outline.x;

    this.renderOutline();

    return this;
  };

  RectOutline.prototype.normalizeOutlinePosition = function() {
    if (this.outline.width < 0){
      this.outline.x = this.outline.x + this.outline.width;
      this.outline.width *= -1;
    }

    if (this.outline.height < 0) {
      this.outline.y = this.outline.y + this.outline.height;
      this.outline.height *= -1;
    }
  };

  RectOutline.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;

    this.canvas.clearContext(ctx);
    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = this.cfg.strokeColor;
    ctx.strokeRect(this.outline.x, this.outline.y, this.outline.width, this.outline.height);

    ctx.restore();

    return this;
  };

  asOutlineShape.call(RectOutline.prototype);

  return RectOutline;
  
});