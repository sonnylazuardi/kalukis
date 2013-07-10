define(function(require){
  var defineComponent = require("flight/component"),
      fabric = require("fabric"),
      withCanvas = require("data/with_canvas");

  return defineComponent(removeButton);

  function removeButton(){
    this.after("initialize", function(){
      this.on("click", this.onClick);
    });

    this.onClick = function(){

    };
  }
});