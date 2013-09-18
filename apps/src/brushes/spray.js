define(function(require){

  var fabric = require("fabric"),
      getRandomInt = fabric.util.getRandomInt;

  function SprayBrush(canvas, cfg){
    this.canvas = canvas;

    cfg = cfg || {};

    cfg.fillColor = cfg.fillColor || "#000000";
    cfg.strokeColor = cfg.strokeColor || "#000000";

    cfg.width = cfg.width || 10;
    cfg.offset = cfg.offset || 0;

    this.cfg = cfg;

    this.initBrush();
  }

  SprayBrush.prototype.initBrush = function() {
    this.brush = new fabric.SprayBrush(this.canvas);
  };

  SprayBrush.prototype.getBrush = function() {
    return this.brush;
  };

  SprayBrush.prototype.set = function(key, value) {
    this.cfg[key] = value;
  };

  SprayBrush.prototype.get = function(key) {
    return this.cfg[key];
  };

  SprayBrush.prototype.drawAt = function(point, renderAfter) {
    if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
      throw Error("X or Y has not been defined");
    }

    var originalRenderOnAddition = this.canvas.renderOnAddition;
    this.canvas.renderOnAddition = false;

    this.canvas.add(new fabric.Rect({
      width: point.width,
      height: point.width,
      left: point.x + 1,
      top: point.y + 1,
      fill: this.cfg.color,
      hasControls: false,
      hasRotatingPoint: false,
      lockUniScaling: true
    }));

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderOnAddition = originalRenderOnAddition;

    if (renderAfter === true){
      this.canvas.renderAll();
    }
  };

  SprayBrush.prototype.drawAtPoints = function(points) {
    points.forEach(function(point){
      this.drawAt(point, false);
    }, this);
  };

  return SprayBrush;

});