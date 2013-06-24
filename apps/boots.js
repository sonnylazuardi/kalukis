define([
  "lukis",
  "ui/pencil"
],
function(Lukis, Pencil){
  function boots(){
    // attach modules
    Lukis.attachTo("#lukis");
    Pencil.attachTo("#pencil");
  }

  return boots;
});