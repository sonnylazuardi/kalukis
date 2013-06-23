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
    // this.defaultAttrs({

    // });

    // set events handler
    this.after("initialize", function(){
      this.on('click', function(){
        console.log("click");
      });
    });

    this.onClick = function(){
      console.log("pencil");
      this.trigger("paintRequested", this);
      this.trigger({
        type: "brushRequested",
        defaultBehaviour: this.setBrush
      });
    };

    this.setBrush = function(){

    };

    this.onMouseOver = function(){

    };

    this.onMouseDown = function(){

    };

    this.onMouseMove = function(){

    };

    this.onMouseUp = function(){

    };
  }

  // Pencil.prototype.onClick = function(e) {
  //   this.trigger("paintRequested", this);
  //   this.trigger({
  //     type: "brushRequested",
  //     defaultBehaviour: this.setBrush
  //   });
  // };

  // Pencil.prototype.setBrush = function(e){

  // };

  // Pencil.prototype.onMouseOver = function(e){

  // };

  // Pencil.prototype.onMouseDown = function(e){

  // };

  // Pencil.prototype.onMouseMove = function(e){

  // };

  // Pencil.prototype.onMouseUp = function(e){
  //   // body...
  // };
});