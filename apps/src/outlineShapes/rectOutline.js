/**
 * Draw a rectangular outline as the user is drawing on
 * top of the canvas
 */
define(function(require){

  function RectOutline(canvas, cfg){
    this.canvas = canvas;
    this.canvas.selection = false;

    this.isDrawing = false;
    this.outline = {};

    cfg = cfg || {};
    cfg.fillColor = cfg.fillColor || "#000000";
    this.cfg = cfg;
  }

  RectOutline.prototype.start = function() {
    this.canvas.defaultCursor = "crosshair";
  };

  RectOutline.prototype.set = function(key, value) {
    this.cfg[key] = value;
  };

  RectOutline.prototype.get = function(key) {
    return this.cfg[key];
  };

  RectOutline.prototype.getOutline = function(){
    return this.outline;
  };

  RectOutline.prototype.getOutlinePoints = function(pointDistance){
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

    return this;
  };

  RectOutline.prototype.onMouseMove = function(e) {
    if (this.isDrawing) {
      var point = this.canvas.getPointer(e.e);

      this.outline.height = point.y - this.outline.y;
      this.outline.width = point.x - this.outline.x;

      this.renderOutline();
    }

    return this;
  };

  RectOutline.prototype.onMouseUp = function(e) {
    this.canvas.defaultCursor = "default";
    
    this.isDrawing = false;
    this.canvas.selection = true;
    this.finish();
    return this;
  };

  RectOutline.prototype.finish = function() {
    if (this.outline.width < 0){
      this.outline.x = this.outline.x + this.outline.width;
      this.outline.width *= -1;
    }

    if (this.outline.height < 0) {
      this.outline.y = this.outline.y + this.outline.height;
      this.outline.height *= -1;
    }

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.selection = true;
    return this;
  };

  RectOutline.prototype.renderOutline = function() {
    var ctx = this.canvas.contextTop;
    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = this.cfg.fillColor;
    ctx.strokeRect(this.outline.x, this.outline.y, this.outline.width, this.outline.height);

    ctx.restore();

    return this;
  };

  return RectOutline;
  
});
/**
[Object{x: 10, y: 10}, Object{x: 15, y: 10}, Object{x: 20, y: 10}, Object{x: 5, y: 10}, Object{x: 5, y: 15}, Object{x: 5, y: 20}, Object{x: 5, y: 25}, Object{x: 5, y: 40}, Object{x: 10, y: 40}, Object{x: 15, y: 40}, Object{x: 20, y: 40}, Object{x: 30, y: 30}, Object{x: 30, y: 25}, Object{x: 30, y: 20}, Object{x: 30, y: 15}, Object{x: 30, y: 10}]**/