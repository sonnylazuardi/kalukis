define(function(require){

  var fabric = require("fabric"),
      HollowSquareBrushClass = require("extBrushes/fabric.HollowSquareBrush"),
      getRandomInt = fabric.util.getRandomInt;

  function HollowSquareBrush(canvas, cfg) {
    this.canvas = canvas;

    cfg = cfg || {};
    cfg.strokeColor = cfg.strokeColor || "#000000";
    cfg.width = cfg.width || 10;

    this.cfg = cfg;

    this.initBrush();
  }

  HollowSquareBrush.prototype.initBrush = function() {
    this.brush = new HollowSquareBrushClass(this.canvas);
  };

  HollowSquareBrush.prototype.getBrush = function() {
    return this.brush;
  };

  HollowSquareBrush.prototype.set = function(key, value) {
    this.cfg[key] = value;
  };

  HollowSquareBrush.prototype.get = function(key) {
    return this.cfg[key];
  };

  HollowSquareBrush.prototype.drawAtPoints = function( points ) {
    var originalRenderOnAddition = this.canvas.renderOnAddition;
        this.canvas.renderOnAddition = false;

    var rects = [],
        width,
        point;

    for (var i = 0, len = points.length; i < len; i++) {
      width = getRandomInt(0, this.cfg.width);
      point = points[i];
      rects.push(new fabric.Rect({
        width: width,
        height: width,
        left: point.x,
        top: point.y,
        fill: null,
        stroke: this.cfg.strokeColor,
        hasControls: false,
        hasRotatingPoint: false,
        lockUniScaling: true
      }));
    }

    var group = new fabric.Group(rects);

    this.canvas.add(group);
    this.canvas.fire('path:created', { path: group });

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderOnAddition = originalRenderOnAddition;
    this.canvas.renderAll();
  };

  return HollowSquareBrush;

});