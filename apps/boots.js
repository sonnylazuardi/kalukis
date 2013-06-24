define([
  "lukis",
  "ui/pencil"
],
function(lukis, pencil){
  function boots(){
    // attach modules
    lukis.attachTo("#lukis");
    pencil.attachTo("#pencil",{
      canvasEl: "#lukis"
    });
  }

  return boots;
});