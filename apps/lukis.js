define(["fabric", "flight/component"],
function(fabric, defineComponent){

  return defineComponent(Lukis);

  function Lukis(){
    this.after("initialize", function(){
      // activate canvas
      this.canvas = new fabric.Canvas(this.$node.attr("id"));

      this.on(document, "paintRequested", this.onPaintRequested);
    });

    this.onPaintRequested = function(obj){
      console.log(obj);
    };
  }
});