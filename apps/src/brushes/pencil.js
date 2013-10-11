define(function(require){

  var fabric = require("fabric"),
      asBrush = require("./asBrush");

  function PencilBrush(canvas, cfg){
    this.initialize(canvas, cfg);
  }

  PencilBrush.prototype.initBrush = function() {
    this.brush = new fabric.PencilBrush(this.canvas);
  };

  PencilBrush.prototype.get = function(key) {
    if (key === "width") {
      return -1;
    }

    return this.cfg[key];
  };

  /**
   * Just an alias only for this brush
   * @param  {Object} points The drawing configuration
   */
  PencilBrush.prototype.drawAtPoints = function(outline) {
    if (outline.hasOwnProperty("radius")) {
      this.drawCircle(outline);
    } else if (outline.hasOwnProperty("width") && outline.hasOwnProperty("height")) {
      this.drawRect(outline);
    } else if (outline.hasOwnProperty("x1")) {
      this.drawLine(outline);
    }
  };

  PencilBrush.prototype.drawRect = function(outline) {
    this.canvas.add(new fabric.Rect({
      width: outline.width,
      height: outline.height,
      top: outline.y + outline.height / 2,
      left: outline.x + outline.width / 2,
      fill: null,
      stroke: this.cfg.strokeColor,
      strokeWidth: this.cfg.width || 10
    }));
    this.canvas.renderAll();
  };

  PencilBrush.prototype.drawCircle = function(outline) {
    this.canvas.add(new fabric.Circle({
      radius: outline.radius,
      left: outline.x,
      top: outline.y,
      fill: null,
      stroke: this.cfg.strokeColor,
      strokeWidth: this.cfg.width || 10
    }));
    this.canvas.renderAll();
  };

  PencilBrush.prototype.drawLine = function(outline) {
    this.canvas.add(new fabric.Line([
      outline.x1, outline.y1,
      outline.x2, outline.y2
    ], {
      stroke: this.cfg.strokeColor,
      strokeWidth: this.cfg.width || 10
    }));
    this.canvas.renderAll();
  };

  asBrush.call(PencilBrush.prototype);

  return PencilBrush;
});