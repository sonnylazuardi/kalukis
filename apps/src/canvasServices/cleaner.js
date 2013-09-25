/**
 * I can clean the canvas
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      fabric = require("fabric");

  return defineComponent(cleaner);

  function cleaner(){

    this.defaultAttrs({
      canvas: undefined
    });

    this.after("initialize", function(){
      this.attachEventListener();
    });

    this.attachEventListener = function(){
      this.on("canvasManipulationClicked", function(e, data){
        if (this[data.manipulationId + "Handler"]) {
          this[data.manipulationId + "Handler"].apply(this, data);
        }
      });

      this.on("canvasConstructed", function(e, data){
        this.setCanvas(data.canvas);
      });
    };

    this.setCanvas = function(canvas){
      this.attr.canvas = canvas;
    };

    /**
     * Removing action
     */
    this.removeHandler = function(){
      var canvas = this.attr.canvas;

      if (canvas) {
        if (canvas.getActiveGroup()){
          // if group selection is active
          canvas.getActiveGroup().forEachObject(function(obj){
            canvas.remove(obj);
          });

          canvas.discardActiveGroup();
        } else if (canvas.getActiveObject()){
          // if only individual object is selected
          canvas.remove(canvas.getActiveObject());
        }

        canvas.renderAll();
      }
    };

    /**
     * Clearing action
     */
    this.clearHandler = function(){
      if (this.attr.canvas) {
        this.attr.canvas.clear();
      }
    };

  }

});