define(function(require){

  var fabric = require('fabric'),
      getRandomInt = fabric.util.getRandomInt,
      HollowCircleBrushClass = require('extBrushes/fabric.HollowCircleBrush'),
      asBrush = require('./asBrush');

  function HollowCircleBrush(canvas, cfg) {
    this.initialize(canvas, cfg);
  }

  HollowCircleBrush.prototype.initBrush = function() {
    this.brush = new HollowCircleBrushClass(this.canvas);
  };

  HollowCircleBrush.prototype.drawOne = function( point ) {
    return new fabric.Circle({
      radius: getRandomInt(0, this.cfg.width),
      left: point.x,
      top: point.y,
      fill: null,
      stroke: this.cfg.strokeColor,
      hasControls: false,
      hasRotatingPoint: false,
      lockUniScaling: true
    });
  };

  HollowCircleBrush.prototype.drawAtPoints = function( points ) {
    var originalRenderOnAddition = this.canvas.renderOnAddition;
        this.canvas.renderOnAddition = false;

    var circles = [];

    for (var i = 0, len = points.length; i < len; i++) {
      circles.push(this.drawOne(points[i]));
    }

    this.processObjects(circles);

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderOnAddition = originalRenderOnAddition;
    this.canvas.renderAll();
  };

  asBrush.call(HollowCircleBrush.prototype);

  return HollowCircleBrush;

});