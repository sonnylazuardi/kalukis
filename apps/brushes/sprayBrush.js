define(

[
  "fabric"
],

function(fabric){

  return {
    create: function(canvas){
      return new fabric.SprayBrush(canvas);
    }
  };
});