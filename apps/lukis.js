/**
 * This module is responsible to boots the application. It also manages
 * the interactions between the user and the application.
 */
define(["fabric", "states/state"],
function(fabric, State){
  function Lukis(elId){
    this.canvas = new fabric.Canvas(elId);
    this.state = new State(this);
  }

  return Lukis;
});