define(["fabric", "flight"],
function(fabric, flight){

  return flight.component(Lukis);

  function Lukis(){
    this.after("initialize", function(){
      // activate canvas
      this.canvas = new fabric.Canvas(this.$node.attr("id"));

      this.on("paintRequested", this.onPaintRequested);
    });

    this.onPaintRequested = function(obj){
      console.log("onPaintRequested");
    };
  }
});