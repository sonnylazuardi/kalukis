define(
[
  "flight/component",
  "hbs!templates/colorpicker"
],

function(defineComponent, tmpl){
  return defineComponent(ColorPicker);

  function ColorPicker(){
    this.after("initialize", function(){
      this.$node.append(tmpl);

      this.$node.children("#color-picker").spectrum({
        clickoutFiresChange: true
      });
    });
  }
});