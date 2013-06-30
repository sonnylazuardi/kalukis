define(function(require){
  var fabric = require("fabric");

  return {
    create: function(canvas){
      return new fabric.PencilBrush(canvas);
    }
  };
});