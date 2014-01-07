define(function(require){

  var defineComponent = require("flight/lib/component"),
      tmpl = require("text!ui/colorWidget/template.html");

  return defineComponent(ColorWidget);

  function ColorWidget(){

    this.defaultAttrs({
      colorWidgetEl: "#colorpicker"
    });

    this.after("initialize", function(){
      this.renderTemplate(tmpl);
    });

    this.publishColorChange = function(color){
      this.trigger(document, "change-brushProperty", {
        fillColor: color.toHexString()
      });
      this.trigger(document, "change-brushProperty", {
        strokeColor: color.toHexString()
      });
    };

    this.renderTemplate = function(tmpl){
      this.$node.append(tmpl);

      this.select("colorWidgetEl").spectrum({
        flat: true,
        showInput: true,
        clickoutFiresChange: true,
        showButtons: false,
        move: this.publishColorChange.bind(this),
        change: this.publishColorChange.bind(this)
      });
    };

  }

});