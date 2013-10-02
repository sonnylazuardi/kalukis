define(function(require){

  var fabric = require("fabric");

  function PencilBrush(canvas, cfg){
    this.canvas = canvas;

    cfg = cfg || {};

    cfg.fillColor = cfg.fillColor || "#000000";
    cfg.strokeColor = cfg.strokeColor || "#000000";

    cfg.width = -1;
    cfg.brushWidth = cfg.brushWidth || 10;
    cfg.outlineAsIs = true;

    this.cfg = cfg;

    this.initBrush();
  }

  PencilBrush.prototype.initBrush = function() {
    this.brush = new fabric.PencilBrush(this.canvas);
  };

  PencilBrush.prototype.getBrush = function() {
    return this.brush;
  };

  PencilBrush.prototype.set = function(key, value) {
    if (key === "width") {
      this.cfg.brushWidth = value;
    }
    this.cfg[key] = value;
  };

  PencilBrush.prototype.get = function(key) {
    return this.cfg[key];
  };

  PencilBrush.prototype.drawAt = function(point) {
    return;
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
      strokeWidth: this.cfg.brushWidth || 1
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
      strokeWidth: this.cfg.brushWidth || 1
    }));
    this.canvas.renderAll();
  };

  PencilBrush.prototype.drawLine = function(outline) {
    this.canvas.add(new fabric.Line([
      outline.x1, outline.y1,
      outline.x2, outline.y2
    ], {
      stroke: this.cfg.strokeColor,
      strokeWidth: this.cfg.brushWidth || 1
    }));
    this.canvas.renderAll();
  };

  return PencilBrush;
});