define(function(require){
  var fabric = require("fabric");

  function CircleBrush(canvas, cfg){
    this.canvas = canvas;

    cfg = cfg || {};

    this.fillColor = cfg.fillColor || "#000000";
    this.strokeColor = cfg.strokeColor || "#000000";

    this.width = cfg.width || 10;
    this.offset = cfg.offset || 0;

    this.initBrush();
  }

  CircleBrush.prototype.initBrush = function() {
    this.brush = new fabric.CircleBrush(this.canvas);
  };

  CircleBrush.prototype.getBrush = function() {
    return this.brush;
  };

  CircleBrush.prototype.drawAt = function(point) {
    if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
      throw Error("X or Y has not been defined");
    }


  };

  CircleBrush.prototype.drawAtPoints = function() {
    // body...
  };

  return CircleBrush;
  
});