/**
 * Mixin for a brush
 */
define(function( require ) {

  function asBrush() {

    this.initialize = function(canvas, cfg) {
      this.canvas = canvas;

      cfg = cfg || {};

      cfg.fillColor = cfg.fillColor || "#000000";
      cfg.strokeColor = cfg.strokeColor || "#000000";

      cfg.width = cfg.width || 10;
      cfg.offset = cfg.offset || 0;

      this.cfg = cfg;

      if (this.initBrush) {
        this.initBrush();
      }
    };

    this.getBrush = this.getBrush || function() {
      return this.brush;
    };

    this.set = this.set || function( key, value ) {
      this.cfg[key] = value;
    };

    this.get = this.get || function( key ) {
      return this.cfg[key];
    };

  }

  return asBrush;

});