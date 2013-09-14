/**
 * A module that is able to draw a circle brush on top of
 * fabric's canvas
 */
define(function(require){
  
  var fabric = require("fabric"),
      getRandomInt = fabric.util.getRandomInt;

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
    return this.cfg[key];
  };

  CircleBrush.prototype.drawAt = function(point, renderAfter) {
    if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
      throw Error("X or Y has not been defined");
    }

    var originalRenderOnAddition = this.canvas.renderOnAddition;
    this.canvas.renderOnAddition = false;
    var radius = getRandomInt(0, this.cfg.width);
    console.log(radius);
    this.canvas.add(new fabric.Circle({
      radius: radius,
      left: point.x,
      top: point.y,
      fill: new fabric.Color(this.cfg.fillColor)
                .setAlpha(getRandomInt(0, 100) / 100)
                .toRgba(),
      stroke: this.cfg.strokeColor,
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

  CircleBrush.prototype.drawAtPoints = function(points) {
    points.forEach(function(point){
      this.drawAt(point, false);
    }, this);
  };

  CircleBrush.prototype.render = function(ctx) {
    if (!ctx) {
      
    }
  };

  return CircleBrush;

});