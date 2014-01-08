define(function(require){

  var fabric = require('fabric'),
      HollowSquareBrushClass = require('extBrushes/fabric.HollowSquareBrush'),
      getRandomInt = fabric.util.getRandomInt,
      asBrush = require('./asBrush');

  function HollowSquareBrush(canvas, cfg) {
    this.initialize(canvas, cfg);
  }

  HollowSquareBrush.prototype.initBrush = function() {
    this.brush = new HollowSquareBrushClass(this.canvas);
  };

  HollowSquareBrush.prototype.drawOne = function( point ) {
    var width = width = getRandomInt(0, this.cfg.width);
    return new fabric.Rect({
      width: width,
      height: width,
      left: point.x,
      top: point.y,
      fill: null,
      stroke: this.cfg.strokeColor,
      hasControls: false,
      hasRotatingPoint: false,
      lockUniScaling: true
    });
  };

  HollowSquareBrush.prototype.drawAtPoints = function( points ) {
    var originalRenderOnAddition = this.canvas.renderOnAddition;
        this.canvas.renderOnAddition = false;

    var rects = [];

    for (var i = 0, len = points.length; i < len; i++) {
      rects.push(this.drawOne(points[i]));
    }

    this.processObjects(rects);

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderOnAddition = originalRenderOnAddition;
    this.canvas.renderAll();
  };

  asBrush.call(HollowSquareBrush.prototype);

  return HollowSquareBrush;

});