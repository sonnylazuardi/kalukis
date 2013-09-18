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

  HollowSquareBrush.prototype.drawAt = function(point, renderAfter) {
    if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
      throw Error("X or Y has not been defined");
    }

    var originalRenderOnAddition = this.canvas.renderOnAddition;
    this.canvas.renderOnAddition = false;

    var width = getRandomInt(0, this.cfg.width);

    this.canvas.add(new fabric.Rect({
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

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderOnAddition = originalRenderOnAddition;

    if (renderAfter === true){
      this.canvas.renderAll();
    }
  };

  HollowSquareBrush.prototype.drawAtPoints = function(points) {
    points.forEach(function(point){
      this.drawAt(point, false);
    }, this);
  };

  return HollowSquareBrush;

});