define(["fabric", "flight"],
function(fabric, flight){

  return flight.component(lukis);

  function lukis(){
    this.after("initialize", function(){
      // activate canvas
      this.canvas = new fabric.Canvas(this.$node.attr("id"))
    });
  }
});