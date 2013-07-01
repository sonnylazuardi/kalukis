/**
 * This component manages the widget for colorpicker. After
 * initialization, it will add the colorpicker widget to the
 * dom that this component is attached to.
 */
define(function(require){
  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      withHandleBars = require("ui/with_handlebars"),
      tmpl = require("text!templates/colorpicker.hbs");

  return defineComponent(colorPicker, withCanvas, withHandleBars);

  function colorPicker(){
    this.after("initialize", function(){
      this.$node.append(this.renderData({}, tmpl));

      var cp = this.$node.children("#color-picker"),
          me = this;

      // settings
      cp.spectrum({
        clickoutFiresChange: true,
        showButtons: false,
        // fire me on color changed
        change: function(color){
          me.trigger(document, "colorChanged", {
            key: "color",
            color: color.toHexString()
          });
        }
      });
    });
  }
});