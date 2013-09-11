/**
 * A module that is able to draw a circle brush on top of
 * fabric's canvas
 */
define(function(require){
  
  var fabric = require("fabric");

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

  CircleBrush.prototype.drawAt = function(point) {
    if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
      throw Error("X or Y has not been defined");
    }


  };

  CircleBrush.prototype.drawAtPoints = function(points) {
    
  };

  /**
   * Draw this brush on the provided path. This method expects that
   * the `cfg` parameter has these properties:
   *
   * `x`      : the x coordinate of the circle centre point
   * `y`      : the y coordinate of the circle center point
   * `radius` : the radius of the circle
   * 
   * @param  {Object} cfg Path configuration
   */
  CircleBrush.prototype.drawPath = function(cfg) {
    // body...
  };

  CircleBrush.prototype.render = function(ctx) {
    if (!ctx) {
      
    }
  };

  return CircleBrush;

});