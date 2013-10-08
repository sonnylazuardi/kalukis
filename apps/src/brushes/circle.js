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

  CircleBrush.prototype.drawObjects = function( points ) {
    var originalRenderOnAddition = this.canvas.renderOnAddition;
        this.canvas.renderOnAddition = false;

    var circles = [];

    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      circles.push(new fabric.Circle({
        radius: getRandomInt(0, this.cfg.width),
        left: point.x,
        top: point.y,
        fill: new fabric.Color(this.cfg.fillColor)
                .setAlpha(fabric.util.getRandomInt(0, 100) / 100)
                .toRgba(),
        hasControls: false,
        hasRotatingPoint: false,
        lockUniScaling: true
      }));
    }

    var group = new fabric.Group(circles);

    this.canvas.add(group);
    this.canvas.fire('path:created', { path: group });

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderOnAddition = originalRenderOnAddition;
    this.canvas.renderAll();
  };

  CircleBrush.prototype.drawAtPoints = function(points) {
    this.drawObjects(points);
  };

  return CircleBrush;

});