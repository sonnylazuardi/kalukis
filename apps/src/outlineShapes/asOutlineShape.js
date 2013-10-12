define(function( require ) {

  var asOutlineShape = (function(){

    function initialize ( canvas, cfg ) {
      this.canvas = canvas;
      this.canvas.selection = false;

      this.isDrawing = false;
      this.outline = {};

      cfg = cfg || {};
      cfg.strokeColor = cfg.strokeColor || "#000000";
      this.cfg = cfg;
    }

    function start() {
      this.canvas.defaultCursor = "crosshair";
    }

    function set( key, value ) {
      this.cfg[key] = value;
    }

    function get( key ) {
      return this.cfg[key];
    }

    function getOutline() {
      return this.outline;
    }

    function onMouseUp() {
      this.canvas.defaultCursor = "default";
    
      this.isDrawing = false;
      this.canvas.selection = true;
      this.finish();
      return this;
    }

    function finish() {
      if (this.normalizeOutlinePosition) {
        this.normalizeOutlinePosition();
      }

      this.canvas.clearContext(this.canvas.contextTop);
      this.canvas.selection = true;

      this.canvas.defaultCursor = "default";
      return this;
    }

    return function() {
      this.initialize = initialize;
      this.start = this.start || start;
      this.set = this.set || set;
      this.get = this.get || get;
      this.getOutline = this.getOutline || getOutline;
      this.onMouseUp = this.onMouseUp || onMouseUp;
      this.finish = this.finish || finish;

      return this;
    };

  })();

  return asOutlineShape;

});