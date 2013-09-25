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

      });
    };

    /**
     * Removing action
     */
    this.removeHandler = function(){

    };

    /**
     * Clearing action
     */
    this.clearHandler = function(){

    };

  }

});