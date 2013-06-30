define(

[
  "fabric"
],

function(fabric){

  return {
    create: function(canvas){
      return new fabric.PencilBrush(canvas);
    }
  };
});