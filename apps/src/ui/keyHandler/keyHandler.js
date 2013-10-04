/**
 * I know how to reach to keyboard handler
 */
define(function(require){

  var defineComponent = require("flight/lib/component");

  return defineComponent(keyHandler);

  function keyHandler(){

    this.after("initialize", function(){
      this.attachEventListeners();
    });

    this.attachEventListeners = function(){
      this.on("keydown", function(e, data){
        if (e.keyCode === 27) {
          this.cancelActivePainting();
        }
      });
    };

    /**
     * Cancel any currently active painting
     * @return {[type]} [description]
     */
    this.cancelActivePainting = function(){
      this.trigger("cancelPaintingRequested", {
        active: "key"
      });
    };
  }

});