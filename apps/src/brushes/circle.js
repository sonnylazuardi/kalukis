/**
 * A module that is able to draw a circle brush on top of
 * fabric's canvas
 */
define(function(require){
  
  var fabric = require("fabric"),
      getRandomInt = fabric.util.getRandomInt,
      asBrush = require("./asBrush");

  function CircleBrush(canvas, cfg){
    this.initialize(canvas, cfg);
  }

  CircleBrush.prototype.initBrush = function() {
    this.brush = new fabric.CircleBrush(this.canvas);
  };

  CircleBrush.prototype.drawOne = function( point ) {
    return new fabric.Circle({
      radius: getRandomInt(0, this.cfg.width),
      left: point.x,
      top: point.y,
      fill: new fabric.Color(this.cfg.fillColor)
              .setAlpha(fabric.util.getRandomInt(0, 100) / 100)
              .toRgba(),
      hasControls: false,
      hasRotatingPoint: false,
      lockUniScaling: true
    });
  };

  CircleBrush.prototype.drawAtPoints = function( points ) {
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

  asBrush.call(CircleBrush.prototype);

  return CircleBrush;

});