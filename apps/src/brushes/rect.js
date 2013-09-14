define(function(require){

  var fabric = require("fabric"),
      getRandomInt = fabric.util.getRandomInt;

  var RectBrushClass = fabric.util.createClass(fabric.BaseBrush, {

    addPoint: function(pointer) {
      var pointerPoint = new fabric.Point(pointer.x, pointer.y);

      var width = getRandomInt(0, this.cfg.width);

      var strokeColor = new fabric.Color(this.color)
                          .setAlpha(fabric.util.getRandomInt(0, 100) / 100)
                          .toRgba();

      pointerPoint.width = pointerPoint.height = width;
      pointerPoint.strokeColor = strokeColor;

      
    }
  });

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

  RectBrush.prototype.drawAt = function(point, renderAfter) {
    if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
      throw Error("X or Y has not been defined");
    }

    var originalRenderOnAddition = this.canvas.renderOnAddition;
    this.canvas.renderOnAddition = false;

    this.canvas.add(new fabric.Circle({
      width: getRandomInt(0, this.cfg.width),
      height: getRandomInt(0, this.cfg.width),
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

  RectBrush.prototype.drawAtPoints = function(points) {
    points.forEach(function(point){
      this.drawAt(point, false);
    }, this);
  };

  return RectBrush;

});