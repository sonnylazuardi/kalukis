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

    this.cancelActivePainting = function(){
      this.trigger("cancelCurrentPainting", {
        active: "key"
      });
    };
  }

});