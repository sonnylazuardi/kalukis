/**
 * This mixins provides connection to canvas' painting events,
 * such as mouse:move, mouse:up, mouse:down, etc.
 */
define(function(require){
  
  return withCanvasEvents;

  function withCanvasEvents(){

    /**
     * TODO what if the user of this mixin wants to listen
     * to more events than the ones provided below?
     * 
     * Register event listeners that will be executed. If there
     * is an existing listener, than that listener will be
     * overriden by this new one.
     * 
     * @param  {Object} listeners The listeners where the key
     *                            maps to the spesific event, and
     *                            the value is the listener
     *                            function
     */
    this.registerEventListeners = function(canvas, listeners){
      if (canvas){
        this.attr.listeners = listeners;

        if (listeners.onMouseDown) {
          canvas.on("mouse:down", this.attr.listeners.onMouseDown);
        }

        if (listeners.onMouseUp) {
          canvas.on("mouse:up", this.attr.listeners.onMouseUp);
        }

        if (listeners.onMouseMove) {
          canvas.on("mouse:move", this.attr.listeners.onMouseMove);
        }
      }
    };

    /**
     * Unregister any existing listener
     */
    this.unregisterExistingListeners = function(canvas){
      var listeners = this.attr.listeners;

      if (canvas) {
        if (listeners.onMouseDown) {
          canvas.off("mouse:down", listeners.onMouseDown);
        }

        if (listeners.onMouseUp) {
          canvas.off("mouse:up", listeners.onMouseUp);
        }

        if (listeners.onMouseMove) {
          canvas.off("mouse:move", listeners.onMouseMove);
        }

        this.attr.listeners = {};  
      }
      
    };

  }
});