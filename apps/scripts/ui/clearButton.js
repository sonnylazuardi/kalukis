define(function(require){
  var defineComponent = require("flight/component"),
      withCanvas = require("mixins/with_canvas");

  return defineComponent(clearButton, withCanvas);

  function clearButton(){
    this.after("initialize", function(){
      this.on("click", this.onClick);
    });

    this.onClick = function(){
      this.attr.canvas.clear();
    };
  }
});