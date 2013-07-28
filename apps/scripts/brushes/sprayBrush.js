define(function(require){
  var fabric = require("fabric");

  return {
    // for freedraw
    create: function(canvas){
      return new fabric.SprayBrush(canvas);
    },
    // for drawing shaped object
    createShapeBrush: function(){

    }
  };
});