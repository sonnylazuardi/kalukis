/**
 * This component manages the widget for colorpicker. After
 * initialization, it will add the colorpicker widget to the
 * dom that this component is attached to.
 */
define(function(require){
  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      tmpl = require("text!templates/colorpicker.html");

  return defineComponent(colorPicker, withCanvas);

  function colorPicker(){
    this.after("initialize", function(){
      this.$node.append(tmpl);

      var cp = this.$node.children("#color-picker"),
          me = this;

      // settings
      cp.spectrum({
        flat: true,
        showInput: true,
        clickoutFiresChange: true,
        showButtons: false,
        move: function(color){
          console.log("me");
          me.trigger(document, "brushPropertyChanged", {
            key: "color",
            color: color.toHexString()
          });
        },
        // fire me on color changed
        change: function(color){
          me.trigger(document, "brushPropertyChanged", {
            key: "color",
            color: color.toHexString()
          });
        }
      });
    });
  }
});