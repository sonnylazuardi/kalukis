define(function(require){

  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      fabric = require("fabric"),
      rectSpray = require("shapeBrush/rectSpray");

  return defineComponent(shapeBrush, withCanvas);

  function shapeBrush(){

    this.after("initialize", function(){
      console.log("init");
      this.on("click", this.onClick);

      // this.on(document, "selectedBrushReady", this.setBrush);
      // this.on(document, "colorChanged", this.setBrushProperty);
    });

    this.onClick = function(){
      rectSpray.create(this.attr.canvas, {
        x: 20,
        y: 20,
        width: 100,
        height: 100
      });
    };
  }
});