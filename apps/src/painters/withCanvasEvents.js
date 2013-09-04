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

    /**
     * Unregister any existing listener
     */
    this.unregisterExistingListeners = function(){
      var canvas = this.attr.canvas,
          listeners = this.attr.listeners;

      if (canvas && listeners){

        if (listeners.onMouseDown) {
          canvas.off("mouse:down", listeners.onMouseDown);
        }

        if (listeners.onMouseUp) {
          canvas.off("mouse:up", listeners.onMouseUp);
        }

        if (listeners.onMouseMove) {
          canvas.on("mouse:move", listeners.onMouseMove);
        }

        this.attr.listeners = {};
      }
    };

  }
});