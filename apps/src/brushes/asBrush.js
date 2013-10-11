/**
 * Mixin for a brush
 */
define(function( require ) {

  function asBrush() {

    this.getBrush = function() {
      return this.brush;
    };

    this.set = function( key, value ) {
      this.cfg[key] = value;
    };

    this.get = function( key ) {
      return this.cfg[key];
    };

  }

  return asBrush;

});