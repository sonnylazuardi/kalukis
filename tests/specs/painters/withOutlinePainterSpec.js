define(function(require){

  var fabric = require("fabric"),
      canvas = new fabric.Canvas();

  describeMixin("painters/withOutlinePainter", function(){

    beforeEach(function(){
      setupComponent();
    });

  });

});