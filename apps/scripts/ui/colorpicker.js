/**
 * This component manages the widget for colorpicker. After
 * initialization, it will add the colorpicker widget to the
 * dom that this component is attached to.
 */
define(
[
  "flight/component",
  "data/with_canvas",
  "hbs!templates/colorpicker"
],

function(defineComponent, WithCanvas, tmpl){
  return defineComponent(ColorPicker, WithCanvas);

  function ColorPicker(){
    this.after("initialize", function(){
      this.$node.append(tmpl);

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