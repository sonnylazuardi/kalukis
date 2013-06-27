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
      console.log("colorpicker init");
      this.$node.append(tmpl);

      var cp = this.$node.children("#color-picker"),
          me = this;

      cp.spectrum({
        clickoutFiresChange: true,
        showButtons: false,
        change: function(color){
          me.trigger(me.attr.canvasEl, "colorChanged", {
            color: color.toHexString()
          });
        }
      });
    });
  }
});