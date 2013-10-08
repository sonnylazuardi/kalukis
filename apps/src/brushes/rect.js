define(function(require){

  var fabric = require("fabric"),
      RectBrushClass = require("extBrushes/fabric.RectBrush"),
      getRandomInt = fabric.util.getRandomInt;

  function RectBrush(canvas, cfg){
    this.canvas = canvas;

    cfg = cfg || {};

    cfg.fillColor = cfg.fillColor || "#000000";
    cfg.strokeColor = cfg.strokeColor || "#000000";

    cfg.width = cfg.width || 10;
    cfg.offset = cfg.offset || 0;

    this.cfg = cfg;

    this.initBrush();
  }

  RectBrush.prototype.initBrush = function() {
    this.brush = new RectBrushClass(this.canvas);
  };

  RectBrush.prototype.getBrush = function() {
    return this.brush;
  };

  RectBrush.prototype.set = function(key, value) {
    this.cfg[key] = value;
  };

  RectBrush.prototype.get = function(key) {
    return this.cfg[key];
  };

  RectBrush.prototype.drawAtPoints = function( points ) {
    var originalRenderOnAddition = this.canvas.renderOnAddition;
        this.canvas.renderOnAddition = false;

    var rects = [];

    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      rects.push(new fabric.Rect({
        width: getRandomInt(0, this.cfg.width),
        height: getRandomInt(0, this.cfg.width),
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

    var group = new fabric.Group(rects);

    this.canvas.add(group);
    this.canvas.fire('path:created', { path: group });

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderOnAddition = originalRenderOnAddition;
    this.canvas.renderAll();
  };

  return RectBrush;

});