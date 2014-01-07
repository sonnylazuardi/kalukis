/**
 * This mixins provides connection to canvas' painting events,
 * such as mouse:move, mouse:up, mouse:down, etc.
 */
define(function(require){
  
  var mixinListeners = {};

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
        mixinListeners = listeners;

        if (mixinListeners.onMouseDown) {
          canvas.on("mouse:down", mixinListeners.onMouseDown);
        }

        if (mixinListeners.onMouseUp) {
          canvas.on("mouse:up", mixinListeners.onMouseUp);
        }

        if (mixinListeners.onMouseMove) {
          canvas.on("mouse:move", mixinListeners.onMouseMove);
        }
      }
    };

    /**
     * Unregister any existing listener
     */
    this.unregisterExistingListeners = function(canvas){
      if (canvas) {
        if (mixinListeners.onMouseDown) {
          canvas.off("mouse:down", mixinListeners.onMouseDown);
        }

        if (mixinListeners.onMouseUp) {
          canvas.off("mouse:up", mixinListeners.onMouseUp);
        }

        if (mixinListeners.onMouseMove) {
          canvas.off("mouse:move", mixinListeners.onMouseMove);
        }

        mixinListeners = {};  
      }
      
    };

  }

});