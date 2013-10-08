define(function(require){

  var fabric = require("fabric"),
      getRandomInt = fabric.util.getRandomInt,
      HollowCircleBrushClass = require("extBrushes/fabric.HollowCircleBrush");

  function HollowCircleBrush(canvas, cfg) {
    this.canvas = canvas;

    cfg = cfg || {};
    cfg.strokeColor = cfg.strokeColor || "#000000";
    cfg.width = cfg.width || 10;

    this.cfg = cfg;

    this.initBrush();
  }

  HollowCircleBrush.prototype.initBrush = function() {
    this.brush = new HollowCircleBrushClass(this.canvas);
  };

  HollowCircleBrush.prototype.getBrush = function() {
    return this.brush;
  };

  HollowCircleBrush.prototype.set = function(key, value) {
    this.cfg[key] = value;
  };

  HollowCircleBrush.prototype.get = function(key) {
    return this.cfg[key];
  };

  HollowCircleBrush.prototype.drawAtPoints = function( points ) {
    var originalRenderOnAddition = this.canvas.renderOnAddition;
        this.canvas.renderOnAddition = false;

    var circles = [];

    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      circles.push(new fabric.Circle({
        radius: getRandomInt(0, this.cfg.width),
        left: point.x,
        top: point.y,
        fill: null,
        stroke: this.cfg.strokeColor,
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

  return HollowCircleBrush;

});