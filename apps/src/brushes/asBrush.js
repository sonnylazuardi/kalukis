/**
 * Mixin for a brush
 */
define(function( require ) {

  var asBrush = (function() {

    function initialize( canvas, cfg ) {
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
    }

    function getBrush() {
      return this.brush;
    }

    function set( key, value ) {
      this.cfg[key] = value;
    }

    function get( key ) {
      return this.cfg[key];
    }

    return function() {
      this.initialize = initialize;
      this.getBrush = this.getBrush || getBrush;
      this.set = this.set || set;
      this.get = this.get || get;

      return this;
    };

  })();

  return asBrush;

});