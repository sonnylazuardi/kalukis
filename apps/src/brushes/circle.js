define(function(require){
  var fabric = require("fabric");

  return CircleBrush;

  function CircleBrush(canvas, cfg){
    this.canvas = canvas;

    cfg = cfg || {};

    this.fillColor = cfg.fillColor || "#000000";
    this.strokeColor = cfg.strokeColor || "#000000";

    this.width = cfg.width || 10;
    this.offset = cfg.offset || 0;
  }
});