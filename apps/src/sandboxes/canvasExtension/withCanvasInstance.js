define(function(require){

  var canvasProvider = require("canvasProvider");

  return withCanvasInstance;

  function withCanvasInstance(){

    this.defaultAttrs({
      initted: {}
    });

    /**
     * Setup canvas instance
     * @param  {String} elementId Canvas DOM element ID
     */
    this.initCanvas = function(elementId) {
      return canvasProvider.init(elementId);
    };

    /**
     * Get the canvas instance
     * @return {Object} Canvas instance
     */
    this.getCanvasInstance = function(elementId) {
      if (!this.attr.initted.hasOwnProperty(elementId)) {
        this.attr.initted[elementId] = this.initCanvas(elementId);
      }

      return this.attr.initted[elementId];
    };

  }

});