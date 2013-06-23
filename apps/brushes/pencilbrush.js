define(["flight"],
function(flight){
  flight.component(PencilBrush);

  function PencilBrush(){
    this.defaultAttrs({
      strokeWidth: "2",
      strokeColor: "red"
    });
  }
});