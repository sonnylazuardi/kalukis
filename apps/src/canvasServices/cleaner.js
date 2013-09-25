/**
 * I can clean the canvas
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      fabric = require("fabric");

  return defineComponent(cleaner);

  function cleaner(){

    this.after("initialize", function(){
      this.attachEventListener();
    });

    this.attachEventListener = function(){
      this.on("canvasManipulationClicked", function(e, data){
        if (this[data.manipulationId + "Handler"]) {
          this[data.manipulationId + "Handler"].apply(this, data);
        }
      });
    };

    /**
     * Removing action
     */
    this.removeHandler = function(){
      console.log("remove");
    };

    /**
     * Clearing action
     */
    this.clearHandler = function(){
      console.log("clear");
    };

  }

});