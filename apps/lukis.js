/**
 * This module is responsible to boots the application. It also manages
 * the interactions between the user and the application.
 */
define(["fabric"],
function(fabric){
  function Lukis(elId){
    this.canvas = new fabric.Canvas(elId);
  }

  return Lukis;
});