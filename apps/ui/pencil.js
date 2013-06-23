/**
 * This is the defineComponent which manages interactions with
 * user when the user wants to paint with a pencil/brush.
 *
 * Which brush do the user want will be determined by the
 * brush selected by the user on a certain element.
 *
 * This module will use that selected brush to draw on the canvas.
 */
define(["flight"],
function(flight){

  return flight.component(Pencil);

  function Pencil(){
    // defining attributes. Anything defined here
    // can be accessed through `attr` properties.
    this.defaultAttrs({
      color: "#E74C3C",
      width: 1
    });

    // set events handler
    this.after("initialize", function(){
      this.on("click", this.onClick);
    });

    this.onClick = function(){
      console.log("click");
      this.trigger("paintRequested", this);
    };
  }
});