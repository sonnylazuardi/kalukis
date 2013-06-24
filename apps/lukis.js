define(["fabric", "flight/component", "ui/canvasmixin"],
function(fabric, defineComponent, CanvasMixin){
  return defineComponent(Lukis, CanvasMixin);

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