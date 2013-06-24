define([
  "lukis",
  "ui/pencil"
],
function(Lukis, Pencil){
  function boots(){
    // attach modules
    Lukis.attachTo("#lukis");
    Pencil.attachTo("#pencil", {
      canvasEl: "#lukis"
    });
  }

  return boots;
});