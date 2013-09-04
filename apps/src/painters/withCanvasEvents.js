/**
 * This mixins provides connection to canvas' painting events,
 * such as mouse:move, mouse:up, mouse:down, etc.
 */
define(function(require){
  
  return withCanvasEvents;


  function withCanvasEvents(){

    /**
     * Register event listeners that will be executed
     * @param  {Object} listeners The listeners where the key
     *                            maps to the spesific event, and
     *                            the value is the listener
     *                            function
     */
    this.registerEventListeners = function(listeners){
      var canvas = this.attr.canvas;

      if (canvas){
        this.attr.listeners = listeners;

        if (listeners.onMouseDown) {
          canvas.on("mouse:down", function(e){
            listeners.onMouseDown.call(listeners, e);
          });
        }

        if (listeners.onMouseUp) {
          canvas.on("mouse:up", function(e){
            listeners.onMouseUp.call(listeners, e);
          });
        }

        if (listeners.onMouseMove) {
          canvas.on("mouse:move", function(e){
            listeners.onMouseMove.call(listeners, e);
          });
        }
      }
    };

  }
});