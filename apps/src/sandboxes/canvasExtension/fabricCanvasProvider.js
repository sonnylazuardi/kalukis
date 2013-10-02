define(function(require){

  var fabric = require("fabric"),
      canvas;

  return {
    init: function(elementId){
      if (canvas) {
        return canvas;
      }

      return new fabric.Canvas(elementId);
    }
  };

});