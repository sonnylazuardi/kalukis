define(function(require){
  var fabric = require("fabric");

  function CircleBrush(canvas, cfg){
    this.canvas = canvas;

    cfg = cfg || {};

    cfg.fillColor = cfg.fillColor || "#000000";
    cfg.strokeColor = cfg.strokeColor || "#000000";

    cfg.width = cfg.width || 10;
    cfg.offset = cfg.offset || 0;

    this.cfg = cfg;

    this.initBrush();
  }

  CircleBrush.prototype.initBrush = function() {
    this.brush = new fabric.CircleBrush(this.canvas);
  };

  CircleBrush.prototype.getBrush = function() {
    return this.brush;
  };

  CircleBrush.prototype.set = function(key, value) {
    this.cfg[key] = value;
  };

  CircleBrush.prototype.get = function(key) {
    return cfg[key];
  };

  CircleBrush.prototype.drawAt = function(point) {
    if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
      throw Error("X or Y has not been defined");
    }


  };

  CircleBrush.prototype.drawAtPoints = function() {
    // body...
  };

  CircleBrush.prototype.render = function(ctx) {
    if (!ctx) {
      
    }
  };

  return CircleBrush;

});