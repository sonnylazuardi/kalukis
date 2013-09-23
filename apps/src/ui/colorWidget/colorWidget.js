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

    this.renderTemplate = function(tmpl){
      this.$node.append(tmpl);

      this.select("colorWidgetEl").spectrum({
        flat: true,
        showInput: true,
        clickoutFiresChange: true,
        showButtons: false,
        move: function(color){
          this.trigger(document, "brushPropertyChanged", {
            color: color.toHexString()
          });
        }.bind(this),
        change: function(color){
          this.trigger(document, "brushPropertyChanged", {
            color: color.toHexString()
          });
        }.bind(this)
      });
    };

  }

});