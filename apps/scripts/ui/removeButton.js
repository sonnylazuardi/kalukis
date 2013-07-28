define(function(require){
  var defineComponent = require("flight/component"),
      fabric = require("fabric"),
      withCanvas = require("data/with_canvas");

  return defineComponent(removeButton, withCanvas);

  function removeButton(){
    this.after("initialize", function(){
      this.on("click", this.onClick);
    });

    /**
     * Delete selected objects
     */
    this.onClick = function(){
      var me = this,
          canvas = this.attr.canvas;

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
    };
  }
});