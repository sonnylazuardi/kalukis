define(function(require){

  var fabric = require("fabric");

  function PencilBrush(canvas, cfg){
    this.canvas = canvas;

    cfg = cfg || {};

    cfg.fillColor = cfg.fillColor || "#000000";
    cfg.strokeColor = cfg.strokeColor || "#000000";

    cfg.width = cfg.width || 10;
    cfg.offset = cfg.offset || 0;

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
    // body...
  };

  PencilBrush.prototype.get = function(key) {
    // body...
  };

  PencilBrush.prototype.drawAt = function(point) {
    // body...
  };

  PencilBrush.prototype.drawAtPoints = function(points) {
    points.forEach(function(point){
      this.drawAt(point);
    }, this);
  };

  PencilBrush.prototype.render = function(ctx) {
    // body...
  };

  return PencilBrush;
});